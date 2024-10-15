// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Movie App</h1>
      <div className="navbar-links">
        <a href="/">Home</a>
        
        <a href="/about">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
