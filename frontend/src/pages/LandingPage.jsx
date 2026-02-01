import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
            <div className="text-center text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Welcome to PriceWatch
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-primary-100">
                    AI-Powered Real Estate Platform for India
                </p>
                <div className="space-x-4">
                    <Link to="/signup" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                        Get Started
                    </Link>
                    <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
