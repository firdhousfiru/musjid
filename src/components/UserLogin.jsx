import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/*import Navbar from './Navbar';*/

const UserLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate();

    const readValue = () => {
        axios.post("http://localhost:3030/signIn", data).then(
            (response) => {
                if (response.data.status === "success") {
                    // Store token, userId, and username in sessionStorage
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("userid", response.data.userId);
                    sessionStorage.setItem("username", response.data.username);  // Store the username

                    navigate('/userdashboard');  // Redirect to user dashboard
                } else {
                    alert(response.data.status);
                }
            }
        ).catch(
            (error) => {
                console.log(error.message);
                alert(error.message);
            }
        );
    };


    return (
        <div style={{
            height: '100vh', // Full height of the viewport
            width: '100vw', // Full width of the viewport
            backgroundImage: 'url(https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Background image
            backgroundSize: 'cover', // Background image size
            backgroundPosition: 'center', // Center the background image
            backgroundRepeat: 'no-repeat', // Prevent background repetition
            display: 'flex', // Flexbox for alignment
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <div className="container mt-7">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg">
                            <div className="card-header text-center bg-primary text-light">
                                <h2>LOGIN</h2>
                            </div>
                            <div className="card-body">
                        
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"><b>Email</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={data.email}
                                        onChange={inputHandler}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={data.password}
                                        onChange={inputHandler}
                                        placeholder="Enter your password"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-3 d-flex justify-content-center">
                                    <button className="btn btn-success" onClick={readValue}>
                                        LOGIN
                                    </button>
                                </div>
                                {/* Center the Sign Up button */}
                                <div className="text-light d-flex flex-column align-items-center">
                                <p style={{ color: 'black' }}>New users click to Signup.<br></br>
                                    <center><Link to="/userreg">
                                        Sign Up
                                    </Link></center>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;