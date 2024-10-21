import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.title}</p>
    </div>
  );
};

export default MovieDetails;
