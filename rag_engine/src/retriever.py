import pandas as pd

# Load your nutrition database
try:
    NUTRITION_DB = pd.read_excel("../ml/data/raw/Anuvaad_INDB_2024.11.xlsx")
    # Basic cleaning
    NUTRITION_DB.dropna(subset=['energy_kcal', 'fat_g', 'protein_g'], inplace=True)
except FileNotFoundError:
    print("Could not find the nutrition database file.")
    NUTRITION_DB = pd.DataFrame()

def retrieve_healthier_alternatives(meal_name, original_meal_info, db, top_n=3):
    """
    Finds healthier but similar alternatives from the nutrition database.
    
    A simple retriever based on filtering.
    """
    if db.empty:
        return pd.DataFrame()

    # Try to find a primary ingredient (e.g., 'chicken' from 'Chicken Biryani')
    primary_ingredient = meal_name.split()[0].lower()
    
    # Define what "healthier" means
    max_calories = original_meal_info['calories'] * 0.8 # 20% fewer calories
    max_fat = original_meal_info['fat'] * 0.8       # 20% less fat
    min_protein = original_meal_info['protein'] * 0.9 # Similar protein

    # Filter the database
    alternatives = db[
        (db['food_name'].str.lower().str.contains(primary_ingredient)) &
        (db['energy_kcal'] <= max_calories) &
        (db['fat_g'] <= max_fat) &
        (db['protein_g'] >= min_protein)
    ].head(top_n)
    
    return alternatives