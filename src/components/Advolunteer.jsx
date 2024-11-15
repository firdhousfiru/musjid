import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Anavbar from './Anavbar';
import Navbar3 from './Navbar3';

const Advolunteer = () => {
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/volunteers');
            setVolunteers(response.data);
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleHomeClick = () => {
        navigate('/home');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/volunteers/${id}`);
            // Remove the deleted volunteer from the state
            setVolunteers(volunteers.filter(volunteer => volunteer._id !== id));
            alert('Volunteer deleted successfully');
        } catch (error) {
            console.error('Error deleting volunteer:', error);
            alert('Error deleting volunteer: ' + (error.response.data.message || 'Something went wrong'));
        }
    };

    return (
        <div>
            <Anavbar />
            <Navbar3 />
            <div style={pageStyle}>
                <h2>Registered Volunteers</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Phone Number</th>
                            <th style={thStyle}>Address</th>
                            <th style={thStyle}>Actions</th> {/* New Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.length > 0 ? (
                            volunteers.map((volunteer, index) => (
                                <tr key={index} style={trStyle}>
                                    <td style={tdStyle}>{volunteer.name}</td>
                                    <td style={tdStyle}>{volunteer.phoneNo}</td>
                                    <td style={tdStyle}>{volunteer.address}</td>
                                    <td style={tdStyle}>
                                        <button 
                                            style={deleteButtonStyle} 
                                            onClick={() => handleDelete(volunteer._id)} // Use volunteer's ID for deletion
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={noVolunteerStyle}>No volunteers registered.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const pageStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
};

const deleteButtonStyle = {
    padding: '5px 10px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#f44336', // Red color
    color: 'white',
    cursor: 'pointer',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    border: '2px solid #4CAF50',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
};

const trStyle = {
    cursor: 'pointer',
};

const noVolunteerStyle = {
    textAlign: 'center',
    padding: '10px',
    fontStyle: 'italic',
};

export default Advolunteer;
