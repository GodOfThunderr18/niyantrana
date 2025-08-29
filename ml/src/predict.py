import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
import os

# --- 1. Define Paths and Load Artifacts ---
# We load the models and scalers once when the script starts to be efficient.
MODEL_PATH = 'models/multimodal_model.h5'
FEATURE_SCALER_PATH = 'models/feature_scaler.pkl'
TARGET_SCALER_PATH = 'models/target_scaler.pkl'

print("Loading model and scalers...")
# Check if files exist before loading
if not all(os.path.exists(p) for p in [MODEL_PATH, FEATURE_SCALER_PATH, TARGET_SCALER_PATH]):
    print("Error: Model or scaler files not found. Please train the model first by running 'src/train.py'.")
    exit()

model = load_model(MODEL_PATH)
feature_scaler = joblib.load(FEATURE_SCALER_PATH)
target_scaler = joblib.load(TARGET_SCALER_PATH)
print("Artifacts loaded successfully.")

# --- 2. Define the Prediction Function ---

def predict_risk(time_series_data, tabular_data):
    """
    Predicts TG and GGT values based on 14 days of time-series data and 1 day of tabular data.

    Args:
        time_series_data (pd.DataFrame): A DataFrame with 14 rows, containing the user's
                                         watch data for the last 14 days.
        tabular_data (pd.DataFrame): A DataFrame with 1 row, containing the user's
                                     static and nutritional data for the current day.

    Returns:
        dict: A dictionary containing the predicted 'triglycerides' and 'ggt' values.
    """
    # --- A. Data Validation ---
    if not isinstance(time_series_data, pd.DataFrame) or not isinstance(tabular_data, pd.DataFrame):
        raise TypeError("Inputs must be pandas DataFrames.")
    if len(time_series_data) != 14:
        raise ValueError(f"Time-series data must contain exactly 14 days of data, but got {len(time_series_data)}.")
    if len(tabular_data) != 1:
        raise ValueError("Tabular data must contain exactly 1 row of data.")

    # --- B. Data Preprocessing ---
    # Combine data for scaling
    combined_df = pd.concat([
        tabular_data.reset_index(drop=True),
        time_series_data.reset_index(drop=True)
    ], axis=1)

    # Define feature columns based on the training script
    feature_cols = [
        'age', 'bmi', 'has_hereditary_risk', 'tee', 'calorie_intake', 'fat_grams',
        'carbs_grams', 'protein_grams', 'daily_steps', 'active_minutes', 'sleep_hours',
        'sleep_quality_score', 'resting_heart_rate', 'heart_rate_variability',
        'energy_balance', 'cumulative_balance'
    ]
    
    # Scale the features
    # Note: We create a temporary DataFrame with all features to match the scaler's format
    full_features_df = pd.DataFrame(columns=feature_cols)
    for col in feature_cols:
        if col in combined_df.columns:
            full_features_df[col] = combined_df[col]
    
    scaled_features = feature_scaler.transform(full_features_df)
    
    # Create a scaled dataframe to easily select our inputs
    scaled_df = pd.DataFrame(scaled_features, columns=feature_cols)

    # --- C. Reshape Data for the Model ---
    # Define the columns for each model input
    time_series_features = [
        'daily_steps', 'active_minutes', 'sleep_hours',
        'sleep_quality_score', 'resting_heart_rate', 'heart_rate_variability'
    ]
    tabular_features = [
        'age', 'bmi', 'has_hereditary_risk', 'calorie_intake',
        'fat_grams', 'carbs_grams', 'protein_grams'
    ]
    
    # Add the numeric gender to the tabular data
    tabular_data['gender_numeric'] = 1 if tabular_data['gender'].iloc[0] == 'M' else 0
    tabular_features_with_gender = ['gender_numeric'] + tabular_features

    # Extract the correctly shaped and scaled inputs
    X_lstm = scaled_df[time_series_features].values.reshape(1, 14, 6) # (1 sample, 14 days, 6 features)
    # For MLP, we need the static/diet data from the *current* day (the one we're predicting for)
    # and the gender column we just created
    X_mlp_tabular_part = scaled_df.iloc[-1][tabular_features].values 
    X_mlp = np.concatenate(([tabular_data['gender_numeric'].iloc[0]], X_mlp_tabular_part)).reshape(1, 8)

    # --- D. Make the Prediction ---
    scaled_prediction = model.predict([X_lstm, X_mlp])

    # --- E. Inverse-Transform the Output ---
    unscaled_prediction = target_scaler.inverse_transform(scaled_prediction)

    # --- F. Format and Return the Result ---
    result = {
        'predicted_triglycerides': round(unscaled_prediction[0][0], 2),
        'predicted_ggt': round(unscaled_prediction[0][1], 2)
    }
    return result

# --- 3. Example Usage ---
if __name__ == '__main__':
    print("\n--- Running Prediction Example ---")
    
    # Create sample raw data for a new prediction
    # This mimics the data your backend would receive for a user
    
    # 1. The last 14 days of watch data (the look-back window)
    sample_watch_data = pd.DataFrame({
        'daily_steps': np.random.randint(4000, 8000, 14),
        'active_minutes': np.random.randint(20, 60, 14),
        'sleep_hours': np.random.uniform(6.5, 8.0, 14),
        'sleep_quality_score': np.random.randint(75, 90, 14),
        'resting_heart_rate': np.random.randint(60, 70, 14),
        'heart_rate_variability': np.random.randint(45, 60, 14)
    })

    # 2. Today's static and nutritional data (the day we are predicting for)
    sample_user_data = pd.DataFrame({
        'age': [45],
        'gender': ['M'],
        'bmi': [29.5],
        'has_hereditary_risk': [1],
        'tee': [2400], # Total Energy Expenditure
        'calorie_intake': [2800],
        'fat_grams': [100],
        'carbs_grams': [350],
        'protein_grams': [120],
        'energy_balance': [400],
        'cumulative_balance': [5000]
    })

    # Call the prediction function
    try:
        prediction = predict_risk(sample_watch_data, sample_user_data)
        print("\nPrediction Successful!")
        print(f"  Predicted Triglycerides: {prediction['predicted_triglycerides']} mg/dL")
        print(f"  Predicted GGT: {prediction['predicted_ggt']} U/L")
    except Exception as e:
        print(f"An error occurred during prediction: {e}")