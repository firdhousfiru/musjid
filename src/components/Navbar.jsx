// Navbar.js
import React from 'react';

const Navbar = ({ onScrollToSignUp, onScrollToLogin, username, isLoggedIn }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ width: '100%' }}>
            <div className="container-fluid">
                <span className="navbar-brand"><h1>MAMBRA MUHIYADEEN MUSJID</h1></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={onScrollToSignUp}>Login/Register</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link">Welcome, {username}!</span> {/* Display username */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
