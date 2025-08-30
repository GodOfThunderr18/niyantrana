import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
import os

# --- 1. Define Paths and Load Artifacts ---
MODEL_PATH = 'models/multimodal_model.h5'
FEATURE_SCALER_PATH = 'models/feature_scaler.pkl'
TARGET_SCALER_PATH = 'models/target_scaler.pkl'

print("Loading model and scalers...")
if not all(os.path.exists(p) for p in [MODEL_PATH, FEATURE_SCALER_PATH, TARGET_SCALER_PATH]):
    print("Error: Model or scaler files not found. Please train the model first by running 'src/train.py'.")
    exit()

model = load_model(MODEL_PATH)
feature_scaler = joblib.load(FEATURE_SCALER_PATH)
target_scaler = joblib.load(TARGET_SCALER_PATH)
print("Artifacts loaded successfully.")

# --- 2. Define the Prediction Function ---
def predict_risk(time_series_data, tabular_data):
    # ... (The first parts of the function (A, B, C, D) remain exactly the same)
    # --- A. Data Validation ---
    if not isinstance(time_series_data, pd.DataFrame) or not isinstance(tabular_data, pd.DataFrame):
        raise TypeError("Inputs must be pandas DataFrames.")
    if len(time_series_data) != 14:
        raise ValueError(f"Time-series data must contain exactly 14 days of data, but got {len(time_series_data)}.")
    if len(tabular_data) != 1:
        raise ValueError("Tabular data must contain exactly 1 row of data.")

    # --- B. Data Preprocessing ---
    combined_df = pd.concat([tabular_data.reset_index(drop=True), time_series_data.reset_index(drop=True)], axis=1)
    feature_cols = ['age', 'bmi', 'has_hereditary_risk', 'tee', 'calorie_intake', 'fat_grams', 'carbs_grams', 'protein_grams', 'daily_steps', 'active_minutes', 'sleep_hours', 'sleep_quality_score', 'resting_heart_rate', 'heart_rate_variability', 'energy_balance', 'cumulative_balance']
    
    full_features_df = pd.DataFrame(columns=feature_cols)
    for col in feature_cols:
        if col in combined_df.columns:
            full_features_df[col] = combined_df[col]
    
    scaled_features = feature_scaler.transform(full_features_df)
    scaled_df = pd.DataFrame(scaled_features, columns=feature_cols)

    # --- C. Reshape Data for the Model ---
    time_series_features = ['daily_steps', 'active_minutes', 'sleep_hours', 'sleep_quality_score', 'resting_heart_rate', 'heart_rate_variability']
    tabular_features = ['age', 'bmi', 'has_hereditary_risk', 'calorie_intake', 'fat_grams', 'carbs_grams', 'protein_grams']
    
    tabular_data['gender_numeric'] = 1 if tabular_data['gender'].iloc[0] == 'M' else 0
    tabular_features_with_gender = ['gender_numeric'] + tabular_features

    X_lstm = scaled_df[time_series_features].values.reshape(1, 14, 6)
    X_mlp_tabular_part = scaled_df.iloc[-1][tabular_features].values
    X_mlp = np.concatenate(([tabular_data['gender_numeric'].iloc[0]], X_mlp_tabular_part)).reshape(1, 8)

    # --- D. Make the Prediction ---
    scaled_prediction = model.predict([X_lstm, X_mlp])

    # --- E. Inverse-Transform the Output ---
    unscaled_prediction = target_scaler.inverse_transform(scaled_prediction)

    # --- F. Format and Return the Result (THIS IS THE CORRECTED PART) ---
    result = {
        'predicted_triglycerides': float(round(unscaled_prediction[0][0], 2)),
        'predicted_ggt': float(round(unscaled_prediction[0][1], 2))
    }
    return result

# --- 3. Example Usage ---
if __name__ == '__main__':
    # ... (The example usage part remains the same)
    print("\n--- Running Prediction Example ---")
    sample_watch_data = pd.DataFrame({'daily_steps': np.random.randint(4000, 8000, 14), 'active_minutes': np.random.randint(20, 60, 14), 'sleep_hours': np.random.uniform(6.5, 8.0, 14), 'sleep_quality_score': np.random.randint(75, 90, 14), 'resting_heart_rate': np.random.randint(60, 70, 14), 'heart_rate_variability': np.random.randint(45, 60, 14)})
    sample_user_data = pd.DataFrame({'age': [45], 'gender': ['M'], 'bmi': [29.5], 'has_hereditary_risk': [1], 'tee': [2400], 'calorie_intake': [2800], 'fat_grams': [100], 'carbs_grams': [350], 'protein_grams': [120], 'energy_balance': [400], 'cumulative_balance': [5000]})
    try:
        prediction = predict_risk(sample_watch_data, sample_user_data)
        print("\nPrediction Successful!")
        print(f"  Predicted Triglycerides: {prediction['predicted_triglycerides']} mg/dL")
        print(f"  Predicted GGT: {prediction['predicted_ggt']} U/L")
    except Exception as e:
        print(f"An error occurred during prediction: {e}")