/**
 * Main App Component
 * Handles routing and global providers
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

// Components
import Header from './components/Common/Header';
import Loader from './components/Common/Loader';

// Pages
import LandingPage from './pages/LandingPage';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDetail from './components/Property/PropertyDetail';
import UserProfile from './components/Profile/UserProfile';
import SavedProperties from './components/Profile/SavedProperties';
import ActivityHistory from './components/Profile/ActivityHistory';
import NotFound from './pages/NotFound';

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * Public Route Component
 * Redirects to dashboard if already authenticated
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

/**
 * Main App Component
 */
function App() {
    return (
        <Router>
            <AuthProvider>
                <PropertyProvider>
                    <div className="App min-h-screen bg-gray-50">
                        {/* Toast Notifications */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                        {/* Routes */}
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route
                                path="/signup"
                                element={
                                    <PublicRoute>
                                        <Signup />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                }
                            />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Header />
                                            <Dashboard />
                                        </>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/property/:id"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Header />
                                            <PropertyDetail />
                                        </>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Header />
                                            <UserProfile />
                                        </>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/saved-properties"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Header />
                                            <SavedProperties />
                                        </>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/activity"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Header />
                                            <ActivityHistory />
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 Not Found */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </PropertyProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
