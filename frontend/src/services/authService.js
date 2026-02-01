/**
 * Authentication Service
 * All authentication-related API calls
 */

import api, { setAuthToken, clearAuthToken } from './api';

/**
 * User signup/registration
 * @param {Object} userData - User registration data
 * @returns {Promise} API response
 */
export const signup = async (userData) => {
    try {
        const response = await api.post('/api/auth/signup', userData);

        // If signup successful, save token and user data
        if (response.success && response.token) {
            setAuthToken(response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * User login
 * @param {Object} credentials - Login credentials (email/mobile + password)
 * @returns {Promise} API response
 */
export const login = async (credentials) => {
    try {
        const response = await api.post('/api/auth/login', credentials);

        // If login successful, save token and user data
        if (response.success && response.token) {
            setAuthToken(response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * User logout
 * @returns {Promise} API response
 */
export const logout = async () => {
    try {
        const response = await api.post('/api/auth/logout');

        // Clear local storage
        clearAuthToken();

        return response;
    } catch (error) {
        // Clear local storage even if API call fails
        clearAuthToken();
        throw error;
    }
};

/**
 * Verify email with OTP
 * @param {string} email - Email address
 * @param {string} otp - OTP code
 * @returns {Promise} API response
 */
export const verifyEmail = async (email, otp) => {
    try {
        const response = await api.post('/api/auth/verify-email', { email, otp });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Resend verification email
 * @param {string} email - Email address
 * @returns {Promise} API response
 */
export const resendVerificationEmail = async (email) => {
    try {
        const response = await api.post('/api/auth/resend-verification', { email });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Forgot password - Send reset link
 * @param {string} email - Email address
 * @returns {Promise} API response
 */
export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/api/auth/forgot-password', { email });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise} API response
 */
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post('/api/auth/reset-password', {
            token,
            newPassword
        });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get current user profile
 * @returns {Promise} API response
 */
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/api/auth/me');

        // Update user data in localStorage
        if (response.success && response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
};

/**
 * Get stored user data
 * @returns {Object|null} User data
 */
export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export default {
    signup,
    login,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    isAuthenticated,
    getStoredUser,
};
