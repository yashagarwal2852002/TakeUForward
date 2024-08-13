import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ description, link, endDate, isVisible, onTimerEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const end = new Date(endDate);
            const difference = end - now;

            if (difference <= 0) {
                setTimeRemaining({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                onTimerEnd();
                return;
            }

            const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

            setTimeRemaining({ days, hours, minutes, seconds });
        };

        if (isVisible) {
            calculateTimeRemaining();

            const countdown = setInterval(() => {
                calculateTimeRemaining();
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [endDate, isVisible]);

    if (!isVisible) {
        return null;
    }

    const { days, hours, minutes, seconds } = timeRemaining;

    return (
        <div className="banner" onClick={() => window.location.href = link}>
            <p className='description'>{description}</p>
            <div className='timer'>
                <div className='box'>
                    <div>{days}</div>
                    <div>DAYS</div>
                </div>
                <div className='box'>
                    <div>:</div>
                    <div> </div>
                </div>
                <div className='box'>
                    <div>{hours}</div>
                    <div>HOURS</div>
                </div>
                <div className='box'>
                    <div>:</div>
                    <div> </div>
                </div>
                <div className='box'>
                    <div>{minutes}</div>
                    <div>MINUTES</div>
                </div>
                <div className='box'>
                    <div>:</div>
                    <div> </div>
                </div>
                <div className='box'>
                    <div>{seconds}</div>
                    <div>SECONDS</div>
                </div>
            </div>
        </div>
    );
};

export default Banner;