/**
 * Application Constants
 * Contains all static data for India real estate platform
 */

// India States and Cities
export const INDIA_LOCATIONS = {
    Maharashtra: {
        cities: {
            Mumbai: ['Bandra', 'Andheri', 'Borivali', 'Thane', 'Navi Mumbai', 'Powai', 'Goregaon', 'Malad'],
            Pune: ['Koregaon Park', 'Hinjewadi', 'Wakad', 'Baner', 'Kothrud', 'Viman Nagar', 'Hadapsar'],
            Nagpur: ['Dharampeth', 'Sadar', 'Sitabuldi', 'Civil Lines'],
            Nashik: ['College Road', 'Govind Nagar', 'Pathardi Phata'],
        }
    },
    Karnataka: {
        cities: {
            Bangalore: ['Koramangala', 'Whitefield', 'Indiranagar', 'HSR Layout', 'Marathahalli', 'Electronic City', 'JP Nagar', 'Jayanagar'],
            Mysore: ['Jayalakshmipuram', 'Gokulam', 'Vijayanagar'],
            Mangalore: ['Kadri', 'Balmatta', 'Kankanady'],
        }
    },
    'Tamil Nadu': {
        cities: {
            Chennai: ['Anna Nagar', 'T Nagar', 'Velachery', 'Tambaram', 'Adyar', 'Nungambakkam', 'Chrompet'],
            Coimbatore: ['RS Puram', 'Gandhipuram', 'Saibaba Colony'],
            Madurai: ['Anna Nagar', 'KK Nagar', 'Vilangudi'],
        }
    },
    Delhi: {
        cities: {
            'New Delhi': ['Connaught Place', 'Karol Bagh', 'Saket', 'Dwarka', 'Rohini', 'Janakpuri', 'Pitampura'],
            'South Delhi': ['Greater Kailash', 'Defence Colony', 'Hauz Khas'],
            'North Delhi': ['Model Town', 'Civil Lines'],
        }
    },
    Gujarat: {
        cities: {
            Ahmedabad: ['Satellite', 'Vastrapur', 'Bodakdev', 'Maninagar', 'Paldi'],
            Surat: ['Adajan', 'Vesu', 'Pal'],
            Vadodara: ['Alkapuri', 'Akota', 'Manjalpur'],
        }
    },
    'Uttar Pradesh': {
        cities: {
            Noida: ['Sector 62', 'Sector 137', 'Greater Noida', 'Sector 18'],
            Ghaziabad: ['Vaishali', 'Indirapuram', 'Raj Nagar'],
            Lucknow: ['Gomti Nagar', 'Hazratganj', 'Aliganj'],
        }
    },
    'West Bengal': {
        cities: {
            Kolkata: ['Salt Lake', 'New Town', 'Alipore', 'Park Street', 'Ballygunge'],
            Howrah: ['Shibpur', 'Santragachi'],
        }
    },
    Telangana: {
        cities: {
            Hyderabad: ['Gachibowli', 'Madhapur', 'Banjara Hills', 'Jubilee Hills', 'HITEC City', 'Kukatpally'],
            Secunderabad: ['Trimulgherry', 'Alwal'],
        }
    },
    Rajasthan: {
        cities: {
            Jaipur: ['Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'C-Scheme'],
            Udaipur: ['Fateh Sagar', 'Hiran Magri'],
        }
    },
    Kerala: {
        cities: {
            Kochi: ['Kakkanad', 'Edappally', 'Marine Drive', 'Fort Kochi'],
            Thiruvananthapuram: ['Kowdiar', 'Pattom', 'Thampanoor'],
        }
    }
};

// Get all states
export const STATES = Object.keys(INDIA_LOCATIONS);

// Get cities by state
export const getCitiesByState = (state) => {
    if (!state || !INDIA_LOCATIONS[state]) return [];
    return Object.keys(INDIA_LOCATIONS[state].cities);
};

// Get areas by city and state
export const getAreasByCity = (state, city) => {
    if (!state || !city || !INDIA_LOCATIONS[state] || !INDIA_LOCATIONS[state].cities[city]) return [];
    return INDIA_LOCATIONS[state].cities[city];
};

// Property Types
export const PROPERTY_TYPES = {
    HOUSE: [
        { value: 'apartment', label: 'Apartment', description: 'Flat in multi-story building' },
        { value: 'independent-house', label: 'Independent House / Villa', description: 'Standalone house' },
        { value: 'gated-villa', label: 'Gated Community Villa', description: 'Villa in secured complex' },
        { value: 'builder-floor', label: 'Builder Floor', description: 'Floor of independent building' },
        { value: 'penthouse', label: 'Penthouse', description: 'Top floor luxury apartment' },
        { value: 'studio', label: 'Studio Apartment', description: 'Single room living space' },
    ],
    LAND: [
        { value: 'residential-plot', label: 'Residential Plot', description: 'For house construction' },
        { value: 'commercial-plot', label: 'Commercial Plot', description: 'For business/office' },
        { value: 'agricultural-land', label: 'Agricultural Land', description: 'Farming purpose' },
        { value: 'industrial-land', label: 'Industrial Land', description: 'Factory/warehouse' },
        { value: 'mixed-use', label: 'Mixed Use Land', description: 'Residential + Commercial' },
    ]
};

// BHK Types
export const BHK_TYPES = [
    { value: '1RK', label: '1 RK', description: '1 Room + Kitchen' },
    { value: '1BHK', label: '1 BHK', description: '1 Bedroom + Hall + Kitchen' },
    { value: '2BHK', label: '2 BHK', description: '2 Bedrooms + Hall + Kitchen' },
    { value: '3BHK', label: '3 BHK', description: '3 Bedrooms + Hall + Kitchen' },
    { value: '4BHK', label: '4 BHK', description: '4 Bedrooms + Hall + Kitchen' },
    { value: '4+BHK', label: '4+ BHK', description: 'More than 4 bedrooms' },
];

// Property Age
export const PROPERTY_AGE = [
    { value: '0-1', label: 'New Construction (0-1 year)' },
    { value: '1-5', label: 'Less than 5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10-15', label: '10-15 years' },
    { value: '15-20', label: '15-20 years' },
    { value: '20+', label: '20+ years old' },
];

// Furnishing Types
export const FURNISHING_TYPES = [
    {
        value: 'fully-furnished',
        label: 'Fully Furnished',
        includes: ['Beds & Wardrobes', 'Sofa & Dining Table', 'AC & Geyser', 'Kitchen Appliances', 'TV & Fridge', 'Washing Machine']
    },
    {
        value: 'semi-furnished',
        label: 'Semi Furnished',
        includes: ['Light Fixtures', 'Fans', 'Wardrobes', 'Kitchen Cabinets']
    },
    {
        value: 'unfurnished',
        label: 'Unfurnished',
        includes: ['Only basic fittings']
    },
];

// Amenities
export const AMENITIES = {
    basic: [
        { id: 'lift', label: 'Lift / Elevator', icon: '🛗' },
        { id: 'power-backup', label: 'Power Backup', icon: '⚡' },
        { id: 'security', label: 'Security / Gated Society', icon: '🔒' },
        { id: 'water-supply', label: 'Water Supply (24/7)', icon: '💧' },
        { id: 'parking', label: 'Parking', icon: '🅿️' },
    ],
    premium: [
        { id: 'gym', label: 'Gym / Fitness Center', icon: '💪' },
        { id: 'swimming-pool', label: 'Swimming Pool', icon: '🏊' },
        { id: 'club-house', label: 'Club House', icon: '🏛️' },
        { id: 'play-area', label: 'Children Play Area', icon: '🎮' },
        { id: 'garden', label: 'Garden / Park', icon: '🌳' },
    ],
    modern: [
        { id: 'intercom', label: 'Intercom Facility', icon: '📞' },
        { id: 'piped-gas', label: 'Piped Gas Connection', icon: '🔥' },
        { id: 'sewage-treatment', label: 'Sewage Treatment Plant', icon: '♻️' },
        { id: 'rainwater-harvesting', label: 'Rainwater Harvesting', icon: '🌧️' },
        { id: 'waste-management', label: 'Waste Management', icon: '🗑️' },
    ]
};

// Property Status
export const PROPERTY_STATUS = [
    { value: 'ready-to-move', label: 'Ready to Move' },
    { value: 'under-construction', label: 'Under Construction' },
];

// Price Ranges (in INR)
export const PRICE_RANGES = {
    min: 1000000,      // 10 Lakhs
    max: 100000000,    // 10 Crores
    step: 100000,      // 1 Lakh
};

// Convert currency
export const formatCurrency = (amount) => {
    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
};

// Area Units
export const AREA_UNITS = [
    { value: 'sqft', label: 'Sq.ft', conversion: 1 },
    { value: 'sqm', label: 'Sq. Meters', conversion: 10.764 },
    { value: 'acres', label: 'Acres', conversion: 0.000022957 },
    { value: 'sqyard', label: 'Sq. Yards', conversion: 0.111111 },
];

// Parking Options
export const PARKING_OPTIONS = {
    twoWheeler: [0, 1, 2, 3],
    fourWheeler: [0, 1, 2, 3],
};

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        SIGNUP: '/api/auth/signup',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        VERIFY_EMAIL: '/api/auth/verify-email',
        FORGOT_PASSWORD: '/api/auth/forgot-password',
        RESET_PASSWORD: '/api/auth/reset-password',
    },
    PROPERTIES: {
        GET_ALL: '/api/properties',
        GET_BY_ID: '/api/properties/:id',
        CREATE: '/api/properties',
        UPDATE: '/api/properties/:id',
        DELETE: '/api/properties/:id',
        SEARCH: '/api/properties/search',
        SAVE: '/api/properties/:id/save',
        UNSAVE: '/api/properties/:id/unsave',
        CONTACT: '/api/properties/:id/contact',
    },
    ML: {
        PREDICT_PRICE: '/api/ml/predict-price',
        MARKET_TRENDS: '/api/ml/market-trends',
        AREA_INSIGHTS: '/api/ml/area-insights',
    },
    USER: {
        PROFILE: '/api/user/profile',
        UPDATE_PROFILE: '/api/user/profile',
        SAVED_PROPERTIES: '/api/user/saved-properties',
        VIEW_HISTORY: '/api/user/view-history',
        CONTACT_HISTORY: '/api/user/contact-history',
        SEARCH_HISTORY: '/api/user/search-history',
    }
};

