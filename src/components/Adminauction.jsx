import React, { useState, useEffect } from 'react';
import Anavbar from './Anavbar';
import Navbar3 from './Navbar3';

const AdminAuction = () => {
    const [productName, setProductName] = useState('');
    const [startingRate, setStartingRate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [auctionItems, setAuctionItems] = useState([]);
    const [message, setMessage] = useState('');

    // Load auction items from the database on component mount
    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/adminauction');
                const data = await response.json();
                if (response.ok) {
                    setAuctionItems(data); // Load data from the database
                } else {
                    console.error('Failed to load auction items:', data.message);
                }
            } catch (error) {
                console.error('Error loading auction items:', error);
            }
        };
        fetchAuctionItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !startingRate || !quantity) {
            setMessage('Please fill in all fields.');
            return;
        }

        const newItem = { productName, startingRate, quantity };

        try {
            const response = await fetch('http://localhost:8000/adminauction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            const data = await response.json();

            if (response.ok) {
                setAuctionItems([...auctionItems, newItem]);
                setMessage('Auction item added successfully!');
            } else {
                setMessage(data.message || 'Failed to add auction item.');
            }
        } catch (error) {
            console.error('Error adding auction item:', error);
            setMessage('Error adding auction item.');
        }

        setProductName('');
        setStartingRate('');
        setQuantity('');
    };

    const handleDelete = async (index) => {
        const itemToDelete = auctionItems[index];
        try {
            const response = await fetch(`http://localhost:8000/adminauction/${itemToDelete._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const newAuctionItems = auctionItems.filter((_, i) => i !== index);
                setAuctionItems(newAuctionItems);
                setMessage('Auction item deleted successfully!');
            } else {
                setMessage('Failed to delete auction item.');
            }
        } catch (error) {
            console.error('Error deleting auction item:', error);
            setMessage('Error deleting auction item.');
        }
    };

    return (
        <div>
            <Anavbar />
            <Navbar3 />
            <div style={styles.container}>
                <h2 style={styles.title}>Add Friday Auction Item</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                        style={styles.input}
                    />
                    <input
                        type="number"
                        value={startingRate}
                        onChange={(e) => setStartingRate(e.target.value)}
                        placeholder="Starting Rate"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Add Auction Item</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}

                <h2 style={styles.title}>Auction Items</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Product Name</th>
                            <th style={styles.tableHeader}>Starting Rate</th>
                            <th style={styles.tableHeader}>Quantity</th>
                            <th style={styles.tableHeader}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctionItems.map((item, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{item.productName}</td>
                                <td style={styles.tableCell}>${item.startingRate}</td>
                                <td style={styles.tableCell}>{item.quantity}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
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
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: '#FF5733',
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
};

export default AdminAuction;
