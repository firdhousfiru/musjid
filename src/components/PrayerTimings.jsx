import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PrayerTimings = () => {
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `http://api.aladhan.com/v1/calendar?latitude=9.9816&longitude=76.2999&method=2&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`;

        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data && data.data) {
                    setPrayerTimes(data.data);
                } else {
                    setError('Invalid data received from the API');
                }
            } catch (error) {
                setError('Error fetching prayer times');
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>
                        Home
                    </button>
                </Link>
            </div>
            <center><h2 style={{ color: '#333' }}>Prayer Timings for this Month</h2></center>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <thead style={{ backgroundColor: '#3498db', color: 'white' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Date</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Fajr</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Dhuhr</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Asr</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Maghrib</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Isha</th>
                    </tr>
                </thead>
                <tbody>
                    {prayerTimes.map((prayer) => (
                        <tr key={prayer.date.readable} style={{ backgroundColor: '#fff' }}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.date.readable}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.timings.Fajr}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.timings.Dhuhr}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.timings.Asr}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.timings.Maghrib}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '12px' }}>{prayer.timings.Isha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrayerTimings;
