import React from 'react';

const Dashboard = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center">Dashboard</h1>
            <div className="row">
                <div className="col-md-4">
                    <div 
                        className="card text-center" 
                        style={{ 
                            backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.Ty9ULaYXT9CcYt-VJFVgZwHaE7&pid=Api&P=0&h=180)', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            height: '200px' // Set height for the card
                        }}
                    >
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', padding: '20px' }}>
                            <h5 className="card-title">Manage Donations</h5>
                            <p className="card-text">View and manage donations made to the mosque.</p>
                            <a href="#" className="btn btn-primary">Click here</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        className="card text-center" 
                        style={{ 
                            backgroundImage: 'url(https://tse3.mm.bing.net/th?id=OIP.H3bn4gd3wtYR723YGpMJfQHaEs&pid=Api&P=0&h=180)', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            height: '200px' // Set height for the card
                        }}
                    >
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '8px', padding: '20px' }}>
                            <h5 className="card-title">Volunteer Coordination</h5>
                            <p className="card-text">Plan and manage events at the mosque.</p>
                            <a href="#" className="btn btn-primary">Click here </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        className="card text-center" 
                        style={{ 
                            backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDMzfHxlbnwwfHx8fDE2ODQyMjY4NzU&ixlib=rb-4.0.3&q=80&w=400)', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            height: '200px' // Set height for the card
                        }}
                    >
                        <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px' }}>
                            <h5 className="card-title">Maintenance Management</h5>
                            <p className="card-text">Engage with the community and gather feedback.</p>
                            <a href="#" className="btn btn-primary">Click here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
