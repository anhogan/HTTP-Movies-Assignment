import React, { useEffect, useState } from 'react';

const UpdateMovieForm = (props) => {
  const [movie, setMovie] = useState({
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

  useEffect(() => {
    setMovie({
      title: props.editMovie.title,
      director: props.editMovie.director,
      metascore: props.editMovie.metascore,
      stars: props.editMovie.stars
    });
  }, [props.editMovie]);

  return (
    <div>
      <form>
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
            id="meta"
            name="meta"
            type="text"
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
        </div>
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;