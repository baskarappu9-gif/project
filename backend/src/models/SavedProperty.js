/**
 * Saved Property Model
 * Relationship between users and saved properties
 */

const mongoose = require('mongoose');

const savedPropertySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure user can only save a property once
savedPropertySchema.index({ userId: 1, propertyId: 1 }, { unique: true });

const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);

module.exports = SavedProperty;
