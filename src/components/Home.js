import React, { useEffect, useState } from 'react';
import MovieDetails from './MovieDetails'; // Import your MovieDetails component

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Movie List</h1>
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {error && <p>Error: {error}</p>}
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <MovieDetails movie={movie} />
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );  
};

export default Home;
