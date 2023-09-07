'use client'
import React, { useState, useEffect } from 'react';

function InactivityTimer({ timeoutInSeconds,handlelogout }) {
    const [remainingTime, setRemainingTime] = useState(timeoutInSeconds);

// start timer
    useEffect(() => {
        let timer;

        const resetTimer = () => {
            setRemainingTime(timeoutInSeconds);
            timer && clearInterval(timer);
            startTimer();
        };

        const startTimer = () => {
            timer = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        };

        if (remainingTime === 0) {
            resetTimer();
            handlelogout();
        }

        startTimer();

        // Reset the timer on user activity
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            clearInterval(timer);
        };
    }, [remainingTime, timeoutInSeconds]);

    return (
        <div>
            {remainingTime < 30 && <p>Time remaining: {remainingTime} seconds, you will be automatically logout.</p>}
        </div>
    );
}

export default InactivityTimer;
