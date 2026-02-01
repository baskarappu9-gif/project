/**
 * Property Model
 * MongoDB schema for property listings
 */

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
        // User Reference
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // Property Type
        type: {
            type: String,
            enum: ['buy-house', 'sell-house', 'buy-plot', 'sell-land'],
            required: true,
        },

        // Location
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        landmark: String,
        pincode: {
            type: String,
            match: [/^[1-9][0-9]{5}$/, 'Invalid pincode'],
        },
        coordinates: {
            lat: Number,
            lng: Number,
        },

        // Property Details
        propertyType: {
            type: String,
            required: true,
        },
        bhkType: String,
        totalArea: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        pricePerSqft: Number,

        // House Specific
        totalFloors: Number,
        propertyFloor: Number,
        age: String,
        furnishing: String,
        amenities: [String],
        parking: {
            twoWheeler: { type: Number, default: 0 },
            fourWheeler: { type: Number, default: 0 },
        },
        propertyStatus: String,

        // Land Specific
        roadFacing: Boolean,
        cornerPlot: Boolean,
        waterAvailability: String,
        electricityConnected: Boolean,
        legalStatus: [String],

        // Media
        images: [String],
        documents: [String],

        // AI Data
        aiPriceScore: Number,
        predictedPrice: Number,
        priceRange: {
            min: Number,
            max: Number,
        },

        // Status
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        saves: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
propertySchema.index({ state: 1, city: 1, price: 1 });
propertySchema.index({ bhkType: 1, price: 1 });
propertySchema.index({ type: 1, isActive: 1 });
propertySchema.index({ coordinates: '2dsphere' });

/**
 * Calculate price per sq.ft before saving
 */
propertySchema.pre('save', function (next) {
    if (this.price && this.totalArea) {
        this.pricePerSqft = Math.round(this.price / this.totalArea);
    }
    next();
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
