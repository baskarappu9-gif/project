/**
 * Property Context
 * Global property state management using React Context API
 */

import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import * as propertyService from '../services/propertyService';

// Create Property Context
const PropertyContext = createContext();

/**
 * Property Provider Component
 * Wraps app and provides property state
 */
export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [savedProperties, setSavedProperties] = useState([]);
    const [searchFilters, setSearchFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
    });

    /**
     * Fetch properties with filters
     * @param {Object} filters - Search filters
     */
    const fetchProperties = async (filters = {}) => {
        try {
            setLoading(true);
            const response = await propertyService.getProperties({
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            });

            if (response.success) {
                setProperties(response.properties);
                setPagination(response.pagination);
                setSearchFilters(filters);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error(error.message || 'Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search properties
     * @param {Object} filters - Search criteria
     */
    const searchProperties = async (filters) => {
        try {
            setLoading(true);
            const response = await propertyService.searchProperties(filters);

            if (response.success) {
                setProperties(response.properties);
                setPagination(response.pagination);
                setSearchFilters(filters);
            }
        } catch (error) {
            console.error('Error searching properties:', error);
            toast.error(error.message || 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get single property by ID
     * @param {string} id - Property ID
     */
    const getPropertyById = async (id) => {
        try {
            setLoading(true);
            const response = await propertyService.getPropertyById(id);

            if (response.success) {
                setCurrentProperty(response.property);

                // Record view
                await propertyService.recordPropertyView(id);
            }

            return response.property;
        } catch (error) {
            console.error('Error fetching property:', error);
            toast.error(error.message || 'Failed to load property details');
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create new property
     * @param {Object} propertyData - Property data
     */
    const createProperty = async (propertyData) => {
        try {
            setLoading(true);
            const response = await propertyService.createProperty(propertyData);

            if (response.success) {
                toast.success('Property listed successfully!');
                return { success: true, property: response.property };
            }
        } catch (error) {
            console.error('Error creating property:', error);
            toast.error(error.message || 'Failed to create property');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update property
     * @param {string} id - Property ID
     * @param {Object} propertyData - Updated data
     */
    const updateProperty = async (id, propertyData) => {
        try {
            setLoading(true);
            const response = await propertyService.updateProperty(id, propertyData);

            if (response.success) {
                toast.success('Property updated successfully!');
                return { success: true, property: response.property };
            }
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error(error.message || 'Failed to update property');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete property
     * @param {string} id - Property ID
     */
    const deleteProperty = async (id) => {
        try {
            setLoading(true);
            const response = await propertyService.deleteProperty(id);

            if (response.success) {
                toast.success('Property deleted successfully!');
                // Remove from local state
                setProperties(properties.filter(p => p._id !== id));
                return { success: true };
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error(error.message || 'Failed to delete property');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Save/bookmark property
     * @param {string} propertyId - Property ID
     */
    const saveProperty = async (propertyId) => {
        try {
            const response = await propertyService.saveProperty(propertyId);

            if (response.success) {
                toast.success('Property saved!');
                // Update local state
                if (!savedProperties.includes(propertyId)) {
                    setSavedProperties([...savedProperties, propertyId]);
                }
                return { success: true };
            }
        } catch (error) {
            console.error('Error saving property:', error);
            toast.error(error.message || 'Failed to save property');
            return { success: false };
        }
    };

    /**
     * Unsave property
     * @param {string} propertyId - Property ID
     */
    const unsaveProperty = async (propertyId) => {
        try {
            const response = await propertyService.unsaveProperty(propertyId);

            if (response.success) {
                toast.info('Property removed from saved');
                // Update local state
                setSavedProperties(savedProperties.filter(id => id !== propertyId));
                return { success: true };
            }
        } catch (error) {
            console.error('Error unsaving property:', error);
            toast.error(error.message || 'Failed to remove property');
            return { success: false };
        }
    };

    /**
     * Get AI price prediction
     * @param {Object} propertyData - Property details
     */
    const getPricePrediction = async (propertyData) => {
        try {
            setLoading(true);
            const response = await propertyService.getPricePrediction(propertyData);

            if (response.success) {
                return response.prediction;
            }
        } catch (error) {
            console.error('Error getting price prediction:', error);
            toast.error(error.message || 'Failed to get AI prediction');
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch user's saved properties
     */
    const fetchSavedProperties = async () => {
        try {
            setLoading(true);
            const response = await propertyService.getSavedProperties();

            if (response.success) {
                setSavedProperties(response.properties.map(p => p._id));
            }
        } catch (error) {
            console.error('Error fetching saved properties:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Change page
     * @param {number} page - Page number
     */
    const changePage = (page) => {
        setPagination({ ...pagination, page });
        fetchProperties(searchFilters);
    };

    /**
     * Reset filters
     */
    const resetFilters = () => {
        setSearchFilters({});
        setPagination({ ...pagination, page: 1 });
    };

    // Context value
    const value = {
        properties,
        currentProperty,
        savedProperties,
        searchFilters,
        loading,
        pagination,
        fetchProperties,
        searchProperties,
        getPropertyById,
        createProperty,
        updateProperty,
        deleteProperty,
        saveProperty,
        unsaveProperty,
        getPricePrediction,
        fetchSavedProperties,
        changePage,
        resetFilters,
        setCurrentProperty,
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};

/**
 * Custom hook to use Property Context
 * @returns {Object} Property context value
 */
export const useProperty = () => {
    const context = useContext(PropertyContext);

    if (!context) {
        throw new Error('useProperty must be used within PropertyProvider');
    }

    return context;
};

export default PropertyContext;
