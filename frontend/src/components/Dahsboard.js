import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

// Utility function to convert ISO date to datetime-local format
const convertToLocalDateTime = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const Dashboard = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        endDate: '',
        isVisible: false
    });

    useEffect(() => {
        axios.get('/api/banner').then(response => {
            const formattedEndDate = convertToLocalDateTime(response.data.endDate);
            setBannerData({
                ...response.data,
                endDate: formattedEndDate
            });
        }).catch(error => console.error('Error fetching banner data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'endDate') {
            // Convert the value to ISO format for storage
            const isoDate = new Date(value).toISOString();
            setBannerData(prev => ({
                ...prev,
                [name]: isoDate
            }));
        } else {
            setBannerData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleToggle = () => {
        setBannerData(prev => ({
            ...prev,
            isVisible: !prev.isVisible
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/banner', bannerData)
            .then(response => alert('Banner updated successfully!'))
            .catch(error => console.error('Error updating banner:', error));
    };

    return (
        <div className='dashboard'>
            <h2>Internal Banner Dashboard</h2>
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
                        type="datetime-local"
                        name="endDate"
                        value={convertToLocalDateTime(bannerData.endDate)}
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
