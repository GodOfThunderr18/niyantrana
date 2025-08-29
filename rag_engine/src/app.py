from flask import Flask, request, jsonify
from dotenv import load_dotenv
import pandas as pd
import google.generativeai as genai
import os

# --- Import custom modules from the same directory ---
from src.retriever import retrieve_healthier_alternatives, NUTRITION_DB
from src.prompts import create_recommendation_prompt

# --- 1. Load Environment Variables ---
# This line loads the variables from your .env file (e.g., GOOGLE_API_KEY)
load_dotenv()

# --- 2. Configure the Gemini API ---
# This securely gets the API key from the environment variables
try:
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables. Please check your .env file.")
    genai.configure(api_key=api_key)
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    # Exit if the API key is not configured, as the app cannot function.
    exit()

# --- 3. Initialize the Flask App and Generative Model ---
app = Flask(__name__)
model = genai.GenerativeModel('gemini-pro')

print("RAG Recommendation Engine initialized successfully.")

# --- 4. Define the API Endpoint ---
@app.route('/recommend', methods=['POST'])
def get_recommendation():
    """
    Handles recommendation requests by executing the RAG pipeline.
    """
    # Get the JSON data from the request body
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        # Extract the necessary data from the JSON payload
        user_context = json_data['user_context']
        original_meal = json_data['original_meal']
        
        # --- RAG Pipeline Step 1: RETRIEVE ---
        # Find healthier alternatives from our local nutrition database
        alternatives = retrieve_healthier_alternatives(
            original_meal['name'],
            original_meal,
            NUTRITION_DB
        )
        
        # --- RAG Pipeline Step 2: AUGMENT ---
        # Create a detailed, context-rich prompt for the LLM
        prompt = create_recommendation_prompt(user_context, original_meal, alternatives)
        
        # --- RAG Pipeline Step 3: GENERATE ---
        # Call the Gemini API to get a creative, personalized recommendation
        response = model.generate_content(prompt)
        
        # Return the generated text in a clean JSON format
        return jsonify({"recommendation": response.text})

    except (KeyError, TypeError) as e:
        # Handle cases where the incoming JSON is malformed
        return jsonify({"error": f"Invalid or missing key in JSON payload: {e}"}), 400
    except Exception as e:
        # Handle any other unexpected errors during the process
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# --- 5. Run the Flask App ---
if __name__ == '__main__':
    # We run on port 5001 to avoid conflicts with the prediction API (which might be on 5000)
    # host='0.0.0.0' makes it accessible from your Express.js app on the same network
    app.run(host='0.0.0.0', port=5001, debug=True)