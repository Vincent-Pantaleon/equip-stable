'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [status, setStatus] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = dayjs();
            setCurrentTime(now);

            let newStatus = '';
            if (now.hour() >= 17 || now.hour() <= 8) {
                newStatus = 'Closed';
            } else {
                newStatus = 'Open';
            }

            setStatus(newStatus);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const statusBGColor = status === 'Open' ? 'bg-status-green' : 'bg-status-red';
    const statusTextColor = status === 'Open' ? 'text-status-green' : 'text-status-red';

    return (
        <div className="hidden md:flex flex-col md:flex-row items-center justify-center bg-white rounded-2xl p-5 md:gap-5">
            {/* Time */}
            <div className="text-2xl sm:text-3xl">
                {currentTime.format('h:mm A')}
            </div>
            {/* Date and Day */}
            <div className="flex flex-col items-center text-center">
                <div>
                    {currentTime.format('M/D/YYYY')}
                </div>
                <div>
                    {currentTime.format('dddd')}
                </div>
                {/* Status */}
                <div className={`flex items-center rounded-full`}>
                    <span className={`w-3 h-3 rounded-full ${statusBGColor} mr-1`}></span>
                    <span className={`${statusTextColor}`}>{status}</span>
                </div>
            </div>
        </div>
    );
};
