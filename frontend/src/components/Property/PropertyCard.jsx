/**
 * Property Card Component
 * Displays property information in card format
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShare2, FiMapPin, FiBed, FiMaximize2 } from 'react-icons/fi';
import { formatIndianCurrency } from '../../utils/helpers';
import { AI_SCORE_INTERPRETATION } from '../../utils/constants';

const PropertyCard = ({ property, onSave, onUnsave, isSaved = false }) => {
    const [saved, setSaved] = useState(isSaved);

    /**
     * Handle save/unsave toggle
     */
    const handleSaveToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (saved) {
            await onUnsave(property._id);
            setSaved(false);
        } else {
            await onSave(property._id);
            setSaved(true);
        }
    };

    /**
     * Handle share
     */
    const handleShare = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: property.title,
                    text: `Check out this property on PriceWatch`,
                    url: window.location.origin + `/property/${property._id}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    // Get AI score interpretation
    const scoreInfo = property.aiPriceScore
        ? AI_SCORE_INTERPRETATION(property.aiPriceScore)
        : null;

    return (
        <Link
            to={`/property/${property._id}`}
            className="block bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
        >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=Property+Image'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Actions Overlay */}
                <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                        onClick={handleSaveToggle}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${saved
                                ? 'bg-red-500 text-white'
                                : 'bg-white bg-opacity-80 text-gray-700 hover:bg-red-500 hover:text-white'
                            }`}
                    >
                        <FiHeart className={saved ? 'fill-current' : ''} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-white bg-opacity-80 text-gray-700 hover:bg-primary-500 hover:text-white backdrop-blur-sm transition-colors"
                    >
                        <FiShare2 />
                    </button>
                </div>

                {/* Verified Badge */}
                {property.isVerified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <span className="mr-1">✓</span>
                        VERIFIED
                    </div>
                )}
            </div>

            {/* Property Details */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {property.bhkType} {property.propertyType}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <FiMapPin className="mr-1" />
                    <span className="line-clamp-1">
                        {property.area}, {property.city}
                    </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                    <p className="text-2xl font-bold text-primary-600">
                        {formatIndianCurrency(property.price)}
                    </p>
                    {property.pricePerSqft && (
                        <p className="text-sm text-gray-500">
                            {formatIndianCurrency(property.pricePerSqft)}/sq.ft
                        </p>
                    )}
                </div>

                {/* Property Info */}
                <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
                    <div className="flex items-center">
                        <FiBed className="mr-1" />
                        <span>{property.bhkType || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                        <FiMaximize2 className="mr-1" />
                        <span>{property.totalArea} sq.ft</span>
                    </div>
                    <div>
                        <span>{property.furnishing || 'Unfurnished'}</span>
                    </div>
                </div>

                {/* AI Score */}
                {scoreInfo && (
                    <div className={`${scoreInfo.bg} ${scoreInfo.color} px-3 py-2 rounded-lg text-center font-semibold text-sm`}>
                        AI Score: {property.aiPriceScore}/100 - {scoreInfo.label}
                    </div>
                )}

                {/* View Details Button */}
                <button className="mt-4 w-full btn-primary text-sm">
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default PropertyCard;
