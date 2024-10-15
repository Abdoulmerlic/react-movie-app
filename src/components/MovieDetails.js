import React from 'react';
import './Styles/MovieDetails.css'; // Import your MovieDetails styling
const MovieDetails = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieDetails;