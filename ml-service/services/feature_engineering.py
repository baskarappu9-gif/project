"""
Feature Engineering Service
Prepare features for ML models
"""

import pandas as pd
import numpy as np

def prepare_features(property_data):
    """
    Prepare and encode features for ML model
    
    Args:
        property_data (dict): Raw property data
    
    Returns:
        numpy.array: Encoded feature vector
    """
    
    # Extract features
    features = {}
    
    # Location encoding (simplified)
    city_encoding = {
        'Mumbai': 10,
        'Bangalore': 9,
        'Delhi': 9,
        'Pune': 7,
        'Hyderabad': 7,
        'Chennai': 7,
        'Kolkata': 6,
        'Ahmedabad': 6,
    }
    features['city_encoded'] = city_encoding.get(property_data.get('city'), 5)
    
    # BHK encoding
    bhk_encoding = {
        '1RK': 1,
        '1BHK': 2,
        '2BHK': 3,
        '3BHK': 4,
        '4BHK': 5,
        '4+BHK': 6,
    }
    features['bhk_encoded'] = bhk_encoding.get(property_data.get('bhkType'), 3)
    
    # Property type encoding
    property_type_encoding = {
        'apartment': 1,
        'independent-house': 2,
        'gated-villa': 3,
        'builder-floor': 4,
        'penthouse': 5,
        'studio': 6,
    }
    features['property_type_encoded'] = property_type_encoding.get(
        property_data.get('propertyType'), 1
    )
    
    # Furnishing encoding
    furnishing_encoding = {
        'unfurnished': 0,
        'semi-furnished': 1,
        'fully-furnished': 2,
    }
    features['furnishing_encoded'] = furnishing_encoding.get(
        property_data.get('furnishing'), 0
    )
    
    # Numerical features
    features['total_area'] = property_data.get('totalArea', 1000)
    features['property_floor'] = property_data.get('propertyFloor', 0)
    features['total_floors'] = property_data.get('totalFloors', 1)
    features['amenities_count'] = property_data.get('amenitiesCount', 0)
    features['parking'] = property_data.get('parking', 0)
    
    # Age encoding
    age_encoding = {
        '0-1': 0,
        '1-5': 2,
        '5-10': 7,
        '10-15': 12,
        '15-20': 17,
        '20+': 25,
    }
    features['age_years'] = age_encoding.get(property_data.get('age'), 5)
    
    # Convert to numpy array
    feature_vector = np.array([
        features['city_encoded'],
        features['bhk_encoded'],
        features['property_type_encoded'],
        features['furnishing_encoded'],
        features['total_area'],
        features['property_floor'],
        features['total_floors'],
        features['amenities_count'],
        features['parking'],
        features['age_years'],
    ])
    
    return feature_vector

def decode_prediction(prediction, property_data):
    """
    Decode ML model prediction into human-readable format
    
    Args:
        prediction (float): Raw prediction from model
        property_data (dict): Original property data
    
    Returns:
        dict: Formatted prediction results
    """
    
    return {
        'predictedPrice': int(prediction),
        'confidence': 0.92,
        'pricePerSqft': int(prediction / property_data.get('totalArea', 1000)),
    }
