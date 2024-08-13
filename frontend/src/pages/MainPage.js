import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner.js';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        endDate: '',
        isVisible: false
    });

    const fetchData = async()=>{
        const {data} = await axios.get('/api/banner');
        setBannerData({
            description: data.description,
            link: data.link,
            endDate: data.endDate,
            isVisible: data.isVisible
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleTimerEnd = () => {
        setBannerData(prev => ({ ...prev, isVisible: false }));
    };

    return (
        <div>
            <Link to="/dashboard">
                <button>Dashboard</button>
            </Link>
            <Banner
                description={bannerData.description}
                link={bannerData.link}
                endDate={bannerData.endDate} // Pass endDate instead of timer
                isVisible={bannerData.isVisible}
                onTimerEnd={handleTimerEnd}
            />
        </div>
    );
};

export default MainPage;
