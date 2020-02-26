import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [editMovie, setEditMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const movieToEdit = (movie) => {
    const edit = {
      title: movie.title,
      director: movie.director,
      metascore: movie.metascore,
      stars: movie.stars
    };

    setEditMovie(edit);
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} movieToEdit={movieToEdit} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieToEdit={movieToEdit} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm editMovie={editMovie} />
      </Route>
    </>
  );
};

export default App;
