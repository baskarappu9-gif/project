import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin, FiMaximize2, FiActivity } from 'react-icons/fi';
import { formatIndianCurrency } from '../../utils/helpers';
import { motion } from 'framer-motion';

const PropertyCard = ({ property, onSave, isSaved = false }) => {
    // Generate a mock score if API hasn't returned one (for dev/demo)
    const aiScore = property.aiPriceScore || Math.floor(Math.random() * (95 - 70) + 70);

    // Determine color based on score (Traffic Light System)
    const getScoreColor = (score) => {
        if (score >= 85) return 'bg-emerald-500 text-white'; // Great Deal
        if (score >= 70) return 'bg-yellow-500 text-white';  // Fair Price
        return 'bg-red-500 text-white';                      // Overpriced
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={property.images?.[0] || `https://source.unsplash.com/random/800x600/?house,modern`}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* AI Badge overlay */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 ${getScoreColor(aiScore)}`}>
                    <FiActivity /> AI Score: {aiScore}/100
                </div>

                <button
                    onClick={(e) => { e.preventDefault(); onSave(property._id); }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-red-500 transition-colors shadow-sm"
                >
                    <FiHeart className={isSaved ? "fill-red-500 text-red-500" : ""} />
                </button>

                {/* Price Tag overlay */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-lg">
                    {formatIndianCurrency(property.price)}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-display font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors">
                            {property.bhkType} {property.propertyType}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                            <FiMapPin className="mr-1" />
                            {property.area}, {property.city}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 my-4 py-3 border-t border-b border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium uppercase">Area</span>
                        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            <FiMaximize2 className="text-primary-500" /> {property.totalArea} sqft
                        </span>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium uppercase">Furnishing</span>
                        <span className="text-sm font-semibold text-slate-700 capitalize">
                            {property.furnishing}
                        </span>
                    </div>
                </div>

                <Link
                    to={`/property/${property._id}`}
                    className="block w-full text-center py-2.5 rounded-xl border-2 border-primary-50 text-primary-600 font-bold hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all"
                >
                    View Analysis
                </Link>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
