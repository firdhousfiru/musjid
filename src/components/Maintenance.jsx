import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Maintenance = () => {
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const name = sessionStorage.getItem("name") || "Guest";
    const navigate = useNavigate(); // Create a navigate function

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/maintenance');
                setMaintenanceTasks(response.data);
            } catch (error) {
                console.error('Error fetching maintenance tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleHelpRequest = async (task) => {
        try {
            await axios.post(`http://localhost:8000/api/maintenance/${task._id}/request-help`, {
                name,
            });
            alert(`Help requested for: ${task.type} - ${task.description}`);
        } catch (error) {
            console.error('Error submitting help request:', error);
            alert('Failed to request help. Please try again.');
        }
    };

    // Function to navigate to the home page
    const handleHomeClick = () => {
        navigate('/home'); // Use navigate to redirect
    };

    return (
        <div>
            <Navbar onHomeClick={handleHomeClick} />
            <div style={pageStyle}>
                <h2>Maintenance Tasks</h2>
                {maintenanceTasks.length > 0 ? (
                    <div style={tableContainerStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr style={headerStyle}>
                                    <th style={cellStyle}>Type</th>
                                    <th style={cellStyle}>Description</th>
                                    <th style={cellStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maintenanceTasks.map((task, index) => (
                                    <tr key={task._id} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                                        <td style={cellStyle}>{task.type}</td>
                                        <td style={cellStyle}>{task.description}</td>
                                        <td style={cellStyle}>
                                            <button
                                                onClick={() => handleHelpRequest(task)}
                                                style={helpButtonStyle}>
                                                Help
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No maintenance tasks available.</p>
                )}
            </div>
        </div>
    );
};

// Navbar Component
const Navbar = ({ onHomeClick }) => {
    return (
        <div style={navbarStyle}>
            <h1 style={logoStyle}></h1>
            <button onClick={onHomeClick} style={homeButtonStyle}>Home</button>
        </div>
    );
};

// Styles
const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
};

const logoStyle = {
    margin: 0,
    fontSize: '20px',
};

const homeButtonStyle = {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0056b3',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
};

const pageStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
};

const tableContainerStyle = {
    marginTop: '20px',
    textAlign: 'left',
    width: '80%',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const headerStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
};

const rowStyleEven = {
    backgroundColor: '#f9f9f9',
};

const rowStyleOdd = {
    backgroundColor: '#ffffff',
};

const cellStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const helpButtonStyle = {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
};

export default Maintenance;
