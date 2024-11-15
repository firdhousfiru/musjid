import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Userauc = () => {
    const [auctionItems, setAuctionItems] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Create a navigate function

    // Fetch auction items from the backend when the component mounts
    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/adminauction');
                const data = await response.json();

                if (response.ok) {
                    setAuctionItems(data);
                } else {
                    setMessage(data.message || 'Failed to fetch auction items');
                }
            } catch (error) {
                console.error('Error fetching auction items:', error);
                setMessage('Error fetching auction items');
            }
        };

        fetchAuctionItems();
    }, []);

    // Function to navigate to the home page
    const handleHomeClick = () => {
        navigate('/home'); // Use navigate instead of history.push
    };

    return (
        <div>
            <div style={styles.navbar}>
                <h1 style={styles.logo}>Mambra Muhiyadeen Masjid</h1>
                <button onClick={handleHomeClick} style={styles.homeButton}>Home</button>
            </div>
            <div style={styles.container}>
                {message && <p style={styles.message}>{message}</p>}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Product Name</th>
                            <th style={styles.tableHeader}>Starting Rate</th>
                            <th style={styles.tableHeader}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctionItems.length > 0 ? (
                            auctionItems.map((item, index) => (
                                <tr key={index} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{item.productName}</td>
                                    <td style={styles.tableCell}>${item.startingRate}</td>
                                    <td style={styles.tableCell}>{item.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={styles.tableCell}>No auction items available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    logo: {
        fontSize: '20px',
        margin: 0,
    },
    homeButton: {
        padding: '10px 15px',
        borderRadius: '5px',
        backgroundColor: '#0056b3',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    message: {
        color: 'red',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        height: '400px', // Increased height for the table
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '12px',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '15px',
        textAlign: 'left',
        backgroundColor: '#f0f0f0', // Light background for table cells
        border: '1px solid white', // Create gap effect
    },
};

export default Userauc;
