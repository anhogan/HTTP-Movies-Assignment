import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialMovieState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovieState);
  const { id } = useParams();
  console.log(props.movieList);

  useEffect(() => {
    const movieToEdit = props.movieList.find(movie => `${movie.id}` === id);

    if(movieToEdit) {
      setMovie(movieToEdit);
    };
  }, [props.movieList, id]);

  const handleChange = event => {
    let value = event.target.value;
    if (event.target.name === "metascore") {
      value = parseInt(value, 10);
    } else if (event.target.name === "stars") {
      value = value.split(',');
    };

    setMovie({
      ...movie,
      [event.target.name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        axios.get('http://localhost:5000/api/movies')
          .then(res => {
            console.log(res);
            props.setMovieList(res.data);
          })
          .catch(err => {
            console.log(err);
          });
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={movie.title}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <input
            id="director"
            name="director"
            type="text"
            value={movie.director}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="meta">Metascore</label>
          <input
            id="metascore"
            name="metascore"
            type="number"
            value={movie.metascore}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="stars">Stars</label>
          <input
              id="stars"
              name="stars"
              type="text"
              value={movie.stars}
              onChange={handleChange} />
          {/* {movie.stars.map((star) => (
            <input
              id="stars"
              name="stars"
              type="text"
              value={star}
              onChange={handleChange} />
          ))} */}
        </div>
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;