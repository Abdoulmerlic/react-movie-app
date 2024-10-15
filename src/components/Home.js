import React, { useEffect, useState } from 'react';
import MovieDetails from './MovieDetails'; // Import your MovieDetails component

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      {error && <p>Error: {error}</p>}
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} /> // Use MovieDetails instead of MovieCard
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
};

export default Home;
