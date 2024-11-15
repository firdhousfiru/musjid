// AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar3 from './Navbar3';
import Anavbar from './Anavbar';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <Anavbar/>
      <Navbar3/>
      <div style={welcomeStyle}>
        <h1 style={welcomeTextStyle}>Welcome, Admin!</h1>
        <p style={subTextStyle}>
          Here you can manage users, classes, donations, and more. Use the navigation above to access the different sections of the admin panel.
        </p>
      </div>
    </div>
  );
};

// Styles
const welcomeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh', // Vertically center the welcome text
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f8f9fa',
};

const welcomeTextStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#007BFF',
};

const subTextStyle = {
  fontSize: '18px',
  color: '#555',
  maxWidth: '600px',
  marginTop: '10px',
};

export default AdminHome;
