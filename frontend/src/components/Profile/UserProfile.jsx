/**
 * User Profile Component
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">My Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="font-semibold text-gray-700">Full Name</label>
                        <p className="text-lg">{user?.fullName}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Email</label>
                        <p className="text-lg">{user?.email}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Mobile</label>
                        <p className="text-lg">+91 {user?.mobile}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
