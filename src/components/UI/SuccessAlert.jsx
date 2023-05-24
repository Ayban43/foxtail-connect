import React, { useState, useEffect } from 'react';

const SuccessAlert = () => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (!showAlert) {
        return null; // Return null to not render the alert if showAlert is false
    }

    return (
        <div
            className="fixed top-16 right-4 z-50 m-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center border border-green-300"
            role="alert"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#00c02a"
                className="w-6 h-6 mr-4"
            >
                <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                />
            </svg>
            Successfully saved!
        </div>
    );
};

export default SuccessAlert;
