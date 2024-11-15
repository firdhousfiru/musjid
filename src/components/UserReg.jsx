import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const UserReg = () => {
    const [data, setData] = useState({
        name: "",
        address: "",
        houseno: "",
        phoneno: "",
        email: "",
        password: "",
    });

    // Input handler to update state
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // Form submission handler
    const readValue = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Destructuring the data object for validation
        const { name, address, houseno, phoneno, email, password } = data;

        // Validate if any fields are empty
        if (!name || !address || !houseno || !phoneno || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Send data to the backend
            const response = await axios.post("http://localhost:3032/signUp", data);
            console.log("Response from server:", response.data);

            if (response.data.status === "success") {
                alert("Successfully registered");
                // Clear form after successful registration
                setData({
                    name: "",
                    address: "",
                    houseno: "",
                    phoneno: "",
                    email: "",
                    password: "",
                });
            } else {
                alert(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("There was an error during registration:", error);
            if (error.response) {
                // Server responded with a status other than 200 range
                alert(error.response.data.message || "An error occurred. Please try again.");
            } else if (error.request) {
                // Request was made but no response was received
                alert("No response from the server. Please check your network.");
            } else {
                // Something happened in setting up the request
                alert("An error occurred. Please try again.");
            }
        }
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
                                <h2>Sign Up</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={readValue}>
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='name'
                                                value={data.name}
                                                onChange={inputHandler}
                                                placeholder="Enter your name:"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='address'
                                                value={data.address}
                                                onChange={inputHandler}
                                                placeholder="Enter your address:"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="houseno" className="form-label">House No</label> {/* Changed name to 'houseno' */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='houseno' 
                                                value={data.houseno}
                                                onChange={inputHandler}
                                                placeholder="Enter your House no:"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="phoneno" className="form-label">Phone Number</label> {/* Changed name to 'phoneno' */}
                                            <input
                                            n
                                                type="text"
                                                className="form-control"
                                                name='phoneno' 
                                                value={data.phoneno}
                                                onChange={inputHandler}
                                                placeholder="Enter your phone number:"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name='email'
                                                value={data.email}
                                                onChange={inputHandler}
                                                placeholder="Enter your email:"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='password'
                                                value={data.password}
                                                onChange={inputHandler}
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>

                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-success w-100 mt-2">Register</button>
                                            <p className="mt-2">Already have an account? <Link to="/userlogin">Login</Link></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReg;
