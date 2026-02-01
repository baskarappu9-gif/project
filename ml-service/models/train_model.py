"""
ML Model Training Script
Train Random Forest and XGBoost models for price prediction
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score
import xgboost as xgb
import joblib
import os

def generate_training_data(n_samples=5000):
    """
    Generate synthetic training data for demonstration
    In production, use real historical data
    """
    
    np.random.seed(42)
    
    cities = ['Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad', 'Chennai']
    bhk_types = ['1BHK', '2BHK', '3BHK', '4BHK']
    furnishing = ['unfurnished', 'semi-furnished', 'fully-furnished']
    
    data = []
    
    for _ in range(n_samples):
        city = np.random.choice(cities)
        bhk = np.random.choice(bhk_types)
        furn = np.random.choice(furnishing)
        
        # Generate features
        area = np.random.randint(500, 3000)
        floor = np.random.randint(0, 20)
        amenities = np.random.randint(0, 15)
        parking = np.random.randint(0, 3)
        age = np.random.randint(0, 30)
        
        # Calculate price with some logic
        base_price_per_sqft = {
            'Mumbai': 12000,
            'Bangalore': 8000,
            'Delhi': 10000,
            'Pune': 6000,
            'Hyderabad': 5500,
            'Chennai': 6000,
        }[city]
        
        bhk_mult = {
            '1BHK': 0.85,
            '2BHK': 1.0,
            '3BHK': 1.3,
            '4BHK': 1.6,
        }[bhk]
        
        furn_mult = {
            'unfurnished': 1.0,
            'semi-furnished': 1.05,
            'fully-furnished': 1.15,
        }[furn]
        
        price = (
            base_price_per_sqft * area * bhk_mult * furn_mult *
            (1 + amenities * 0.01) *
            (1 - age * 0.01) *
            np.random.uniform(0.9, 1.1)  # Add some randomness
        )
        
        data.append({
            'city': city,
            'bhk_type': bhk,
            'furnishing': furn,
            'area': area,
            'floor': floor,
            'amenities': amenities,
            'parking': parking,
            'age': age,
            'price': int(price)
        })
    
    return pd.DataFrame(data)

def train_models():
    """
    Train ML models using generated data
    """
    
    print("🔄 Generating training data...")
    df = generate_training_data(5000)
    
    # Encode categorical features
    print("🔄 Encoding features...")
    city_encoding = {city: i for i, city in enumerate(df['city'].unique())}
    bhk_encoding = {'1BHK': 1, '2BHK': 2, '3BHK': 3, '4BHK': 4}
    furn_encoding = {'unfurnished': 0, 'semi-furnished': 1, 'fully-furnished': 2}
    
    df['city_encoded'] = df['city'].map(city_encoding)
    df['bhk_encoded'] = df['bhk_type'].map(bhk_encoding)
    df['furn_encoded'] = df['furnishing'].map(furn_encoding)
    
    # Prepare features and target
    feature_cols = ['city_encoded', 'bhk_encoded', 'furn_encoded', 'area', 
                    'floor', 'amenities', 'parking', 'age']
    X = df[feature_cols]
    y = df['price']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    print("🔄 Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest
    print("🔄 Training Random Forest...")
    rf_model = RandomForestRegressor(
        n_estimators=100,
        max_depth=20,
        random_state=42,
        n_jobs=-1
    )
    rf_model.fit(X_train_scaled, y_train)
    
    # Evaluate Random Forest
    rf_pred = rf_model.predict(X_test_scaled)
    rf_mae = mean_absolute_error(y_test, rf_pred)
    rf_r2 = r2_score(y_test, rf_pred)
    
    print(f"✅ Random Forest - MAE: ₹{rf_mae:,.0f}, R²: {rf_r2:.3f}")
    
    # Train XGBoost
    print("🔄 Training XGBoost...")
    xgb_model = xgb.XGBRegressor(
        n_estimators=100,
        max_depth=10,
        learning_rate=0.1,
        random_state=42,
        n_jobs=-1
    )
    xgb_model.fit(X_train_scaled, y_train)
    
    # Evaluate XGBoost
    xgb_pred = xgb_model.predict(X_test_scaled)
    xgb_mae = mean_absolute_error(y_test, xgb_pred)
    xgb_r2 = r2_score(y_test, xgb_pred)
    
    print(f"✅ XGBoost - MAE: ₹{xgb_mae:,.0f}, R²: {xgb_r2:.3f}")
    
    # Save models
    print("🔄 Saving models...")
    os.makedirs('models/saved_models', exist_ok=True)
    
    joblib.dump(rf_model, 'models/saved_models/random_forest.pkl')
    joblib.dump(xgb_model, 'models/saved_models/xgboost.pkl')
    joblib.dump(scaler, 'models/saved_models/scaler.pkl')
    joblib.dump({
        'city': city_encoding,
        'bhk': bhk_encoding,
        'furnishing': furn_encoding
    }, 'models/saved_models/encoders.pkl')
    
    print("✅ Models saved successfully!")
    print(f"\n📊 Model Performance:")
    print(f"   Random Forest: R² = {rf_r2:.3f}")
    print(f"   XGBoost: R² = {xgb_r2:.3f}")

if __name__ == '__main__':
    print("\n🤖 Starting ML Model Training...\n")
    train_models()
    print("\n✅ Training completed!\n")
