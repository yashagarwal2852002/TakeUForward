import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        endDate: '',
        isVisible: false
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/banner').then(response => {
            setBannerData(response.data);
        }).catch(error => console.error('Error fetching banner data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggle = () => {
        setBannerData(prev => ({
            ...prev,
            isVisible: !prev.isVisible
        }));
    };

    const handleSubmit = (e) => {
        console.log(bannerData);
        e.preventDefault();
        axios.post('http://localhost:5000/api/banner', bannerData)
            .then(response => alert('Banner updated successfully!'))
            .catch(error => console.error('Error updating banner:', error));
    };

    return (
        <div>
            <h2>Banner Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Banner Description:
                    <input
                        type="text"
                        name="description"
                        value={bannerData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Banner Link:
                    <input
                        type="text"
                        name="link"
                        value={bannerData.link}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Banner End Date:
                    <input
                        type="datetime-local"  // Use datetime-local input type for endDate
                        name="endDate"
                        value={bannerData.endDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Banner Visibility:
                    <input
                        type="checkbox"
                        checked={bannerData.isVisible}
                        onChange={handleToggle}
                    />
                </label>
                <br />
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Dashboard;
