import React from 'react';
import axios from 'axios';

const MovieCard = props => {
  const handleUpdate = event => {
    event.preventDefault();
    props.history.push(`/update-movie/${props.movie.id}`);
  };

  const deleteMovie = event => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${props.movie.id}`)
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

  const { title, director, metascore, stars } = props.movie;
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

      <div className='edit-button' onClick={handleUpdate}>
        Edit
      </div>

      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
};

export default MovieCard;
