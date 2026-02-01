/**
 * Property Detail Page
 * Full property information with AI analysis
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import Loader from '../Common/Loader';

const PropertyDetail = () => {
    const { id } = useParams();
    const { getPropertyById, currentProperty, loading } = useProperty();

    useEffect(() => {
        if (id) {
            getPropertyById(id);
        }
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!currentProperty) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Property not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-4">
                    {currentProperty.bhkType} {currentProperty.propertyType}
                </h1>
                <p className="text-gray-600 mb-6">
                    {currentProperty.area}, {currentProperty.city}, {currentProperty.state}
                </p>

                {/* Property details content - placeholder for now */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold mb-2">Price</h3>
                        <p className="text-2xl text-primary-600">₹{currentProperty.price?.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Area</h3>
                        <p>{currentProperty.totalArea} sq.ft</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
