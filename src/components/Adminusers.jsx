import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar3 from './Navbar3';
import Anavbar from './Anavbar';

const Adminusers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                setUsers(users.filter(user => user._id !== id));
                alert("User deleted successfully!");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div>
            <Anavbar/>
        <Navbar3/>
       
        <div style={styles.container}>
           
            <h2 style={styles.title}>User List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone No</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>House No</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={styles.td}>{user.name}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td style={styles.td}>{user.phoneNo}</td>
                            <td style={styles.td}>{user.address}</td>
                            <td style={styles.td}>{user.houseNo}</td>
                            <td style={styles.td}>
                                <button 
                                    onClick={() => deleteUser(user._id)} 
                                    style={styles.deleteButton}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    homeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ccc',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ccc',
        padding: '12px',
        textAlign: 'left',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#007bff',
    },
    error: {
        textAlign: 'center',
        fontSize: '18px',
        color: 'red',
    }
};

export default Adminusers;
