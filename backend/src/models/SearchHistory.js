/**
 * Search History Model
 */

const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        filters: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

searchHistorySchema.index({ userId: 1, createdAt: -1 });

const SearchHistory = mongoose model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;
