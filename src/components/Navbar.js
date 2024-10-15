import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Assuming you have Navbar.css for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Movie App</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> {/* Correct usage of Link */}
        <li><Link to="/login">Login</Link></li> {/* Correct path to the login page */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;