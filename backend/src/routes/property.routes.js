/**
 * Property Routes
 */

const express = require('express');
const router = express.Router();
const {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    saveProperty,
    unsaveProperty,
} = require('../controllers/propertyController');
const { protect, optionalAuth } = require('../middleware/auth.middleware');

// Public routes
router.get('/', optionalAuth, getProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.post('/:id/save', protect, saveProperty);
router.delete('/:id/save', protect, unsaveProperty);

module.exports = router;
