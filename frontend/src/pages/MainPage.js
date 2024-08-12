import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner.js';

const MainPage = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        endDate: '',
        isVisible: false
    });

    
      

    const fetchData = async()=>{
        const {data} = await axios.get('http://localhost:5000/api/banner');
        console.log(data);

        // Update the state with the fetched data
        setBannerData({
            description: data.description,
            link: data.link,
            endDate: data.endDate,
            isVisible: data.isVisible
        });
    }

    useEffect(() => {
        // const {data} = await axios.get('http://localhost:5000/api/banner');
        // axios.get('http://localhost:5000/api/banner').then(response => {
        //     // Ensure the endDate is a valid date string
        //     console.log(response.data);
        //     setBannerData({
        //         description: response.data.description,
        //         link: response.data.link,
        //         endDate: response.data.endDate,
        //         isVisible: response.data.isVisible
        //     });
        // }).catch(error => console.error('Error fetching banner data:', error));
        fetchData();
    }, []);

    const handleTimerEnd = () => {
        setBannerData(prev => ({ ...prev, isVisible: false }));
    };

    return (
        <div>
            <h1>Welcome to Our Website</h1>
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
