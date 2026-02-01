/**
 * Axios API Configuration
 * Centralized HTTP client with interceptors for authentication
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * Adds JWT token to every request
 */
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // If token exists, add to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles errors and token refresh
 */
api.interceptors.response.use(
    (response) => {
        // Return response data directly
        return response.data;
    },
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            const { status, data } = error.response;

            // Unauthorized - Token expired or invalid
            if (status === 401) {
                // Clear token and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            // Forbidden
            if (status === 403) {
                console.error('Access forbidden:', data.message);
            }

            // Not Found
            if (status === 404) {
                console.error('Resource not found:', data.message);
            }

            // Server Error
            if (status >= 500) {
                console.error('Server error:', data.message);
            }

            // Return error message from backend
            return Promise.reject(data);
        }

        // Network error (no response)
        if (error.request) {
            console.error('Network error: No response from server');
            return Promise.reject({
                success: false,
                message: 'Network error. Please check your connection.',
            });
        }

        // Request configuration error
        return Promise.reject({
            success: false,
            message: error.message || 'An error occurred',
        });
    }
);

/**
 * Helper function to set auth token
 * @param {string} token - JWT token
 */
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }
};

/**
 * Helper function to get auth token
 * @returns {string|null} JWT token
 */
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

/**
 * Helper function to clear auth token
 */
export const clearAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
};

export default api;
