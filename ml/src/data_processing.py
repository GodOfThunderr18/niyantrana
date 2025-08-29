import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

def load_data(filepath):
    """Loads the final synthetic data from the CSV file."""
    print(f"Loading data from {filepath}...")
    df = pd.read_csv(filepath, parse_dates=['date'])
    return df

def create_sequences(data, sequence_length=14):
    """
    Reshapes the data into sequences for the LSTM and corresponding tabular data for the MLP.
    """
    print(f"Creating sequences with a look-back window of {sequence_length} days...")
    
    time_series_features = [
        'daily_steps', 'active_minutes', 'sleep_hours', 
        'sleep_quality_score', 'resting_heart_rate', 'heart_rate_variability'
    ]
    tabular_features = [
        'age', 'gender_numeric', 'bmi', 'has_hereditary_risk', 'calorie_intake', 
        'fat_grams', 'carbs_grams', 'protein_grams'
    ]
    target_features = ['triglycerides', 'ggt']

    X_lstm, X_mlp, y = [], [], []
    
    # Convert gender to a numeric format for the model
    data['gender_numeric'] = data['gender'].apply(lambda x: 1 if x == 'M' else 0)
    
    for user_id, group in data.groupby('user_id'):
        user_data = group.sort_values('date')
        if len(user_data) < sequence_length:
            continue
        for i in range(len(user_data) - sequence_length):
            lstm_seq = user_data.iloc[i:i+sequence_length][time_series_features].values
            X_lstm.append(lstm_seq)
            mlp_data = user_data.iloc[i+sequence_length][tabular_features].values
            X_mlp.append(mlp_data)
            target_vals = user_data.iloc[i+sequence_length][target_features].values
            y.append(target_vals)

    # Explicitly convert to float32 to prevent dtype errors in TensorFlow
    return np.array(X_lstm, dtype=np.float32), np.array(X_mlp, dtype=np.float32), np.array(y, dtype=np.float32)


if __name__ == '__main__':
    RAW_DATA_PATH = 'data/raw/synthetic_trig_ggt_dataset_with_watch.csv'
    PROCESSED_DATA_PATH = 'data/processed/preprocessed_data.npz'
    FEATURE_SCALER_PATH = 'models/feature_scaler.pkl'
    TARGET_SCALER_PATH = 'models/target_scaler.pkl'

    # 1. Load the raw data
    main_df = load_data(RAW_DATA_PATH)
    
    # NOTE: The problematic line that converted user_id has been REMOVED.
    
    # 2. Scale the data and save the scalers
    print("Scaling features and targets separately...")
    feature_cols = main_df.columns.drop(['user_id', 'date', 'gender', 'triglycerides', 'ggt', 'trend_type'])
    target_cols = ['triglycerides', 'ggt']

    feature_scaler = MinMaxScaler()
    main_df[feature_cols] = feature_scaler.fit_transform(main_df[feature_cols])
    joblib.dump(feature_scaler, FEATURE_SCALER_PATH)
    print(f"Feature scaler saved to {FEATURE_SCALER_PATH}")

    target_scaler = MinMaxScaler()
    main_df[target_cols] = target_scaler.fit_transform(main_df[target_cols])
    joblib.dump(target_scaler, TARGET_SCALER_PATH)
    print(f"Target scaler saved to {TARGET_SCALER_PATH}")
    
    # 3. Create the LSTM sequences and MLP inputs
    SEQUENCE_LENGTH = 14
    X_lstm, X_mlp, y = create_sequences(main_df, sequence_length=SEQUENCE_LENGTH)
    
    # 4. Save the processed data
    np.savez(PROCESSED_DATA_PATH, X_lstm=X_lstm, X_mlp=X_mlp, y=y)
    
    print("\n--- Data Processing Complete ---")
    print(f"Processed data saved to {PROCESSED_DATA_PATH}")