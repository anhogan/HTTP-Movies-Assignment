import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';
import axios from 'axios';

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [editMovie, setEditMovie] = useState({
    id: '',
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
      id: movie.id,
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

      <Route exact path="/" render={(props) => (
        <MovieList {...props} movies={movieList} movieToEdit={movieToEdit} />
      )} />

      <Route path="/movies/:id" render={(props) => (
        <Movie {...props} addToSavedList={addToSavedList} movieToEdit={movieToEdit} />
      )} />

      <Route path="/update-movie/:id" render={(props) => (
        <UpdateMovieForm {...props} editMovie={editMovie} />
      )} />
    </>
  );
};

export default App;
