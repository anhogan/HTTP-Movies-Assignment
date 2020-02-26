import React, { useEffect, useState } from 'react';
import axios from 'axios';

// RETURN AN ARRAY FROM STARS WHEN EDITING
// HOW TO EDIT METASCORE

const UpdateMovieForm = (props) => {
  const [movie, setMovie] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  const handleChange = event => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateMovie(movie, movie.id);
  };

  const updateMovie = ({ id: id, title: title, director: director, metascore: metascore, stars: stars }) => {
    const parsedScore = parseInt(metascore);

    axios.put(`http://localhost:5000/api/movies/${id}`, {
      id: movie.id,
      title: title,
      director: director,
      metascore: parsedScore,
      stars: stars
    })
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setMovie({
      id: props.editMovie.id,
      title: props.editMovie.title,
      director: props.editMovie.director,
      metascore: props.editMovie.metascore,
      stars: props.editMovie.stars
    });
  }, [props.editMovie]);

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
          {movie.stars.map((star) => (
            <input
              id="stars"
              name="stars"
              type="text"
              value={star}
              onChange={handleChange} />
          ))}
        </div>
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;