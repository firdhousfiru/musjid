import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import Navbar3 from './Navbar3';

const AdeducationWithHover = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserTimings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching user timings. Please try again.');
                console.error(error);
            }
        };

        fetchUserTimings();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            // Remove the user from state
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            setError('Error deleting user. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <Anavbar />
            <Navbar3 />
            <div style={adminContainerStyle}>
                <h1>Registered Users and Their Timings</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            <th style={headerCellStyle}>Name</th>
                            <th style={headerCellStyle}>Selected Timing</th>
                            <th style={headerCellStyle}>Actions</th> {/* New Actions Column */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} style={rowStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor} onMouseLeave={e => e.currentTarget.style.backgroundColor = rowStyle.backgroundColor}>
                                <td style={cellStyle}>{user.name}</td>
                                <td style={cellStyle}>{user.selectedTiming || 'Not selected'}</td>
                                <td style={cellStyle}>
                                    <button onClick={() => handleDelete(user._id)} style={deleteButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const adminContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const headerRowStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
};

const headerCellStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #0056b3',
};

const rowStyle = {
    backgroundColor: '#f2f2f2',
    transition: 'background-color 0.3s',
};

const cellStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

// Add hover effect for rows
const hoverStyle = {
    backgroundColor: '#e1e1e1',
};

const deleteButtonStyle = {
    backgroundColor: '#FF4136', // Red color for delete button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default AdeducationWithHover;
