import React from 'react';
const HomeButton = () => {

    const NavigateHome = () => {
        window.location.href = '/';
    };

    return (
        <button
            onClick={NavigateHome}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center transition-colors border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
        </button>
    );
};

export default HomeButton;