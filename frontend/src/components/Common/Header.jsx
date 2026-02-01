/**
 * Header Component
 * Top navigation bar with logo, search, and user menu
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiHeart, FiLogOut, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Handle logout
     */
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    /**
     * Handle search
     */
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <div className="bg-primary-600 p-2 rounded-lg">
                            <FiHome className="text-white text-2xl" />
                        </div>
                        <span className="text-2xl font-bold text-primary-600">
                            Price<span className="text-gray-800">Watch</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for properties, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </form>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiHome className="inline mr-2" />
                            Home
                        </Link>
                        <Link
                            to="/saved-properties"
                            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiHeart className="inline mr-2" />
                            Saved
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {getInitials(user?.fullName || 'User')}
                                </div>
                                <span className="font-medium">{user?.fullName || 'User'}</span>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FiUser className="inline mr-2" />
                                            Profile
                                        </Link>
                                        <Link
                                            to="/activity"
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Activity
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                                        >
                                            <FiLogOut className="inline mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-4">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </form>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-2 space-y-2">
                        <Link
                            to="/dashboard"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            <FiHome className="inline mr-2" />
                            Home
                        </Link>
                        <Link
                            to="/saved-properties"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            <FiHeart className="inline mr-2" />
                            Saved
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            <FiUser className="inline mr-2" />
                            Profile
                        </Link>
                        <Link
                            to="/activity"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Activity
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600"
                        >
                            <FiLogOut className="inline mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
