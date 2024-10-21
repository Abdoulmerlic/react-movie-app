import React, { useState } from 'react';
import axios from 'axios'; 
import './Search.css'; // Add styles for search component

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=2fdc895&s=${searchTerm}`);

      // Check if the API returned an error
      if (response.data.Error) {
        setError(response.data.Error);  // Set error if no movies found or issue with API
        setMovies([]); // Clear movies if error
      } else {
        setError(''); // Clear error if successful
        setMovies(response.data.Search || []); // Set movies if found
      }
    } catch (error) {
      setError('Error fetching movie data');
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      <div className="search-results">
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Title} ({movie.Year})</p>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && !error && <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