// Validation Rules
export const VALIDATION_RULES = {
    name: {
        required: 'Name is required',
        minLength: { value: 3, message: 'Name must be at least 3 characters' },
        maxLength: { value: 50, message: 'Name must be less than 50 characters' },
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
    mobile: {
        required: 'Mobile number is required',
        pattern: {
            value: /^[6-9]\d{9}$/,
            message: 'Invalid mobile number (10 digits, starting with 6-9)',
        },
    },
    password: {
        required: 'Password is required',
        minLength: { value: 8, message: 'Password must be at least 8 characters' },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: 'Password must contain uppercase, lowercase, and number',
        },
    },
    pincode: {
        required: 'Pincode is required',
        pattern: {
            value: /^[1-9][0-9]{5}$/,
            message: 'Invalid pincode (6 digits)',
        },
    },
};

// AI Score Interpretation
export const AI_SCORE_INTERPRETATION = (score) => {
    if (score >= 85) return { label: 'GREAT DEAL', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { label: 'FAIR PRICE', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 50) return { label: 'ABOVE MARKET', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'OVERPRICED', color: 'text-red-600', bg: 'bg-red-100' };
};

// Toast Configuration
export const TOAST_CONFIG = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export default {
    INDIA_LOCATIONS,
    STATES,
    PROPERTY_TYPES,
    BHK_TYPES,
    PROPERTY_AGE,
    FURNISHING_TYPES,
    AMENITIES,
    PROPERTY_STATUS,
    PRICE_RANGES,
    AREA_UNITS,
    PARKING_OPTIONS,
    API_ENDPOINTS,
    VALIDATION_RULES,
    AI_SCORE_INTERPRETATION,
    TOAST_CONFIG,
    formatCurrency,
    getCitiesByState,
    getAreasByCity,
};
