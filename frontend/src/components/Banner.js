import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ description, link, endDate, isVisible, onTimerEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    console.log('endDate:', endDate);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const end = new Date(endDate);
            const difference = end - now;

            if (difference <= 0) {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                // Hide the banner when the timer ends
                onTimerEnd();
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        };

        if (isVisible) {
            // Initial calculation
            calculateTimeRemaining();

            const countdown = setInterval(() => {
                calculateTimeRemaining();
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(countdown); 
        }
    }, [endDate, isVisible]);

    if (!isVisible) {
        // Do not render anything if the banner is not visible
        return null; 
    }

    const { days, hours, minutes, seconds } = timeRemaining;

    return (
        <div className="banner">
            <p>{description}</p>
            {link && <a href={link} target="_blank" rel="noopener noreferrer">Click here</a>}
            <p>Time left: {days} days {hours} hours {minutes} minutes {seconds} seconds</p>
        </div>
    );
};

export default Banner;
