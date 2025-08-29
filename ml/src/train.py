import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from src.model_builder import build_multimodal_model
import os

# --- 1. Define File Paths ---
PROCESSED_DATA_PATH = 'data/processed/preprocessed_data.npz'
MODEL_SAVE_PATH = 'models/multimodal_model.h5'

# --- 2. Load the Preprocessed Data ---
print(f"Loading preprocessed data from {PROCESSED_DATA_PATH}...")
try:
    data = np.load(PROCESSED_DATA_PATH, allow_pickle=True)
    X_lstm = data['X_lstm']
    X_mlp = data['X_mlp']
    y = data['y']
except FileNotFoundError:
    print("Error: Preprocessed data not found.")
    print("Please run 'src/data_processing.py' first to generate the data.")
    exit()

print("Data loaded successfully.")
print(f"LSTM input shape: {X_lstm.shape}")
print(f"MLP input shape: {X_mlp.shape}")
print(f"Target shape: {y.shape}")


# --- 3. Split the Data into Training and Validation Sets ---
print("Splitting data into training and validation sets...")
X_lstm_train, X_lstm_val, X_mlp_train, X_mlp_val, y_train, y_val = train_test_split(
    X_lstm, X_mlp, y, test_size=0.2, random_state=42
)

# --- 4. Build the Model ---
lstm_input_shape = (X_lstm_train.shape[1], X_lstm_train.shape[2])
mlp_input_shape = (X_mlp_train.shape[1],)

model = build_multimodal_model(lstm_input_shape, mlp_input_shape)
model.summary()


# --- 5. Train the Model ---
print("\nStarting model training...")
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

history = model.fit(
    [X_lstm_train, X_mlp_train],
    y_train,
    epochs=100,
    batch_size=32,
    validation_data=([X_lstm_val, X_mlp_val], y_val),
    callbacks=[early_stopping],
    verbose=1
)

print("Model training complete.")


# --- 6. Save the Trained Model ---
os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"\nTrained model saved successfully to {MODEL_SAVE_PATH}")