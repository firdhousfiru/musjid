// Anavbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Anavbar = ({ title }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true); // Show the modal
  };

  const confirmLogout = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Navigate to home page
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>{title}</h2>
      <div style={styles.buttonContainer}>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>

      {/* Modal for logout confirmation */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Logout Confirmation</h3>
            <p style={styles.modalMessage}>Are you sure you want to log out?</p>
            <div style={styles.modalButtons}>
              <button onClick={confirmLogout} style={styles.confirmButton}>Yes</button>
              <button onClick={cancelLogout} style={styles.cancelButton}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Align button to the right
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  // Styles for the modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  modalMessage: {
    marginBottom: '20px',
    color: '#333', // Change color for better visibility
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  confirmButton: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white', // Ensure text is visible
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '10px 15px',
    backgroundColor: 'red',
    color: 'white', // Ensure text is visible
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Anavbar;
