/**
 * Dashboard Component
 * Main dashboard with 4 property module cards
 */

import React, { useState } from 'react';
import { FiHome, FiTag, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // Property module cards configuration
    const propertyModules = [
        {
            id: 'buy-house',
            title: 'Buy House',
            description: 'Find your dream home',
            icon: FiHome,
            color: 'bg-blue-500',
            hoverColor: 'hover:bg-blue-600',
            path: '/buy-house',
        },
        {
            id: 'sell-house',
            title: 'Sell House',
            description: 'List your property',
            icon: FiTag,
            color: 'bg-green-500',
            hoverColor: 'hover:bg-green-600',
            path: '/sell-house',
        },
        {
            id: 'buy-plot',
            title: 'Buy Plot',
            description: 'Invest in land',
            icon: FiMapPin,
            color: 'bg-purple-500',
            hoverColor: 'hover:bg-purple-600',
            path: '/buy-plot',
        },
        {
            id: 'sell-land',
            title: 'Sell Land',
            description: 'Sell your land',
            icon: FiTrendingUp,
            color: 'bg-orange-500',
            hoverColor: 'hover:bg-orange-600',
            path: '/sell-land',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to PriceWatch
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-100">
                        AI-Powered Real Estate Platform for India
                    </p>
                    <div className="mt-8 flex items-center justify-center space-x-8 text-sm md:text-base">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">10K+</span>
                            <span className="ml-2 text-primary-100">Properties</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">95%</span>
                            <span className="ml-2 text-primary-100">AI Accuracy</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">5K+</span>
                            <span className="ml-2 text-primary-100">Happy Users</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Trust Banner */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-12 flex items-center justify-center space-x-8 flex-wrap">
                    <div className="flex items-center">
                        <span className="text-green-500 text-2xl mr-2">✅</span>
                        <span className="font-semibold">ZERO BROKERAGE FEE</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-green-500 text-2xl mr-2">✅</span>
                        <span className="font-semibold">VERIFIED LISTINGS</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-green-500 text-2xl mr-2">✅</span>
                        <span className="font-semibold">100% TRUSTED PLATFORM</span>
                    </div>
                </div>

                {/* Property Module Cards */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        What would you like to do today?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {propertyModules.map((module) => (
                            <button
                                key={module.id}
                                onClick={() => navigate(module.path)}
                                className={`${module.color} ${module.hoverColor} text-white rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                            >
                                <module.icon className="text-5xl mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                                <p className="text-white text-opacity-90">{module.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Hot Areas */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="text-2xl mr-2">🔥</span>
                            Hot Areas This Week
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span>Whitefield, Bangalore</span>
                                <span className="text-green-600 font-semibold">+15%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Bandra, Mumbai</span>
                                <span className="text-green-600 font-semibold">+12%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Sector 62, Noida</span>
                                <span className="text-green-600 font-semibold">+10%</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Drops */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="text-2xl mr-2">📉</span>
                            Recent Price Drops
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-blue-600">23 properties</p>
                                <p className="text-sm text-gray-600">reduced in last 7 days</p>
                            </div>
                            <button className="btn-primary w-full mt-4">
                                View All
                            </button>
                        </div>
                    </div>

                    {/* Trending Markets */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="text-2xl mr-2">📈</span>
                            Trending Markets
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span>Gurgaon</span>
                                <span className="badge badge-success">+12%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Pune</span>
                                <span className="badge badge-success">+8%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Hyderabad</span>
                                <span className="badge badge-success">+7%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
