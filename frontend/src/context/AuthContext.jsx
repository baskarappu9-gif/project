/**
 * Auth Context
 * Global authentication state management using React Context API
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';

// Create Auth Context
const AuthContext = createContext();

/**
 * Auth Provider Component
 * Wraps app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    /**
     * Check if user is authenticated
     */
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);

                // Optionally verify token with backend
                try {
                    const response = await authService.getCurrentUser();
                    if (response.success) {
                        setUser(response.user);
                    }
                } catch (error) {
                    // Token might be expired
                    console.error('Token verification failed:', error);
                    logout();
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * User signup
     * @param {Object} userData - Registration data
     */
    const signup = async (userData) => {
        try {
            setLoading(true);
            const response = await authService.signup(userData);

            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                toast.success('Account created successfully!');
                return { success: true, user: response.user };
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.message || 'Signup failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * User login
     * @param {Object} credentials - Login credentials
     */
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await authService.login(credentials);

            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                toast.success('Login successful!');
                return { success: true, user: response.user };
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || 'Login failed. Please check your credentials.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * User logout
     */
    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            toast.info('Logged out successfully');
        }
    };

    /**
     * Update user profile
     * @param {Object} userData - Updated user data
     */
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Context value
    const value = {
        user,
        loading,
        isAuthenticated,
        signup,
        login,
        logout,
        updateUser,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use Auth Context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};

export default AuthContext;
