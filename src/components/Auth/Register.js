import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Normalize phone number
      const normalizedPhone = phone.startsWith('0') ? phone.slice(1) : phone; // Remove leading zero
      const phoneWithCode = `234${normalizedPhone}`; // Add country code

      const response = await axios.post('https://your-api.com/api/auth/register', {
        username,
        email,
        password,
        phone: phoneWithCode, // Use normalized phone
        dob,
      });
      // Redirect to login or home
      window.location = '/login'; // Redirect to login page
    } catch (err) {
      setError('Registration failed');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and leading zero
    if (/^\d*$/.test(value) || value === '') {
      setPhone(value);
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
          type="tel"
          placeholder="Phone number (e.g., 08123456789)"
          value={phone}
          onChange={handlePhoneChange} // Call the new handlePhoneChange function
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;