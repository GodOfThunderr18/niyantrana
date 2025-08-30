from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

# Import your prediction function from predict.py
from src.predict import predict_risk

# Initialize the Flask application
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def handle_prediction():
    """
    This function handles the prediction requests from the Express.js backend.
    """
    # 1. Get the JSON data from the request
    json_data = request.get_json()

    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        # 2. Convert the JSON data into the pandas DataFrames that our function expects
        # The watch data should be a list of 14 daily records
        watch_data_list = json_data.get('watch_data')
        # The user data is a single record, so we put it in a list
        user_data_dict = json_data.get('user_data')
        
        if not watch_data_list or not user_data_dict:
            return jsonify({"error": "Missing 'watch_data' or 'user_data' in JSON payload"}), 400

        time_series_df = pd.DataFrame(watch_data_list)
        tabular_df = pd.DataFrame([user_data_dict])

        # 3. Call our prediction function
        prediction_result = predict_risk(time_series_df, tabular_df)

        # 4. Return the prediction as a JSON response
        return jsonify(prediction_result)

    except (ValueError, TypeError, KeyError) as e:
        # Handle potential errors in data format or prediction
        return jsonify({"error": f"An error occurred: {str(e)}"}), 400
    except Exception as e:
        # Handle unexpected server errors
        return jsonify({"error": f"An unexpected server error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    # Run the Flask app
    # The host='0.0.0.0' makes it accessible from your Express.js app
    app.run(host='0.0.0.0', port=5000, debug=True)