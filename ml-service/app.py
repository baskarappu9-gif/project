"""
Flask ML Service
AI-powered price prediction for real estate
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from services.prediction_service import predict_property_price

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['MODEL_PATH'] = os.getenv('MODEL_PATH', './models/saved_models')

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'PriceWatch ML Service is running',
        'version': '1.0.0'
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({
        'success': True,
        'status': 'healthy'
    })

@app.route('/predict-price', methods=['POST'])
def predict_price():
    """
    Predict property price using ML models
    
    Request Body:
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
        "price": 12000000  # Optional - for comparison
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Get prediction
        prediction = predict_property_price(data)
        
        return jsonify({
            'success': True,
            'prediction': prediction
        })
        
    except Exception as e:
        print(f'Prediction error: {str(e)}')
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/market-trends', methods=['GET'])
def market_trends():
    """Get market trends for specific location"""
    try:
        state = request.args.get('state')
        city = request.args.get('city')
        
        # Mock data for now - can be enhanced with real data
        trends = {
            'success': True,
            'trends': {
                'averagePrice': 8500000,
                'medianPrice': 7500000,
                'priceChange': {
                    'monthly': 2.5,
                    'yearly': 12.3
                },
                'hotAreas': ['Bandra', 'Andheri', 'Powai'],
                'inventory': 1250
            }
        }
        
        return jsonify(trends)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f'\n[ML Service] Starting on port {port}')
    print(f'API URL: http://localhost:{port}')
    print(f'Health Check: http://localhost:{port}/health\n')
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('FLASK_ENV') == 'development'
    )

