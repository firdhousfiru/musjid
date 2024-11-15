import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import Navbar3 from './Navbar3';

const Admaint = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);
    const [showHelpRequests, setShowHelpRequests] = useState(false);
    

    useEffect(() => {
        fetchMaintenanceTasks();
        fetchHelpRequests();
    }, []);

    const fetchMaintenanceTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/maintenance');
            console.log('Maintenance Tasks:', response.data);
            setMaintenanceTasks(response.data);
        } catch (error) {
            console.error('Error fetching maintenance tasks:', error);
        }
    };

    const fetchHelpRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/maintenance/help-requests');
            console.log('Help Requests:', response.data);
            const allHelpRequests = response.data.reduce((acc, task) => {
                if (task.helpRequests && task.helpRequests.length) {
                    return [...acc, ...task.helpRequests];
                }
                return acc;
            }, []);
            setHelpRequests(allHelpRequests);
        } catch (error) {
            console.error('Error fetching help requests:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !type || !description) {
            setMessage('Please fill in all fields.');
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/maintenance', { name, type, description });
            setMessage('Maintenance task added successfully!');
            fetchMaintenanceTasks();
            setName('');
            setType('');
            setDescription('');
        } catch (error) {
            setMessage('Error adding maintenance. Please try again.');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/api/maintenance/${taskId}`);
            fetchMaintenanceTasks();
        } catch (error) {
            console.error('Error deleting maintenance task:', error);
        }
    };

    return (
        <div> <Anavbar/>
        <Navbar3/>
        <div style={styles.container}>
            <h2 style={styles.title}>Add Maintenance Task</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Type"
                    style={styles.input}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={styles.textarea}
                ></textarea>
                <button type="submit" style={styles.button}>Add Maintenance</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}

            <h2 style={styles.title}>Maintenance Tasks</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Type</th>
                        <th style={styles.tableHeader}>Description</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenanceTasks.map(task => (
                        <tr key={task._id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{task.name || 'N/A'}</td>
                            <td style={styles.tableCell}>{task.type || 'N/A'}</td>
                            <td style={styles.tableCell}>{task.description || 'N/A'}</td>
                            <td style={styles.tableCell}>
                                <button onClick={() => handleDelete(task._id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 style={styles.title}>Help Requests</h2>
            {showHelpRequests && (
                <div style={styles.helpRequestsContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Name</th>
                                <th style={styles.tableHeader}>Type</th>
                                <th style={styles.tableHeader}>Description</th>
                                <th style={styles.tableHeader}>Phone Number</th> {/* Add phone number header */}
                            </tr>
                        </thead>
                        <tbody>
                            {helpRequests.map((request, index) => (
                                <tr key={index} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{request.userName || 'N/A'}</td>
                                    <td style={styles.tableCell}>{request.type || 'N/A'}</td>
                                    <td style={styles.tableCell}>{request.description || 'N/A'}</td>
                                    <td style={styles.tableCell}>{request.phone || 'N/A'}</td> {/* Display phone number */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <button onClick={() => setShowHelpRequests(!showHelpRequests)} style={styles.button}>
                {showHelpRequests ? 'Hide' : 'Show'} Help Requests
            </button>
        </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '10px',
    },
    form: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        minHeight: '80px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    message: {
        color: 'green',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: 'white',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '15px',
        textAlign: 'left',
    },
    deleteButton: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: 'white',
        cursor: 'pointer',
    },
    helpRequestsContainer: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
};

export default Admaint;
