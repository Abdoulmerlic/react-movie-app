import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();  // This grabs the movie ID from the URL

  return (
    <div>
      <h2>Movie Details for ID: {id}</h2>
      {/* We will fetch and display movie details here later */}
    </div>
  );
}

export default MovieDetails;