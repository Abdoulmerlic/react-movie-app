import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('https://api.mango.com/auth/register', {
        username,
        email,
        password,
        phone,
      }, {
        headers: {
          'API-Key': 'hvcnvdsg',
          'Authorization': `Bearer 03d45600-a8e5-449b-82a2-f4bc41d97d70`,
          'Content-Type': 'application/json', // Ensure content type is set
        },
      });

      if (response.status === 200) {
        // Redirect to login or home
        window.location = '/login'; // Redirect to login page
      } else {
        setError('Registration failed. Please try again.'); // General error message
      }
    } catch (err) {
      // Check if error has a response and set specific error message
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Error:', errorMessage); // Log the error for debugging
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone (234XXXXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
