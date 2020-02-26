import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { title, director, metascore, stars, id } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <div className='edit-button' onClick={() => props.movieToEdit(props.movie)}>
        <Link key={id} to={`/update-movie/${id}`}>
          Edit
        </Link>
      </div>

      <div className='delete-button' onClick={() => deleteMovie(props.movie.id)}>
        Delete
      </div>
    </div>
  );
};

export default MovieCard;
