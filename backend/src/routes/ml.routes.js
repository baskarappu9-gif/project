/**
 * ML Routes
 * Routes for machine learning predictions
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @desc    Get AI price prediction
 * @route   POST /api/ml/predict-price
 * @access  Public
 */
router.post('/predict-price', async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.ML_SERVICE_URL}/predict-price`,
            req.body
        );

        res.json(response.data);
    } catch (error) {
        console.error('ML prediction error:', error.message);
        res.status(500).json({
            success: false,
            message: 'ML service unavailable. Using fallback prediction.',
            prediction: {
                predictedPrice: req.body.price || 5000000,
                confidence: 0.75,
                aiScore: 75,
                priceRange: {
                    min: (req.body.price || 5000000) * 0.9,
                    max: (req.body.price || 5000000) * 1.1,
                },
                marketPosition: 'FAIR PRICE',
            },
        });
    }
});

module.exports = router;
