import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Import axios

// Simple Modal component for messages
const Modal = ({ message, onClose }) => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalStyle}>
                <h2>{message}</h2>
                <button onClick={onClose} style={buttonStyle}>Close</button>
            </div>
        </div>
    );
};

const Education = () => {
    const navigate = useNavigate(); 
    const [selectedTiming, setSelectedTiming] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(''); 
    const [fetchedTiming, setFetchedTiming] = useState('');
    const name = sessionStorage.getItem("name"); // Assuming you're using the user's name for fetching

    const fetchTiming = async () => {
        console.log('User name from sessionStorage:', name); 
        try {
            const response = await axios.get(`http://localhost:8000/api/users/timing/${name}`);
            console.log('Response from API:', response.data);
            setFetchedTiming(response.data.timing || 'No timing selected yet.');
        } catch (error) {
            console.error('Error fetching timing:', error.response ? error.response.data : error.message);
            setFetchedTiming('Error fetching timing.');
        }
    };

    useEffect(() => {
        fetchTiming();
    }, [name]); // Run when the component mounts or when the name changes

    const handleTimingChange = (event) => {
        setSelectedTiming(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedTiming) {
            setModalMessage('Please select a timing');
            setShowModal(true);
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/users/timing', {
                name: name,
                timing: selectedTiming,
            });
            setModalMessage('Successfully Submitted!');
            setShowModal(true);

            // Fetch timing again after successful submission
            await fetchTiming();
        } catch (error) {
            setModalMessage('Error submitting timing. Please try again.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTiming('');
    };

    const handleHomeClick = () => {
        navigate('/home'); 
    };

    return (
        <div style={mainContainerStyle}>
            <button onClick={handleHomeClick} style={homeButtonStyle}>Home</button>
            <div style={containerStyle}>
                <h1>Welcome to the Evening Classes!</h1>
                <p>Please select a timing:</p>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <select value={selectedTiming} onChange={handleTimingChange} style={selectStyle}>
                        <option value="" disabled>Select Timing</option>
                        <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                        <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                        <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                    </select>
                    <button type="submit" style={buttonStyle}>Submit</button>
                </form>

                {showModal && (
                    <Modal message={modalMessage} onClose={handleCloseModal} />
                )}

                {/* Display the fetched timing */}
                <div style={timingDisplayStyle}>
                    <h3>Your Selected Timing:</h3>
                    <p>{selectedTiming}</p>
                </div>
            </div>
        </div>
    );
};

// Styles
const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
};

const selectStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
};

const homeButtonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
};

// Modal Styles
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
};

const timingDisplayStyle = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    textAlign: 'center',
};

export default Education;
