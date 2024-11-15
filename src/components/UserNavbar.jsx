import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserNavbar = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const name = sessionStorage.getItem("name");

    // Function to handle logout
    const handleLogout = () => {
        // Display a logged out message
        alert('You have successfully logged out!');
        // Clear session storage
        sessionStorage.clear(); // Clear all session storage
        // Navigate to the home page
        navigate('/'); 
    };

    return (
        <nav style={navbarStyle}>
            <div style={navContentStyle}>
                <div style={welcomeStyle}>
                    Welcome {name}
                </div>
                <button style={logoutButtonStyle} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

// Styles
const navbarStyle = {
    backgroundColor: '#4CAF50',
    padding: '15px',
    color: 'white',
};

const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
};

const welcomeStyle = {
    fontSize: '18px',
    marginLeft: 'auto',
};

const logoutButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '20px',
    transition: 'color 0.3s',
};

export default UserNavbar;
