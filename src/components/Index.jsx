import React from 'react';


const Index = () => {
    return (
        <div>
           
            {/* Header Section */}
            <header className="bg-primary text-white py-3">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>MAMBRA MUHIYADEEN MUSJID</h1>
                        <nav>
                            <ul className="nav">
                                <li className="nav-item"><a href="#home" className="nav-link text-white">Home</a></li>
                                <li className="nav-item"><a href="#services" className="nav-link text-white">Services</a></li>
                                <li className="nav-item"><a href="#announcements" className="nav-link text-white">Announcements</a></li>
                                <li className="nav-item"><a href="#contact" className="nav-link text-white">Contact Us</a></li>
                                <li className="nav-item"><a href="/signin" className="nav-link text-white">Login</a></li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero bg-light text-center py-5">
                <div className="container">
                    <h2>Welcome to ULLIYERI Panchayath</h2>
                    <p>Serving the community with dedication and transparency.</p>
                    <a href="#services" className="btn btn-primary">Explore Our Services</a>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services bg-white py-5">
                <div className="container text-center">
                    <h3>Our Services</h3>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://play-lh.googleusercontent.com/JurCbWki_E_z3P1f9vJGaazLkpTZtG3MaDPq48IGysXqYlOo6sbQnVPgkMBz_wM_E5Y" className="card-img-top" alt="Service 1" />
                                <div className="card-body">
                                    <h5 className="card-title">THOZHILURAPPU</h5>
                                    <p className="card-text">Description of service 1.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://tse3.mm.bing.net/th?id=OIP.bAaJ8dS02UFisifgAUCRtAAAAA&pid=Api&P=0&h=220" className="card-img-top" alt="Service 2" />
                                <div className="card-body">
                                    <h5 className="card-title">HARIDHAKARMA SENA</h5>
                                    <p className="card-text">Description of service 2.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://tse2.mm.bing.net/th?id=OIP.e-UYjlUhtGunu6BS2WxIuAAAAA&pid=Api&P=0&h=220" className="card-img-top" alt="Service 3" />
                                <div className="card-body">
                                    <h5 className="card-title">CENSUS FORM</h5>
                                    <p className="card-text">Description of service 3.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Announcements Section */}
            <section id="announcements" className="announcements bg-light py-5">
                <div className="container text-center">
                    <h3>Latest Announcements</h3>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <ul className="list-group">
                                <li className="list-group-item">Thozhilurappu Employment Registration
                                    Date: November 1, 2024
                                    The Panchayat is inviting applications for employment under the Thozhilurappu (MGNREGA) scheme.
                                     Eligible residents can register at the Panchayat office or online by November 15, 2024. 1</li>
                                <li className="list-group-item">Waste Management Initiative

                                    Date: November 5, 2024
                                    A new initiative for segregating waste at source will be launched on November 5, 2024. All households are requested to follow the guidelines issued by the Panchayat for proper waste management. 2</li>
                                <li className="list-group-item">Health Camp for Senior Citizens

                                    Date: November 12, 2024
                                    A free health camp for senior citizens will be held at the Panchayat office on November 12, 2024. Services include general check-ups, blood pressure monitoring, and consultations with specialists.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" class="contact bg-white py-5">
                <div class="container text-center">

                    <div class="row mt-4">
                        <div class="col-md-6 mx-auto">
                            <p><strong>Panchayat Office Address:</strong><br />
                                Panchayat Bhavan, Main Road, Village Name, District, State - Pincode</p>
                            <p><strong>Phone Numbers:</strong><br />
                                Panchayat Office: +91-9876543210<br />
                                Emergency Helpline: +91-1234567890</p>
                            <p><strong>Email:</strong><br />
                                info@panchayatname.in<br />
                                support@panchayatname.in</p>
                            <p><strong>Working Hours:</strong><br />
                                Monday to Friday: 9:00 AM - 5:00 PM<br />
                                Saturday: 9:00 AM - 1:00 PM<br />
                                Sunday: Closed</p>
                            <p><strong>Follow Us:</strong><br />
                                <a href="https://facebook.com/panchayatname">Facebook</a> |
                                <a href="https://twitter.com/panchayatname">Twitter</a></p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="contact bg-white py-5">
                <div className="container text-center">
                    <h3>Contact Us</h3>
                    <p>Feel free to get in touch with us for any queries or concerns.</p>
                    <div className="row mt-4">
                        <div className="col-md-6 mx-auto">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-primary text-white text-center py-3">
                <div className="container">
                    <p>&copy; 2024 UULIYERI Panchayath. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Index;
