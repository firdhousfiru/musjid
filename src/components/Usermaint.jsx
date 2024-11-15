import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Usermaint = () => {
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState(''); // New state for type
    const [description, setDescription] = useState(''); // New state for description
    const [phone, setPhone] = useState(''); // New state for phone number

    useEffect(() => {
        const fetchMaintenanceTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/maintenance');
                
                setMaintenanceTasks(response.data);
            } catch (error) {
                console.error('Error fetching maintenance tasks:', error);
            }
        };

        fetchMaintenanceTasks();
    }, []);

    const handleHelpClick = (task) => {
        setSelectedTask(task);
        setType(task.type); // Set the type from the selected task
        setDescription(task.description); // Set the description from the selected task
        setShowModal(true);
    };

    const handleSubmitHelpRequest = async (e) => {
        e.preventDefault();
        if (!name || !type || !description || !phone) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await axios.post(`http://localhost:8000/api/maintenance/${selectedTask._id}/request-help`, {
                name,
                type,
                description,
                phone, // Send phone number
            });
            alert("Help request submitted successfully.");
            setShowModal(false);
            setName('');
            setType('');
            setDescription('');
            setPhone('');
        } catch (error) {
            console.error('Error submitting help request:', error);
            alert("Failed to submit help request.");
        }
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <h2 style={styles.title}>Maintenance Tasks</h2>
            {maintenanceTasks.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Type</th>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceTasks.map((task) => (
                            <tr key={task._id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{task.type}</td>
                                <td style={styles.tableCell}>{task.description}</td>
                                <td style={styles.tableCell}>
                                    <button 
                                        onClick={() => handleHelpClick(task)} 
                                        style={styles.helpButton}>
                                        Help
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={styles.noTasksMessage}>No maintenance tasks available.</p>
            )}

            {showModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3>Request Help</h3>
                        <form onSubmit={handleSubmitHelpRequest}>
                            <label>
                                Enter your name:
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    style={styles.input} 
                                />
                            </label>
                            <label>
                                Type:
                                <input 
                                    type="text" 
                                    value={type} 
                                    readOnly 
                                    style={styles.input} 
                                />
                            </label>
                            <label>
                                Description:
                                <input 
                                    type="text" 
                                    value={description} 
                                    readOnly 
                                    style={styles.input} 
                                />
                            </label>
                            <label>
                                Phone Number:
                                <input 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    style={styles.input} 
                                />
                            </label>
                            <button type="submit" style={styles.submitButton}>Submit</button>
                            <button onClick={() => setShowModal(false)} style={styles.cancelButton}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '15px',
        textAlign: 'left',
    },
    helpButton: {
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
    },
    noTasksMessage: {
        marginTop: '20px',
        color: '#555',
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '300px',
    },
    input: {
        marginTop: '10px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        marginTop: '15px',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    cancelButton: {
        marginTop: '10px',
        padding: '5px 15px',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default Usermaint;
