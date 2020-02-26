import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialMovieState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const AddMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovieState);

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
    axios.post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        console.log(res);
        props.setMovieList(res.data);
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
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <input
            id="director"
            name="director"
            type="text"
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="meta">Metascore</label>
          <input
            id="metascore"
            name="metascore"
            type="number"
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="stars">Stars</label>
          <input
              id="stars"
              name="stars"
              type="text"
              onChange={handleChange} />
        </div>
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;