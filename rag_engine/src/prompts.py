def create_recommendation_prompt(user_context, original_meal, alternatives_df):
    """
    Builds the final prompt for the Gemini API.
    """
    # Convert alternatives dataframe to a simple string format
    alternatives_text = ""
    if not alternatives_df.empty:
        for index, row in alternatives_df.iterrows():
            alternatives_text += (
                f"- {row['food_name']}: "
                f"{int(row['energy_kcal'])} kcal, "
                f"{int(row['fat_g'])}g fat, "
                f"{int(row['protein_g'])}g protein\n"
            )
    else:
        alternatives_text = "No direct alternatives found in our database."

    prompt = f"""
    You are a friendly, expert nutritionist for a user in India whose goal is to reduce their risk of fatty liver disease.

    **User's Health Context:**
    - Predicted Triglycerides: {user_context['predicted_tg']} mg/dL (High is > 150)
    - Daily Calorie Target: {user_context['calorie_target']} kcal

    **User's Recent Meal:**
    - They just ate: {original_meal['name']} ({original_meal['calories']} kcal, {original_meal['fat']}g fat)

    **Task:**
    Write a short, encouraging, and conversational message for the user. Acknowledge their recent meal. Then, suggest a healthier but similar alternative for their next meal. Use one of the options from our database as the primary suggestion and briefly explain *why* it's a better choice. Do not invent new dishes.

    **Healthier Alternatives from our Database:**
    {alternatives_text}
    """
    return prompt