import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn } from '../components/Common/Animations';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-27b88e542d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Modern Home"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <FadeIn>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 text-sm font-medium mb-6">
                            Powered by AI Price Prediction
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Find Real Value,<br />Not Just Real Estate.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
                            India's first AI-driven marketplace that tells you the <span className="text-emerald-400 font-bold">Fair Price</span> of any property instantly.
                        </p>
                    </FadeIn>

                    {/* Floating Search Bar */}
                    <SlideIn direction="up" delay={0.2}>
                        <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100">
                                <FiMapPin className="text-gray-400 text-xl mr-3" />
                                <div className="text-left w-full">
                                    <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Bangalore, Mumbai, Delhi..."
                                        className="w-full outline-none text-slate-700 font-medium placeholder-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100">
                                <FiTrendingUp className="text-gray-400 text-xl mr-3" />
                                <div className="text-left w-full">
                                    <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Property Type</label>
                                    <select className="w-full outline-none text-slate-700 font-medium bg-transparent">
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                        <option>Plot / Land</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 py-4 font-bold text-lg md:w-auto w-full transition-all flex items-center justify-center gap-2">
                                <FiSearch /> Search
                            </button>
                        </form>
                    </SlideIn>

                    {/* Quick Stats */}
                    <FadeIn delay={0.4} className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> 10,000+ Verified Listings
                        </div>
                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> 98% Price Accuracy
                        </div>
                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> Zero Brokerage Options
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Features Preview Section would go here... */}
        </div>
    );
};

export default LandingPage;
