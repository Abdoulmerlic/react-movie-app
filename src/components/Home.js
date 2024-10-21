import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import MovieDetails from './MovieDetails';
import './Home.css';

const Home = () => {
  const [availableMovies, setAvailableMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useNavigate(); // Hook to navigate to movie details

  useEffect(() => {
    const fetchAvailableMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setAvailableMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching movies:', error);
      }
    };

    fetchAvailableMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const filteredAvailableMovies = availableMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle movie click
  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`); // Navigate to movie details page
  };

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

      {/* Trending Movies Section */}
      <div className="section">
        <h2>Trending Movies</h2>
        <div className="movie-list">
          {trendingMovies.length > 0 ? (
            trendingMovies.map(movie => (
              <div 
                className="movie-card" 
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)} // Click event
              >
                <MovieDetails movie={movie} />
              </div>
            ))
          ) : (
            <p>No trending movies found</p>
          )}
        </div>
      </div>

      {/* Available Movies Section */}
      <div className="section">
        <h2>Available Movies</h2>
        <div className="movie-list">
          {filteredAvailableMovies.length > 0 ? (
            filteredAvailableMovies.map(movie => (
              <div 
                className="movie-card" 
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)} // Click event
              >
                <MovieDetails movie={movie} />
              </div>
            ))
          ) : (
            <p>No available movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
