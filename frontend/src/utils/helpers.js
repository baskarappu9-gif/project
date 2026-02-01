/**
 * Utility Helper Functions
 */

/**
 * Format currency in Indian format
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted currency string
 */
export const formatIndianCurrency = (amount) => {
    if (!amount) return '₹0';

    if (amount >= 10000000) {
        // Crores
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
        // Lakhs
        return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
        // Thousands
        return `₹${(amount / 1000).toFixed(2)} K`;
    }

    return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format number in full Indian format with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatIndianNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString('en-IN');
};

/**
 * Convert area between units
 * @param {number} value - Area value
 * @param {string} from - Source unit
 * @param {string} to - Target unit
 * @returns {number} Converted value
 */
export const convertArea = (value, from, to) => {
    const conversions = {
        sqft: 1,
        sqm: 10.764,
        acres: 43560,
        sqyard: 9,
    };

    if (!conversions[from] || !conversions[to]) return value;

    // Convert to sqft first, then to target
    const inSqft = value * conversions[from];
    return inSqft / conversions[to];
};

/**
 * Calculate property price per square foot
 * @param {number} price - Total price
 * @param {number} area - Area in sq.ft
 * @returns {number} Price per sq.ft
 */
export const calculatePricePerSqft = (price, area) => {
    if (!price || !area) return 0;
    return Math.round(price / area);
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid
 */
export const isValidEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
};

/**
 * Validate Indian mobile number
 * @param {string} mobile - Mobile number
 * @returns {boolean} Is valid
 */
export const isValidMobile = (mobile) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
};

/**
 * Validate Indian pincode
 * @param {string} pincode - Pincode
 * @returns {boolean} Is valid
 */
export const isValidPincode = (pincode) => {
    const regex = /^[1-9][0-9]{5}$/;
    return regex.test(pincode);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
    if (!date) return '';

    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;

    return formatDate(date);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} Is empty
 */
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

/**
 * Download file from URL
 * @param {string} url - File URL
 * @param {string} filename - Filename
 */
export const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Promise
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Get user's location
 * @returns {Promise} Promise with coordinates
 */
export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => reject(error)
            );
        }
    });
};

export default {
    formatIndianCurrency,
    formatIndianNumber,
    convertArea,
    calculatePricePerSqft,
    isValidEmail,
    isValidMobile,
    isValidPincode,
    truncateText,
    formatDate,
    formatRelativeTime,
    debounce,
    generateId,
    deepClone,
    isEmpty,
    groupBy,
    sortBy,
    calculatePercentage,
    getInitials,
    downloadFile,
    copyToClipboard,
    scrollToTop,
    getUserLocation,
};
