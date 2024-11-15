import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Services2 from './Services2';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Modal from './Modal';
import UserNavbar from './UserNavbar';

const Home2 = () => {
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
    const signUpRef = useRef(null);
    const loginRef = useRef(null);
    const name=sessionStorage.getItem("name");
    const address=sessionStorage.getItem("address");
    const houseNo=sessionStorage.getItem("houseNo");
    const phoneNo=sessionStorage.getItem("PhoneNo");
    const email=sessionStorage.getItem("email");

    useEffect(() => {
        // Check session storage for login status and user info
        const email = sessionStorage.getItem('email');
        if (email) {
            setIsLogin(true);
            // Optionally load more user data from session storage if needed
        }
    }, []);

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
        const url = isLogin ? '/userlogin' : '/userreg';

        try {
            const response = await fetch(`http://localhost:3000${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.status === 'success') {
                sessionStorage.setItem('email', formData.email); // Store login info
                setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
                setIsLogin(true);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error occurred. Please try again.');
        }
    };

    const handleServiceClick = (service) => {
        if (isLogin) {
            switch (service) {
                case 'daily-prayers':
                    navigate('/prayer-timings');
                    break;
                case 'education':
                    navigate('/education');
                    break;
                case 'volunteer':
                    navigate('/volunteer');
                    break;
                case 'maintenance':
                    navigate('/maint');
                    break;
                case 'donation':
                    navigate('/donation');
                    break;
                case 'payment':
                    navigate('/payment');
                    break;
                case 'auction':
                    navigate('/uauc');
                    break;
                default:
                    console.log('Service not found');
            }
        } else {
            setModalVisible(true); // Show login modal if not logged in
        }
    };

    const onRequireLogin = () => {
        setModalVisible(true);
    };

    return (
        <div style={{
            backgroundImage: `url(https://images7.alphacoders.com/925/thumb-1920-925757.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <UserNavbar />
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


            <Services2 isLogin={isLogin} onRequireLogin={onRequireLogin} />

            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)} signUpRef={signUpRef}>
                    <h2>Please Log In</h2>
                    <p>You need to log in to access the services.</p>
                </Modal>
            )}

            <Footer />
        </div>
    );
};

export default Home2;
