import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiTrendingUp, FiPlus, FiDollarSign, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import PropertyCard from '../Property/PropertyCard';
import Loader from '../Common/Loader';
import { FadeIn, SlideIn } from '../Common/Animations';

const Dashboard = () => {
    const { user } = useAuth();
    const { properties, loading, fetchProperties } = useProperty();
    const [recentProperties, setRecentProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (properties.length > 0) {
            setRecentProperties(properties.slice(0, 3)); // Show top 3
        }
    }, [properties]);

    if (loading) return <Loader />;

    const stats = [
        { label: 'Total Listings', value: '1,240', icon: <FiHome />, color: 'bg-blue-100 text-blue-600' },
        { label: 'Avg. Market Price', value: '₹85L', icon: <FiDollarSign />, color: 'bg-emerald-100 text-emerald-600' },
        { label: 'Market Growth', value: '+12%', icon: <FiTrendingUp />, color: 'bg-purple-100 text-purple-600' },
        { label: 'Active Users', value: '850', icon: <FiClock />, color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-slate-800">
                            Welcome back, <span className="text-primary-600">{user?.fullName?.split(' ')[0]}</span> 👋
                        </h1>
                        <p className="text-slate-500 mt-1">Here's what's happening in the real estate market today.</p>
                    </div>

                    <div className="flex gap-3">
                        <Link to="/ai-predict" className="btn-accent flex items-center gap-2">
                            <FiTrendingUp /> Check AI Price
                        </Link>
                        <Link to="/sell" className="btn-primary-new flex items-center gap-2">
                            <FiPlus /> New Listing
                        </Link>
                    </div>
                </FadeIn>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <SlideIn direction="up" delay={index * 0.1} key={index}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        </SlideIn>
                    ))}
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Listings Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Recommended for You</h2>
                            <Link to="/buy" className="text-primary-600 font-medium hover:underline">View All</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentProperties.map((property, idx) => (
                                <FadeIn delay={0.2 + (idx * 0.1)} key={property._id}>
                                    <PropertyCard property={property} />
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / AI Insights */}
                    <div className="lg:col-span-1">
                        <SlideIn direction="left" delay={0.3}>
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                                        <FiTrendingUp className="text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-bold">Market Pulse</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Top Performing Area</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg">HSR Layout</span>
                                            <span className="text-emerald-400 font-bold">+8.4% ↗</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                                            <div className="bg-emerald-500 h-1.5 rounded-full w-[84%]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Price Drop Alert</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg">Whitefield</span>
                                            <span className="text-red-400 font-bold">-2.1% ↘</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                                            <div className="bg-red-400 h-1.5 rounded-full w-[21%]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-700">
                                    <h4 className="font-bold mb-2">Did you know?</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Properties near the upcoming Metro line in Electronic City have seen a 15% appreciation in the last 6 months.
                                    </p>
                                </div>
                            </div>
                        </SlideIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
