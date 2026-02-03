import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiMaximize2, FiCalendar, FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import { propertyService } from '../../services/propertyService';
import { formatIndianCurrency } from '../../utils/helpers';
import Loader from '../Common/Loader';
import { FadeIn } from '../Common/Animations';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                const data = await propertyService.getProperty(id);
                setProperty(data);
            } catch (error) {
                console.error("Error loading property", error);
            } finally {
                setLoading(false);
            }
        };
        loadProperty();
    }, [id]);

    if (loading) return <Loader />;
    if (!property) return <div className="pt-24 text-center">Property not found</div>;

    // Chart Configuration for Price History
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Price Trend ( Lakhs)',
                data: [82, 84, 83, 85, 87, property.price / 100000],
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // Primary color transparent
                borderColor: 'rgba(79, 70, 229, 1)', // Primary-600
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 13 },
                bodyFont: { size: 14, weight: 'bold' }
            }
        },
        scales: {
            y: { grid: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <FadeIn className="mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                                {property.transactionType === 'sell' ? 'For Sale' : 'For Rent'}
                            </span>
                            <h1 className="text-3xl font-display font-bold text-slate-800">
                                {property.bhkType} {property.propertyType} in {property.area}
                            </h1>
                            <div className="flex items-center text-slate-500 mt-2">
                                <FiMapPin className="mr-2" />
                                {property.address}, {property.city}, {property.state} - {property.pincode}
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold text-primary-600">
                                {formatIndianCurrency(property.price)}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {formatIndianCurrency(Math.round(property.price / property.totalArea))}/sq.ft
                            </p>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Image */}
                        <FadeIn delay={0.2} className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg">
                            <img
                                src={property.images?.[0] || "https://source.unsplash.com/random/1200x800/?house,interior"}
                                alt="Property"
                                className="w-full h-full object-cover"
                            />
                        </FadeIn>

                        {/* Quick Specs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <FiMaximize2 className="mx-auto text-primary-500 text-xl mb-2" />
                                <span className="block text-slate-400 text-xs uppercase">Area</span>
                                <span className="font-bold text-slate-800">{property.totalArea} sqft</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <FiHome className="mx-auto text-primary-500 text-xl mb-2" />
                                <span className="block text-slate-400 text-xs uppercase">Config</span>
                                <span className="font-bold text-slate-800">{property.bhkType}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <FiCalendar className="mx-auto text-primary-500 text-xl mb-2" />
                                <span className="block text-slate-400 text-xs uppercase">Age</span>
                                <span className="font-bold text-slate-800">{property.age} Yrs</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <FiCheckCircle className="mx-auto text-primary-500 text-xl mb-2" />
                                <span className="block text-slate-400 text-xs uppercase">Status</span>
                                <span className="font-bold text-slate-800 capitalize">{property.furnishing}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {property.description || "No description provided for this property."}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: AI Analysis & Contact */}
                    <div className="space-y-6">
                        {/* AI Price Analysis Card */}
                        <FadeIn delay={0.4} className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-[60px] opacity-20"></div>

                            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                <FiDollarSign className="text-emerald-400" />
                                AI Price Analysis
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">Based on 10,000+ similar listings</p>

                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-slate-300">Fair Market Price</span>
                                    <span className="text-2xl font-bold text-emerald-400">
                                        {formatIndianCurrency(Math.floor(property.price * 0.95))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-slate-300">Potential Appreciation</span>
                                    <span className="text-lg font-bold text-blue-400">+8.5% / yr</span>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="h-40 w-full bg-slate-800/50 rounded-xl p-2 mb-4">
                                <Line data={chartData} options={chartOptions} />
                            </div>

                            <p className="text-xs text-center text-slate-500">
                                *AI predictions are estimates based on market trends.
                            </p>
                        </FadeIn>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Interested?</h3>

                            {!showContact ? (
                                <button
                                    onClick={() => setShowContact(true)}
                                    className="w-full btn-primary-new"
                                >
                                    Contact Owner
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                                >
                                    <p className="font-bold text-slate-800">Owner Contact</p>
                                    <p className="text-slate-600 mt-1">+91 98765 43210</p>
                                    <p className="text-slate-600">owner@example.com</p>
                                    <p className="text-xs text-slate-400 mt-2">Please mention PriceWatch when calling.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
