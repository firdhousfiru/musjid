import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Volunteer = () => {
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]);
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [latestVolunteer, setLatestVolunteer] = useState(null);

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

    const handleRegisterClick = async () => {
        const volunteerData = { name, phoneNo, address };

        try {
            const response = await axios.post('http://localhost:8000/register-volunteer', volunteerData);
            alert(response.data.message);
            fetchVolunteers();
            setLatestVolunteer(volunteerData);
            setName('');
            setPhoneNo('');
            setAddress('');
        } catch (error) {
            console.error('Error registering volunteer:', error.response.data.message || error.message);
            alert('Error registering volunteer: ' + (error.response.data.message || 'Something went wrong'));
        }
    };

    return (
        <div style={pageStyle}>
            <nav style={navbarStyle}>
                <button style={homeButtonStyle} onClick={handleHomeClick}>
                    Home
                </button>
            </nav>
            <div style={registrationBoxStyle}>
                <h2>Register Volunteer</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={inputStyle}
                    />
                    <button style={registerButtonStyle} onClick={handleRegisterClick}>
                        Register
                    </button>
                </div>
                {latestVolunteer && (
                    <div style={latestVolunteerStyle}>
                        <h3>Latest Registered Volunteer</h3>
                        <p><strong>Name:</strong> {latestVolunteer.name}</p>
                        <p><strong>Phone Number:</strong> {latestVolunteer.phoneNo}</p>
                        <p><strong>Address:</strong> {latestVolunteer.address}</p>
                    </div>
                )}
            </div>
            <h2>Registered Volunteers</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Phone Number</th>
                        <th style={thStyle}>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.length > 0 ? (
                        volunteers.map((volunteer, index) => (
                            <tr key={index} style={trStyle}>
                                <td style={tdStyle}>{volunteer.name}</td>
                                <td style={tdStyle}>{volunteer.phoneNo}</td>
                                <td style={tdStyle}>{volunteer.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={noVolunteerStyle}>No volunteers registered.</td>
                        </tr>
                    )}
                </tbody>
            </table>
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

const registrationBoxStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    width: '400px', // Increased width from 300px to 400px
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const latestVolunteerStyle = {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #4CAF50',
    borderRadius: '5px',
    backgroundColor: '#e8f5e9',
};

const navbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#4CAF50',
    padding: '10px',
};

const navbarButtonStyle = {
    margin: '0 20px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    color: 'black',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const homeButtonStyle = {
    ...navbarButtonStyle,
    backgroundColor: '#ffffff',
    color: '#4CAF50',
};

const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: 'calc(100% - 22px)',
};

const registerButtonStyle = {
    margin: '10px 0',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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
    transition: 'background-color 0.3s',
};

const trStyle = {
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#e0f7fa', // Light blue on hover
    },
};

const noVolunteerStyle = {
    textAlign: 'center',
    padding: '10px',
    fontStyle: 'italic',
};

export default Volunteer;
