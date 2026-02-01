# 📚 PriceWatch API Documentation

Complete API reference for PriceWatch Real Estate Platform

---

## Base URLs

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5001`
- **ML Service**: `http://localhost:5000`

---

## Authentication

All protected endpoints require JWT authentication token in the header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. User Registration

**POST** `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "SecurePass123"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65abc123def456...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Error Responses:**
- `400` - Email or mobile already registered
- `500` - Server error

---

### 2. User Login

**POST** `/api/auth/login`

Login with email/mobile and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65abc123def456...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `500` - Server error

---

### 3. Get Current User

**GET** `/api/auth/me`

Get current authenticated user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "user": {
    "_id": "65abc123def456...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "isEmailVerified": false,
    "isMobileVerified": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Logout

**POST** `/api/auth/logout`

Logout current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🏠 Property Endpoints

### 1. Get All Properties

**GET** `/api/properties`

Get list of properties with optional filters.

**Query Parameters:**
- `type` - Property type (buy-house, sell-house, buy-plot, sell-land)
- `state` - State name
- `city` - City name
- `area` - Area/locality Name
- `minPrice` - Minimum price (number)
- `maxPrice` - Maximum price (number)
- `bhkType` - BHK type (1BHK, 2BHK, 3BHK, etc.)
- `propertyType` - Type (apartment, villa, etc.)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

**Example Request:**
```
GET /api/properties?city=Mumbai&bhkType=3BHK&minPrice=5000000&maxPrice=15000000&page=1&limit=10
```

**Response:** (200 OK)
```json
{
  "success": true,
  "properties": [
    {
      "_id": "65abc123...",
      "type": "sell-house",
      "state": "Maharashtra",
      "city": "Mumbai",
      "area": "Bandra",
      "propertyType": "apartment",
      "bhkType": "3BHK",
      "totalArea": 1450,
      "price": 12000000,
      "pricePerSqft": 8275,
      "aiPriceScore": 87,
      "predictedPrice": 11500000,
      "images": ["url1", "url2"],
      "amenities": ["gym", "pool", "parking"],
      "isVerified": true,
      "views": 125,
      "saves": 15,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### 2. Get Single Property

**GET** `/api/properties/:id`

Get detailed information about a specific property.

**Response:** (200 OK)
```json
{
  "success": true,
  "property": {
    "_id": "65abc123...",
    "userId": {
      "_id": "user123...",
      "fullName": "Property Owner",
      "email": "owner@example.com",
      "mobile": "9876543210"
    },
    "type": "sell-house",
    "state": "Maharashtra",
    "city": "Mumbai",
    "area": "Bandra",
    "landmark": "Near Metro Station",
    "pincode": "400050",
    "propertyType": "apartment",
    "bhkType": "3BHK",
    "totalArea": 1450,
    "price": 12000000,
    "totalFloors": 15,
    "propertyFloor": 7,
    "age": "5-10",
    "furnishing": "semi-furnished",
    "amenities": ["lift", "gym", "pool", "parking", "security"],
    "parking": {
      "twoWheeler": 1,
      "fourWheeler": 1
    },
    "images": ["image1.jpg", "image2.jpg"],
    "aiPriceScore": 87,
    "predictedPrice": 11500000,
    "priceRange": {
      "min": 10580000,
      "max": 12420000
    },
    "isVerified": true,
    "views": 125,
    "saves": 15
  }
}
```

**Error Responses:**
- `404` - Property not found

---

### 3. Create Property

**POST** `/api/properties`

Create new property listing (authentication required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "type": "sell-house",
  "state": "Maharashtra",
  "city": "Mumbai",
  "area": "Bandra",
  "landmark": "Near Metro",
  "pincode": "400050",
  "propertyType": "apartment",
  "bhkType": "3BHK",
  "totalArea": 1450,
  "price": 12000000,
  "totalFloors": 15,
  "propertyFloor": 7,
  "age": "5-10",
  "furnishing": "semi-furnished",
  "amenities": ["lift", "gym", "pool"],
  "parking": {
    "twoWheeler": 1,
    "fourWheeler": 1
  },
  "propertyStatus": "ready-to-move"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Property created successfully",
  "property": { ... }
}
```

---

### 4. Update Property

**PUT** `/api/properties/:id`

Update existing property (owner only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "price": 11500000,
  "furnishing": "fully-furnished"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Property updated successfully",
  "property": { ... }
}
```

**Error Responses:**
- `403` - Not authorized (not owner)
- `404` - Property not found

---

### 5. Delete Property

**DELETE** `/api/properties/:id`

Delete property (owner only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### 6. Save Property

**POST** `/api/properties/:id/save`

Save/bookmark a property.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Property saved successfully"
}
```

---

### 7. Unsave Property

**DELETE** `/api/properties/:id/save`

Remove property from saved list.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Property removed from saved"
}
```

---

## 🤖 ML/AI Endpoints

### 1. Predict Property Price

**POST** `/api/ml/predict-price`

Get AI-powered price prediction for a property.

**Request Body:**
```json
{
  "state": "Maharashtra",
  "city": "Mumbai",
  "area": "Bandra",
  "propertyType": "apartment",
  "bhkType": "3BHK",
  "totalArea": 1450,
  "propertyFloor": 7,
  "totalFloors": 15,
  "age": "5-10",
  "furnishing": "semi-furnished",
  "amenitiesCount": 8,
  "parking": 1,
  "price": 12000000
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "prediction": {
    "predictedPrice": 11500000,
    "confidence": 0.94,
    "aiScore": 87,
    "priceRange": {
      "min": 10580000,
      "max": 12420000
    },
    "marketPosition": "FAIR PRICE",
    "pricePerSqft": 7931,
    "futureGrowth": {
      "oneYear": 12488000,
      "threeYear": 14210000,
      "fiveYear": 16350000
    },
    "insights": {
      "cityMultiplier": 1.8,
      "bhkMultiplier": 1.3,
      "furnishingMultiplier": 1.05,
      "amenitiesBonus": "+16%",
      "parkingBonus": "+3%"
    }
  }
}
```

---

### 2. Market Trends

**GET** `/api/ml/market-trends`

Get market trends for specific location.

**Query Parameters:**
- `state` - State name
- `city` - City name

**Example:**
```
GET /api/ml/market-trends?state=Maharashtra&city=Mumbai
```

**Response:** (200 OK)
```json
{
  "success": true,
  "trends": {
    "averagePrice": 8500000,
    "medianPrice": 7500000,
    "priceChange": {
      "monthly": 2.5,
      "yearly": 12.3
    },
    "hotAreas": ["Bandra", "Andheri", "Powai"],
    "inventory": 1250
  }
}
```

---

## Error Responses

All endpoints may return these common errors:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized. Please login."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## Rate Limiting

- **Anonymous**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes

---

## Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  mobile: String (unique),
  password: String (hashed),
  profilePhoto: String,
  city: String,
  isEmailVerified: Boolean,
  isMobileVerified: Boolean,
  role: String ('user' | 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Property Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: String,
  state: String,
  city: String,
  area: String,
  propertyType: String,
  bhkType: String,
  totalArea: Number,
  price: Number,
  pricePerSqft: Number,
  amenities: [String],
  parking: {
    twoWheeler: Number,
    fourWheeler: Number
  },
  aiPriceScore: Number,
  predictedPrice: Number,
  priceRange: {
    min: Number,
    max: Number
  },
  isVerified: Boolean,
  isActive: Boolean,
  views: Number,
  saves: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing

### Postman Collection

Import this collection to test all endpoints:

1. Set base URL variable: `{{baseUrl}}` = `http://localhost:5001`
2. After login, set token variable: `{{token}}` = `<your_jwt_token>`

### Example cURL Commands

**Signup:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "mobile": "9876543210",
    "password": "Test@1234"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

**Get Properties:**
```bash
curl -X GET "http://localhost:5001/api/properties?city=Mumbai&bhkType=3BHK"
```

**Create Property:**
```bash
curl -X POST http://localhost:5001/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "type": "sell-house",
    "state": "Maharashtra",
    "city": "Mumbai",
    "area": "Bandra",
    "propertyType": "apartment",
    "bhkType": "3BHK",
    "totalArea": 1450,
    "price": 12000000
  }'
```

---

## Support

For API support, contact:
- Email: support@pricewatch.com
- Documentation: http://localhost:5001/api-docs

---

**Last Updated**: January 2024  
**Version**: 1.0.0
