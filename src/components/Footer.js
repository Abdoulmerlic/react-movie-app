import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h3>Contact Information</h3>
          <p><strong>Address:</strong> 123 Movie Street, Hollywood, CA 90210</p>
          <p><strong>Email:</strong> <a href="mailto:support@movieapp.com" style={linkStyle}>support@movieapp.com</a></p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        </div>
        <div style={sectionStyle}>
          <h3>Follow Us</h3>
          <p>
            <a href="https://twitter.com/YourMovieApp" style={linkStyle}>Twitter</a> | 
            <a href="https://instagram.com/YourMovieApp" style={linkStyle}> Instagram</a> | 
            <a href="https://facebook.com/YourMovieApp" style={linkStyle}> Facebook</a>
          </p>
        </div>
      </div>
      <div style={bottomBarStyle}>
        <p>&copy; {new Date().getFullYear()} Your Movie App. All rights reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '2rem',
  textAlign: 'center',
  marginTop: '2rem',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: '1000px',
  margin: '0 auto',
};

const sectionStyle = {
  flex: '1',
  minWidth: '200px',
  margin: '0 20px',
};

const linkStyle = {
  color: '#1DA1F2',
  textDecoration: 'none',
};

const bottomBarStyle = {
  borderTop: '1px solid #fff',
  paddingTop: '1rem',
  marginTop: '1rem',
};

export default Footer;
