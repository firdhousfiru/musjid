// Navbar2.js
import React from 'react';

const Navbar2 = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container" style={{ justifyContent: 'center' }}> {/* Center align the content */}
                <a className="navbar-brand" href="#" style={{ color: 'white', fontSize: '1.5rem' }}></a> {/* Increased font size */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul className="navbar-nav" style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the nav items */}
                        <li className="nav-item">
                            <a className="nav-link" href="#history-heritage" style={{ color: 'white', fontSize: '1.2rem' }}>History and Heritage</a> {/* Increased font size */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services" style={{ color: 'white', fontSize: '1.2rem' }}>Services</a> {/* Increased font size */}
                        </li>
                        {/* Add other nav links as needed */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
