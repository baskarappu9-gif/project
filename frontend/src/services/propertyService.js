/**
 * Property Service
 * All property-related API calls
 */

import api from './api';

/**
 * Get all properties with filters
 * @param {Object} filters - Search filters
 * @returns {Promise} API response
 */
export const getProperties = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await api.get(`/api/properties?${queryParams}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get single property by ID
 * @param {string} id - Property ID
 * @returns {Promise} API response
 */
export const getPropertyById = async (id) => {
    try {
        const response = await api.get(`/api/properties/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Create new property listing
 * @param {Object} propertyData - Property data
 * @returns {Promise} API response
 */
export const createProperty = async (propertyData) => {
    try {
        const response = await api.post('/api/properties', propertyData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Update existing property
 * @param {string} id - Property ID
 * @param {Object} propertyData - Updated property data
 * @returns {Promise} API response
 */
export const updateProperty = async (id, propertyData) => {
    try {
        const response = await api.put(`/api/properties/${id}`, propertyData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete property
 * @param {string} id - Property ID
 * @returns {Promise} API response
 */
export const deleteProperty = async (id) => {
    try {
        const response = await api.delete(`/api/properties/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Search properties with advanced filters
 * @param {Object} filters - Search criteria
 * @returns {Promise} API response
 */
export const searchProperties = async (filters) => {
    try {
        const response = await api.post('/api/properties/search', filters);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Upload property images
 * @param {FormData} formData - Form data with images
 * @returns {Promise} API response
 */
export const uploadPropertyImages = async (formData) => {
    try {
        const response = await api.post('/api/properties/upload-images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Save/bookmark property
 * @param {string} propertyId - Property ID
 * @returns {Promise} API response
 */
export const saveProperty = async (propertyId) => {
    try {
        const response = await api.post(`/api/properties/${propertyId}/save`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Unsave/remove bookmark from property
 * @param {string} propertyId - Property ID
 * @returns {Promise} API response
 */
export const unsaveProperty = async (propertyId) => {
    try {
        const response = await api.delete(`/api/properties/${propertyId}/save`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Contact property seller
 * @param {string} propertyId - Property ID
 * @param {Object} contactData - Contact information
 * @returns {Promise} API response
 */
export const contactSeller = async (propertyId, contactData) => {
    try {
        const response = await api.post(`/api/properties/${propertyId}/contact`, contactData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get AI price prediction for property
 * @param {Object} propertyData - Property details
 * @returns {Promise} API response
 */
export const getPricePrediction = async (propertyData) => {
    try {
        const response = await api.post('/api/ml/predict-price', propertyData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get market trends for location
 * @param {string} state - State name
 * @param {string} city - City name
 * @returns {Promise} API response
 */
export const getMarketTrends = async (state, city) => {
    try {
        const response = await api.get(`/api/ml/market-trends?state=${state}&city=${city}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get area insights and development info
 * @param {string} state - State name
 * @param {string} city - City name
 * @param {string} area - Area name
 * @returns {Promise} API response
 */
export const getAreaInsights = async (state, city, area) => {
    try {
        const response = await api.get(
            `/api/ml/area-insights?state=${state}&city=${city}&area=${area}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get similar properties
 * @param {string} propertyId - Property ID
 * @returns {Promise} API response
 */
export const getSimilarProperties = async (propertyId) => {
    try {
        const response = await api.get(`/api/properties/${propertyId}/similar`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get user's saved properties
 * @returns {Promise} API response
 */
export const getSavedProperties = async () => {
    try {
        const response = await api.get('/api/user/saved-properties');
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get user's view history
 * @returns {Promise} API response
 */
export const getViewHistory = async () => {
    try {
        const response = await api.get('/api/user/view-history');
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get user's contact history
 * @returns {Promise} API response
 */
export const getContactHistory = async () => {
    try {
        const response = await api.get('/api/user/contact-history');
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Record property view
 * @param {string} propertyId - Property ID
 * @returns {Promise} API response
 */
export const recordPropertyView = async (propertyId) => {
    try {
        const response = await api.post(`/api/properties/${propertyId}/view`);
        return response;
    } catch (error) {
        // Silently fail - view tracking is not critical
        console.error('Failed to record view:', error);
    }
};

export default {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    uploadPropertyImages,
    saveProperty,
    unsaveProperty,
    contactSeller,
    getPricePrediction,
    getMarketTrends,
    getAreaInsights,
    getSimilarProperties,
    getSavedProperties,
    getViewHistory,
    getContactHistory,
    recordPropertyView,
};
