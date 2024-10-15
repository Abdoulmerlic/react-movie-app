import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?e6b11a42d3a84da4f9bebcbe17194e7e`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  return (
    <div>
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
