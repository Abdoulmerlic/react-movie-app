import React, { useState, useEffect } from 'react';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual TMDb API key
    fetch(`https://api.themoviedb.org/3/movie/popular?e6b11a42d3a84da4f9bebcbe17194e7e`)
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
