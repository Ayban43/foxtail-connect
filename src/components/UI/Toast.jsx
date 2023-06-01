import React from 'react';

const Toast = ({ message }) => {
    return (
        <div className="flex gap-2 fixed z-50 bottom-4 right-4 bg-gray-800 text-white px-6 py-4 rounded-md shadow-md">
            <span className='bg-green-700 rounded-lg flex align-middle justify-center p-1'>
                <svg aria-hidden="true" className="w-5 h-5" fill="#bfffc8" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </span>
            {message}
        </div>
    );
};

export default Toast;
