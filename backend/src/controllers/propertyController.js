/**
 * Property Controller
 * Handle property CRUD operations
 */

const Property = require('../models/Property');
const SavedProperty = require('../models/SavedProperty');
const axios = require('axios');

/**
 * @desc    Get all properties with filters
 * @route   GET /api/properties
 * @access  Public
 */
const getProperties = async (req, res) => {
    try {
        const {
            type,
            state,
            city,
            area,
            minPrice,
            maxPrice,
            bhkType,
            propertyType,
            page = 1,
            limit = 20,
        } = req.query;

        // Build query
        const query = { isActive: true };

        if (type) query.type = type;
        if (state) query.state = state;
        if (city) query.city = city;
        if (area) query.area = area;
        if (bhkType) query.bhkType = bhkType;
        if (propertyType) query.propertyType = propertyType;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Property.countDocuments(query);

        // Fetch properties
        const properties = await Property.find(query)
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            properties,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching properties',
        });
    }
};

/**
 * @desc    Get single property by ID
 * @route   GET /api/properties/:id
 * @access  Public
 */
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            'userId',
            'fullName email mobile'
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }

        // Increment views
        property.views += 1;
        await property.save();

        res.json({
            success: true,
            property,
        });
    } catch (error) {
        console.error('Get property error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching property',
        });
    }
};

/**
 * @desc    Create new property
 * @route   POST /api/properties
 * @access  Private
 */
const createProperty = async (req, res) => {
    try {
        // Add user ID to property data
        const propertyData = {
            ...req.body,
            userId: req.user._id,
        };

        // Get AI price prediction if selling
        if (propertyData.type === 'sell-house' || propertyData.type === 'sell-land') {
            try {
                const mlResponse = await axios.post(
                    `${process.env.ML_SERVICE_URL}/predict-price`,
                    propertyData
                );

                if (mlResponse.data.success) {
                    propertyData.predictedPrice = mlResponse.data.prediction.predictedPrice;
                    propertyData.aiPriceScore = mlResponse.data.prediction.aiScore;
                    propertyData.priceRange = mlResponse.data.prediction.priceRange;
                }
            } catch (mlError) {
                console.error('ML prediction error:', mlError.message);
                // Continue without AI prediction
            }
        }

        const property = await Property.create(propertyData);

        res.status(201).json({
            success: true,
            message: 'Property created successfully',
            property,
        });
    } catch (error) {
        console.error('Create property error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating property',
        });
    }
};

/**
 * @desc    Update property
 * @route   PUT /api/properties/:id
 * @access  Private (Owner only)
 */
const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }

        // Check ownership
        if (property.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this property',
            });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Property updated successfully',
            property: updatedProperty,
        });
    } catch (error) {
        console.error('Update property error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating property',
        });
    }
};

/**
 * @desc    Delete property
 * @route   DELETE /api/properties/:id
 * @access  Private (Owner only)
 */
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }

        // Check ownership
        if (property.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this property',
            });
        }

        await property.deleteOne();

        res.json({
            success: true,
            message: 'Property deleted successfully',
        });
    } catch (error) {
        console.error('Delete property error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting property',
        });
    }
};

/**
 * @desc    Save property
 * @route   POST /api/properties/:id/save
 * @access  Private
 */
const saveProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }

        // Check if already saved
        const existing = await SavedProperty.findOne({
            userId: req.user._id,
            propertyId: req.params.id,
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Property already saved',
            });
        }

        await SavedProperty.create({
            userId: req.user._id,
            propertyId: req.params.id,
        });

        // Increment saves count
        property.saves += 1;
        await property.save();

        res.json({
            success: true,
            message: 'Property saved successfully',
        });
    } catch (error) {
        console.error('Save property error:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving property',
        });
    }
};

/**
 * @desc    Unsave property
 * @route   DELETE /api/properties/:id/save
 * @access  Private
 */
const unsaveProperty = async (req, res) => {
    try {
        const result = await SavedProperty.findOneAndDelete({
            userId: req.user._id,
            propertyId: req.params.id,
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Property not in saved list',
            });
        }

        // Decrement saves count
        await Property.findByIdAndUpdate(req.params.id, {
            $inc: { saves: -1 },
        });

        res.json({
            success: true,
            message: 'Property removed from saved',
        });
    } catch (error) {
        console.error('Unsave property error:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing property',
        });
    }
};

module.exports = {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    saveProperty,
    unsaveProperty,
};
