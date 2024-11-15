import React from 'react';
import { useNavigate } from 'react-router-dom';

const servicesData = [
    { title: 'Prayer Timings', description: 'Join us for daily prayers in a serene environment. Click below to know the prayer timings.' },
    { title: 'Educational Programs', description: 'Evening classes for all age groups are available. Click to register.' },
    { title: 'Volunteer Coordination', description: 'Participate in various masjid activities. Click below to volunteer.' },
    { title: 'Maintenance Required', description: 'Click to view and help the mosque defected equipment. Click below to volunteer.' },
  
    { title: 'Friday Auction', description: 'Now you can see the Friday auction list, click here to know.' },
];

const Services2 = () => {
    const navigate = useNavigate();

    const handleServiceClick = (title) => {
        switch (title) {
            case 'Prayer Timings':
                navigate('/prayer-timings'); // Navigate to Prayer Timings page
                break;
            case 'Educational Programs':
                navigate('/education');
                break;
            case 'Volunteer Coordination':
                navigate('/volunteer');
                break;
            case 'Maintenance Required':
                navigate('/maint'); // Assuming this is your route for maintenance
                break;
            case 'Donations':
                navigate('/donation');
                break;
            case 'Monthly Payment':
                navigate('/payment');
                break;
            case 'Friday Auction':
                navigate('/uauc');
                break;
            default:
                console.log('Service not found');
        }
    };

    return (
        <div id="services" className="container text-center my-5">
            <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                textTransform: 'uppercase',
                position: 'relative',
                marginBottom: '30px',
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: 'rgba(240, 240, 240, 0.8)',
                borderRadius: '5px'
            }}>
                Services
                <span style={{
                    display: 'block',
                    width: '80px',
                    height: '4px',
                    backgroundColor: '#3498db',
                    margin: '10px auto 0',
                    borderRadius: '2px'
                }}></span>
            </h2>
            <div className="row">
                {servicesData.map((service, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{service.title}</h5>
                                <p className="card-text">{service.description}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => handleServiceClick(service.title)}
                                >
                                    {service.title === 'Prayer Timings' ? 'Click Here' : (service.title === 'Educational Programs' ? 'Register' : 'Click Here')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services2;
