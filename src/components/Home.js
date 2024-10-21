import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import MovieDetails from './MovieDetails';
import './Home.css';
import axios from 'axios'; // Import axios for OMDb API

const Home = () => {
  const [availableMovies, setAvailableMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const history = useNavigate(); // Hook to navigate to movie details

  useEffect(() => {
    const fetchAvailableMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        console.log(data); // Log the data
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
        console.log(data); // Log the data
        setTrendingMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=2fdc895&s=${searchTerm}`);
      setSearchResults(response.data.Search || []);
      console.log(response.data); // Log the search results
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  // Function to handle movie click
  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`); // Navigate to movie details page
  };

  return (
    <div className="home">
      <h1>Movie List</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>Error: {error}</p>}

      {/* Search Results Section */}
      <div className="section">
        <h2>Search Results</h2>
        <div className="movie-list">
          {searchResults.length > 0 ? (
            searchResults.map(movie => (
              <div 
                className="movie-card" 
                key={movie.imdbID}
                onClick={() => handleMovieClick(movie.imdbID)} // Click event
              >
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'path/to/placeholder-image.png'} 
                  alt={movie.Title} 
                />
                <p>{movie.Title}</p>
              </div>
            ))
          ) : (
            searchTerm && <p>No search results found</p>
          )}
        </div>
      </div>

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
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/placeholder-image.png'} 
                  alt={movie.title} 
                />
                <p>{movie.title}</p>
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
          {availableMovies.length > 0 ? (
            availableMovies.map(movie => (
              <div 
                className="movie-card" 
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)} // Click event
              >
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/placeholder-image.png'} 
                  alt={movie.title} 
                />
                <p>{movie.title}</p>
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
