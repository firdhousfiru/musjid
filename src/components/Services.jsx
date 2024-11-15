import React from 'react';

const servicesData = [
    { title: 'Prayer Timings', description: 'Join us for daily prayers in a serene environment. Click below to know the prayer timings.' },
    { title: 'Educational Programs', description: 'Evening classes for all age groups are available. Click to register.' },
    { title: 'Volunteer Coordination', description: 'Participate in various masjid activities. Click below to volunteer.' },
    { title: 'Maintenance Required', description: 'Click to view and help the mosque defected equipments. Click below to volunteer.' },
    { title: 'Donations', description: 'Click here to view and donate to the mosque or certain events' },
    { title: 'Monthly payment', description: 'Monthly payments can be done here,Click below for your monthly payments' },
    { title: 'Friday Auction', description: 'Now you can see the fridat auction list,click here to know' },// Add more services as needed
];

const Services = ({ isLogin, onRequireLogin }) => {
    const handleServiceClick = (title) => {
        if (!isLogin) {
            onRequireLogin();  // Show modal if not logged in
        } else {
            console.log(`Navigating to ${title} page...`);
            // Navigate logic here (e.g., using react-router)
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
                                    Click Here
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
