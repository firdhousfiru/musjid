// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar3 = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Admin Dashboard</h2>
      <ul style={styles.navLinks}>
        <li style={styles.navItem} onClick={() => navigate('/ahome')}>Home</li>
        <li style={styles.navItem} onClick={() => navigate('/auser')}>View and Manage Users</li>
        <li style={styles.navItem} onClick={() => navigate('/adedu')}>Evening Class Registration</li>
        <li style={styles.navItem} onClick={() => navigate('/advolunteer')}>Volunteers</li>
        <li style={styles.navItem} onClick={() => navigate('/admaint')}>Add Maintenance</li>
       
        <li style={styles.navItem} onClick={() => navigate('/adauc')}>Friday Auction</li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    width: '100%', // Full width
    backgroundColor: '#000', // Black background
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '15px',
  },
  navItem: {
    cursor: 'pointer',
    padding: '10px 15px',
    backgroundColor: '#333', // Darker background for buttons
    borderRadius: '5px',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  navItemHover: {
    backgroundColor: '#555', // Darker hover effect
  }
};

export default Navbar3;
