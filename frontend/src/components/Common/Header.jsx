import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiHeart, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-600 p-2 rounded-xl shadow-lg group-hover:bg-primary-700 transition-colors">
                            <FiHome className="text-white text-xl" />
                        </div>
                        <span className={`text-2xl font-display font-bold ${scrolled ? 'text-slate-800' : 'text-slate-800' // Keeping text dark for now as landing might be light
                            }`}>
                            Price<span className="text-primary-600">Watch</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/buy" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Buy</Link>
                        <Link to="/rent" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Rent</Link>
                        <Link to="/sell" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Sell</Link>
                        <Link to="/ai-predict" className="font-medium text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-1">
                            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent font-bold">AI Insight</span>
                        </Link>

                        {user ? (
                            <div className="relative">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 pl-4 border-l border-gray-200"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                        {getInitials(user.fullName)}
                                    </div>
                                    <span className="font-medium text-slate-700">{user.fullName.split(' ')[0]}</span>
                                </motion.button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                                        >
                                            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700">
                                                <FiUser /> Profile
                                            </Link>
                                            <Link to="/saved-properties" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700">
                                                <FiHeart /> Saved Homes
                                            </Link>
                                            <div className="h-px bg-gray-100 my-1"></div>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-500 font-medium">
                                                <FiLogOut /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="font-medium text-slate-600 hover:text-primary-600">Log in</Link>
                                <Link to="/signup" className="btn-primary-new">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl text-slate-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <Link to="/buy" className="p-2 font-medium text-slate-700">Buy Property</Link>
                            <Link to="/sell" className="p-2 font-medium text-slate-700">Sell Property</Link>
                            <Link to="/ai-predict" className="p-2 font-medium text-primary-600">AI Price Check</Link>
                            <hr />
                            {user ? (
                                <>
                                    <Link to="/profile" className="p-2 font-medium text-slate-700">My Profile</Link>
                                    <button onClick={handleLogout} className="p-2 text-left font-medium text-red-500">Logout</button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <Link to="/login" className="text-center py-2 rounded-lg border border-gray-200 font-medium">Log in</Link>
                                    <Link to="/signup" className="text-center py-2 rounded-lg bg-primary-600 text-white font-medium">Sign up</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
