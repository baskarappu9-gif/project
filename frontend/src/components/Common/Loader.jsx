/**
 * Loader Component
 * Loading spinner and skeleton loaders
 */

import React from 'react';

/**
 * Full Page Loader
 */
export const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

/**
 * Inline Spinner
 */
export const Spinner = ({ size = 'md', color = 'primary' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const colorClasses = {
        primary: 'border-primary-200 border-t-primary-600',
        white: 'border-white border-opacity-30 border-t-white',
    };

    return (
        <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
        ></div>
    );
};

/**
 * Property Card Skeleton
 */
export const PropertyCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-card p-4 animate-pulse">
            {/* Image Skeleton */}
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>

            {/* Title Skeleton */}
            <div className="bg-gray-200 h-6 rounded w-3/4 mb-2"></div>

            {/* Location Skeleton */}
            <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>

            {/* Details Skeleton */}
            <div className="flex justify-between mb-4">
                <div className="bg-gray-200 h-4 rounded w-1/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/4"></div>
            </div>

            {/* Button Skeleton */}
            <div className="bg-gray-200 h-10 rounded"></div>
        </div>
    );
};

/**
 * Property List Skeleton
 */
export const PropertyListSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
            ))}
        </div>
    );
};

/**
 * Default Loader Export
 */
const Loader = ({ fullPage = true }) => {
    if (fullPage) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
        </div>
    );
};

export default Loader;
