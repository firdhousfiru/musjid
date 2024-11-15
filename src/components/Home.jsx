import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Services from './Services';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Modal from './Modal';
import Modal2 from './Modal2';

const Home = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        houseNo: '',
        phoneNo: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const signUpRef = useRef(null);
    const loginRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const adminEmail = "admin@gmail.com"; // Replace with your admin email
        const adminPassword = "admin"; // Replace with your admin password
       
      
    
        if (isLogin && formData.email === adminEmail && formData.password === adminPassword) {
            navigate('/ahome'); // Navigate to admin page directly
            return;
        }
        // Validation for phone number and password
        if (!/^\d{10}$/.test(formData.phoneNo)) {
            setMessage("Phone number must be exactly 10 digits.");
            return;
        }
    
        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }
    
        const url = isLogin ? '/userlogin' : '/userreg';
        
    
        try {
            const response = await fetch(`http://localhost:8000${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
    
            if (data.status === 'success') {
                if (isLogin) {
                    // Store user details and token from response
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("name", data.user.name);
                    sessionStorage.setItem("address", data.user.address);
                    sessionStorage.setItem("houseNo", data.user.houseNo);
                    sessionStorage.setItem("phoneNo", data.user.phoneNo);
                    sessionStorage.setItem("email", data.user.email);
    
                    setMessage('Login successful!');
                    setSuccessModalVisible(true);
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                        navigate('/home'); // Redirect after showing message
                    }, 2000);
                } else {
                    setMessage('Registration successful!');
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setMessage('Error occurred. Please try again.');
        }
    };
    
    

    const handleServiceClick = () => {
        if (!isLogin) {
            setModalVisible(true);
        } else {
            console.log('Navigating to Services page...');
        }
    };

    return (
        <div style={{
            backgroundImage: `url(https://images7.alphacoders.com/925/thumb-1920-925757.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <Navbar onScrollToSignUp={() => scrollToSection(signUpRef)} onScrollToLogin={() => scrollToSection(loginRef)} />
            <Navbar2 />
            <Hero />
            <Testimonials />
            <div id="history-heritage" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '50px 20px',
                marginTop: '20px',
                textAlign: 'center',
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <h1>Our History and Heritage</h1>
        <p>
            <h2>History:</h2>
            Mambra Muhiyadeen Masjid, located in Kerala, is one of the oldest mosques in the region, known for its deep-rooted Islamic traditions and cultural significance. It was established several centuries ago by early Muslim settlers, and it played a crucial role in spreading Islamic teachings and serving as a spiritual center for the local community. Over time, the mosque has grown to become a landmark of faith and resilience in the region.
        </p>
        <p>
            <h2>Heritage:</h2>
            The heritage of Mambra Muhiyadeen Masjid is reflected in its architectural design, which combines traditional Kerala styles with Islamic architectural elements. The structure features intricate wooden carvings, minarets, and a prayer hall that stands as a testament to the craftsmanship of the era. The masjid is also celebrated for its religious events and festivals, which attract visitors from various parts of the state and beyond. Through these gatherings, the mosque has preserved and promoted the region's Islamic culture, reinforcing its significance as both a historical and cultural beacon in the area.
        </p>

                </div>
            </div>

            <div id="services" style={{
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    padding: '50px 20px',
    marginTop: '20px',
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    textAlign: 'center'
}}>
    <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
    }}>
        <h1>Our Services</h1>
        <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>
                <h3>Daily Prayers and Jummah (Friday) Services</h3>
                <p>The masjid conducts five daily prayers and a special congregation for Friday prayers with a khutbah (sermon).</p>
            </li>
            <li>
                <h3>Islamic Education</h3>
                <p>Offers classes for Quran recitation, Tajweed (pronunciation rules), and Hadith studies for all age groups.</p>
            </li>
            <li>
                <h3>Charity and Zakat Collection</h3>
                <p>Acts as a center for collecting and distributing zakat (obligatory alms), sadaqah (voluntary charity), and donations to support the needy.</p>
            </li>
            <li>
                <h3>Social Events and Celebrations</h3>
                <p>Hosts community gatherings and events for Islamic festivals like Eid al-Fitr and Eid al-Adha, and organizes iftar gatherings during Ramadan.</p>
            </li>
            <li>
                <h3>Marriage Services</h3>
                <p>Facilitates nikah (marriage) ceremonies and provides guidance on Islamic marriage practices.</p>
            </li>
            <li>
                <h3>Funeral Services</h3>
                <p>Offers funeral assistance, including ghusl (washing of the deceased), janazah (funeral prayer), and burial arrangements as per Islamic customs.</p>
            </li>
        </ul>
    </div>
</div>


            <div ref={signUpRef} style={formContainerStyle}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div style={{ marginBottom: '20px' }}>
                                    <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <input name="houseNo" type="text" placeholder="House No" value={formData.houseNo} onChange={handleChange} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <input name="phoneNo" type="text" placeholder="Phone No" value={formData.phoneNo} onChange={handleChange} required style={inputStyle} />
                                </div>
                            </>
                        )}
                        <div style={{ marginBottom: '20px' }}>
                            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <button type="submit" style={buttonStyle}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
                    <p style={{ marginTop: '20px' }}>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button onClick={() => setIsLogin(!isLogin)} style={toggleButtonStyle}>
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>

            {successModalVisible && (
                <Modal2 onClose={() => setSuccessModalVisible(false)}>
                    <h2>Login Successful!</h2>
                    <p>You will be redirected shortly...</p>
                </Modal2>
            )}

            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)} signUpRef={signUpRef}>
                    <h2>Please Login</h2>
                    <p>You need to log in to access this feature.</p>
                </Modal>
            )}

            <Footer />
        </div>
    );
};

// Styles
const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '50px 20px',
    marginTop: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
};

const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
};

export default Home;
