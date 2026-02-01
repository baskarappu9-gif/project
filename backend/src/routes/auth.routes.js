/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { signup, login, getCurrentUser, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

module.exports = router;
