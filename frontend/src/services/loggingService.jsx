import { searchFoodsInDatabase, loadFoodDatabase } from './foodDatabaseService.jsx';

// Simple notification function
export const notify = (message) => {
  console.log(message);
  // Use alert for simple notification
  alert(message);
};

// Helper functions for localStorage persistence
const getMealLogsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('mealLogs') || '[]');
  } catch (error) {
    console.error('Error parsing meal logs from localStorage:', error);
    return [];
  }
};

const getVitalLogsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('vitalLogs') || '[]');
  } catch (error) {
    console.error('Error parsing vital logs from localStorage:', error);
    return [];
  }
};

const getActivityLogsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('activityLogs') || '[]');
  } catch (error) {
    console.error('Error parsing activity logs from localStorage:', error);
    return [];
  }
};

const saveMealLogsToStorage = (logs) => {
  try {
    localStorage.setItem('mealLogs', JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving meal logs to localStorage:', error);
  }
};

const saveVitalLogsToStorage = (logs) => {
  try {
    localStorage.setItem('vitalLogs', JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving vital logs to localStorage:', error);
  }
};

const saveActivityLogsToStorage = (logs) => {
  try {
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving activity logs to localStorage:', error);
  }
};

// Comprehensive Indian foods database with nutritional information
const indianFoods = [
  // Breads & Grains
  { name: 'Chapati', calories: 120, carbs: 20, protein: 3, fat: 3, serving: '1 piece', category: 'Breads' },
  { name: 'Roti', calories: 110, carbs: 18, protein: 3, fat: 2.5, serving: '1 piece', category: 'Breads' },
  { name: 'Paratha', calories: 180, carbs: 25, protein: 4, fat: 8, serving: '1 piece', category: 'Breads' },
  { name: 'Naan', calories: 200, carbs: 30, protein: 5, fat: 6, serving: '1 piece', category: 'Breads' },
  { name: 'Puri', calories: 85, carbs: 10, protein: 2, fat: 4, serving: '1 piece', category: 'Breads' },
  { name: 'Rice', calories: 200, carbs: 45, protein: 4, fat: 0.5, serving: '1 cup cooked', category: 'Grains' },
  { name: 'Brown Rice', calories: 220, carbs: 45, protein: 5, fat: 1.8, serving: '1 cup cooked', category: 'Grains' },
  { name: 'Biryani', calories: 400, carbs: 50, protein: 15, fat: 18, serving: '1 cup', category: 'Rice Dishes' },
  { name: 'Pulao', calories: 320, carbs: 45, protein: 8, fat: 12, serving: '1 cup', category: 'Rice Dishes' },
  
  // Lentils & Legumes
  { name: 'Dal', calories: 150, carbs: 22, protein: 9, fat: 2, serving: '1 cup', category: 'Lentils' },
  { name: 'Moong Dal', calories: 140, carbs: 20, protein: 10, fat: 1.5, serving: '1 cup', category: 'Lentils' },
  { name: 'Toor Dal', calories: 160, carbs: 24, protein: 8, fat: 2, serving: '1 cup', category: 'Lentils' },
  { name: 'Chana Dal', calories: 170, carbs: 25, protein: 9, fat: 2.5, serving: '1 cup', category: 'Lentils' },
  { name: 'Masoor Dal', calories: 145, carbs: 22, protein: 9, fat: 1.8, serving: '1 cup', category: 'Lentils' },
  { name: 'Rajma', calories: 220, carbs: 35, protein: 12, fat: 3, serving: '1 cup', category: 'Legumes' },
  { name: 'Chole', calories: 210, carbs: 35, protein: 10, fat: 5, serving: '1 cup', category: 'Legumes' },
  { name: 'Sambar', calories: 140, carbs: 20, protein: 5, fat: 5, serving: '1 cup', category: 'Lentils' },
  
  // South Indian
  { name: 'Idli', calories: 80, carbs: 15, protein: 2, fat: 0.5, serving: '1 piece', category: 'South Indian' },
  { name: 'Dosa', calories: 150, carbs: 25, protein: 3, fat: 4, serving: '1 piece', category: 'South Indian' },
  { name: 'Uttapam', calories: 180, carbs: 28, protein: 4, fat: 5, serving: '1 piece', category: 'South Indian' },
  { name: 'Vada', calories: 120, carbs: 12, protein: 3, fat: 7, serving: '1 piece', category: 'South Indian' },
  { name: 'Upma', calories: 160, carbs: 28, protein: 4, fat: 4, serving: '1 cup', category: 'South Indian' },
  { name: 'Poha', calories: 170, carbs: 30, protein: 3, fat: 5, serving: '1 cup', category: 'South Indian' },
  
  // Vegetables
  { name: 'Aloo Gobi', calories: 180, carbs: 30, protein: 5, fat: 6, serving: '1 cup', category: 'Vegetables' },
  { name: 'Palak Paneer', calories: 220, carbs: 10, protein: 12, fat: 15, serving: '1 cup', category: 'Vegetables' },
  { name: 'Bhindi Masala', calories: 140, carbs: 18, protein: 4, fat: 6, serving: '1 cup', category: 'Vegetables' },
  { name: 'Baingan Bharta', calories: 160, carbs: 20, protein: 3, fat: 8, serving: '1 cup', category: 'Vegetables' },
  { name: 'Aloo Jeera', calories: 150, carbs: 25, protein: 3, fat: 5, serving: '1 cup', category: 'Vegetables' },
  { name: 'Cabbage Sabzi', calories: 120, carbs: 15, protein: 3, fat: 5, serving: '1 cup', category: 'Vegetables' },
  { name: 'Karela Sabzi', calories: 100, carbs: 12, protein: 2, fat: 4, serving: '1 cup', category: 'Vegetables' },
  
  // Paneer Dishes
  { name: 'Paneer', calories: 260, carbs: 3, protein: 18, fat: 20, serving: '100g', category: 'Paneer' },
  { name: 'Paneer Butter Masala', calories: 280, carbs: 12, protein: 15, fat: 20, serving: '1 cup', category: 'Paneer' },
  { name: 'Paneer Tikka', calories: 200, carbs: 5, protein: 14, fat: 14, serving: '100g', category: 'Paneer' },
  { name: 'Matar Paneer', calories: 240, carbs: 15, protein: 12, fat: 16, serving: '1 cup', category: 'Paneer' },
  
  // Non-Vegetarian
  { name: 'Chicken Curry', calories: 250, carbs: 8, protein: 25, fat: 14, serving: '1 cup', category: 'Non-Veg' },
  { name: 'Butter Chicken', calories: 350, carbs: 10, protein: 30, fat: 20, serving: '1 cup', category: 'Non-Veg' },
  { name: 'Chicken Tikka', calories: 180, carbs: 2, protein: 25, fat: 8, serving: '100g', category: 'Non-Veg' },
  { name: 'Fish Curry', calories: 200, carbs: 6, protein: 22, fat: 10, serving: '1 cup', category: 'Non-Veg' },
  { name: 'Mutton Curry', calories: 300, carbs: 8, protein: 28, fat: 18, serving: '1 cup', category: 'Non-Veg' },
  
  // Chutneys & Condiments
  { name: 'Coconut Chutney', calories: 60, carbs: 4, protein: 1, fat: 5, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Mint Chutney', calories: 25, carbs: 3, protein: 1, fat: 1, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Coriander Chutney', calories: 30, carbs: 4, protein: 1, fat: 1.5, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Tamarind Chutney', calories: 45, carbs: 11, protein: 0.5, fat: 0.2, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Tomato Chutney', calories: 35, carbs: 7, protein: 1, fat: 1, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Peanut Chutney', calories: 80, carbs: 5, protein: 3, fat: 6, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Ginger Chutney', calories: 40, carbs: 8, protein: 1, fat: 1, serving: '2 tbsp', category: 'Chutneys' },
  { name: 'Onion Chutney', calories: 50, carbs: 10, protein: 1, fat: 1.5, serving: '2 tbsp', category: 'Chutneys' },
  
  // Snacks
  { name: 'Samosa', calories: 180, carbs: 20, protein: 3, fat: 10, serving: '1 piece', category: 'Snacks' },
  { name: 'Pakora', calories: 120, carbs: 12, protein: 3, fat: 7, serving: '3 pieces', category: 'Snacks' },
  { name: 'Dhokla', calories: 90, carbs: 15, protein: 3, fat: 2, serving: '1 piece', category: 'Snacks' },
  { name: 'Kachori', calories: 200, carbs: 22, protein: 4, fat: 11, serving: '1 piece', category: 'Snacks' },
  { name: 'Bhel Puri', calories: 160, carbs: 25, protein: 4, fat: 5, serving: '1 cup', category: 'Snacks' },
  { name: 'Pani Puri', calories: 25, carbs: 4, protein: 1, fat: 1, serving: '1 piece', category: 'Snacks' },
  
  // Beverages & Dairy
  { name: 'Lassi', calories: 150, carbs: 15, protein: 5, fat: 8, serving: '1 glass', category: 'Beverages' },
  { name: 'Buttermilk', calories: 60, carbs: 8, protein: 3, fat: 2, serving: '1 glass', category: 'Beverages' },
  { name: 'Masala Chai', calories: 80, carbs: 12, protein: 3, fat: 3, serving: '1 cup', category: 'Beverages' },
  { name: 'Milk', calories: 150, carbs: 12, protein: 8, fat: 8, serving: '1 cup', category: 'Dairy' },
  { name: 'Curd', calories: 100, carbs: 8, protein: 6, fat: 5, serving: '1 cup', category: 'Dairy' },
  { name: 'Raita', calories: 80, carbs: 6, protein: 3, fat: 5, serving: '1/2 cup', category: 'Dairy' },
  
  // Sweets
  { name: 'Gulab Jamun', calories: 180, carbs: 25, protein: 3, fat: 8, serving: '1 piece', category: 'Sweets' },
  { name: 'Rasgulla', calories: 120, carbs: 20, protein: 4, fat: 3, serving: '1 piece', category: 'Sweets' },
  { name: 'Kheer', calories: 200, carbs: 30, protein: 5, fat: 7, serving: '1/2 cup', category: 'Sweets' },
  { name: 'Halwa', calories: 250, carbs: 35, protein: 4, fat: 10, serving: '1/2 cup', category: 'Sweets' },
  
  // Mixed Dishes
  { name: 'Khichdi', calories: 200, carbs: 35, protein: 8, fat: 4, serving: '1 cup', category: 'Mixed Dishes' },
  { name: 'Pongal', calories: 180, carbs: 30, protein: 6, fat: 5, serving: '1 cup', category: 'Mixed Dishes' },
  { name: 'Pulihora', calories: 220, carbs: 40, protein: 4, fat: 6, serving: '1 cup', category: 'Mixed Dishes' },
];

// Common activities with calorie burn information
const activities = [
  { name: 'Walking', caloriesPerMinute: 4, intensity: 'Low' },
  { name: 'Jogging', caloriesPerMinute: 8, intensity: 'Moderate' },
  { name: 'Running', caloriesPerMinute: 12, intensity: 'High' },
  { name: 'Cycling', caloriesPerMinute: 7, intensity: 'Moderate' },
  { name: 'Swimming', caloriesPerMinute: 9, intensity: 'Moderate' },
  { name: 'Yoga', caloriesPerMinute: 3, intensity: 'Low' },
  { name: 'Weight Training', caloriesPerMinute: 6, intensity: 'Moderate' },
  { name: 'Dancing', caloriesPerMinute: 6, intensity: 'Moderate' },
  { name: 'Gardening', caloriesPerMinute: 4, intensity: 'Low' },
  { name: 'Household Chores', caloriesPerMinute: 3, intensity: 'Low' },
];

// Enhanced search function that combines CSV database with local Indian foods
export const searchFoods = async (query) => {
  if (!query || query.length < 1) return [];
  
  try {
    // Search in comprehensive CSV database first
     const csvResults = await searchFoodsInDatabase(query, 15);
    
    // Search in local Indian foods as fallback/supplement
    const localResults = searchLocalFoods(query);
    
    // Combine results, prioritizing CSV database
    const combinedResults = [];
    const seenNames = new Set();
    
    // Add CSV results first
    csvResults.forEach(food => {
      const normalizedName = food.name.toLowerCase().trim();
      if (!seenNames.has(normalizedName)) {
        combinedResults.push({
          ...food,
          source: 'database'
        });
        seenNames.add(normalizedName);
      }
    });
    
    // Add local results that aren't duplicates (more lenient matching)
    localResults.forEach(food => {
      const normalizedName = food.name.toLowerCase().trim();
      // Only exclude if there's an exact match or very similar match
      const isDuplicate = Array.from(seenNames).some(seenName => {
        return seenName === normalizedName || 
               (seenName.includes(normalizedName) && normalizedName.length > 3) ||
               (normalizedName.includes(seenName) && seenName.length > 3);
      });
      
      if (!isDuplicate && combinedResults.length < 20) {
        combinedResults.push({
          ...food,
          source: 'local'
        });
        seenNames.add(normalizedName);
      }
    });
    
    
    return combinedResults.slice(0, 20);
  } catch (error) {
    console.error('Error searching foods:', error);
    // Fallback to local search only
    return searchLocalFoods(query);
  }
};

// Local search function for Indian foods (fallback)
const searchLocalFoods = (query) => {
  if (!query || query.length < 1) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  // Exact matches first
  const exactMatches = indianFoods.filter(food => 
    food.name.toLowerCase().startsWith(lowerQuery)
  );
  
  // Partial matches
  const partialMatches = indianFoods.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) && 
    !food.name.toLowerCase().startsWith(lowerQuery)
  );
  
  // Category matches (if query matches category)
  const categoryMatches = indianFoods.filter(food => 
    food.category && food.category.toLowerCase().includes(lowerQuery) &&
    !food.name.toLowerCase().includes(lowerQuery)
  );
  
  // Combine results with exact matches first, then partial, then category
  const results = [...exactMatches, ...partialMatches, ...categoryMatches];
  
  // Remove duplicates and limit to 10 results
  const uniqueResults = results.filter((food, index, self) => 
    index === self.findIndex(f => f.name === food.name)
  );
  
  return uniqueResults.slice(0, 10);
};

// Search foods by category
export const searchFoodsByCategory = (category) => {
  return indianFoods.filter(food => 
    food.category && food.category.toLowerCase() === category.toLowerCase()
  );
};

// Get all food categories
export const getFoodCategories = () => {
  const categories = [...new Set(indianFoods.map(food => food.category))].filter(Boolean);
  return categories.sort();
};

// Get recent or frequent meals
export const getRecentMeals = () => {
  const mealLogs = getMealLogsFromStorage();
  return mealLogs.slice(0, 5); // Return last 5 meals
};

// Log a meal
export const logMeal = (mealData) => {
  const newMeal = {
    id: Date.now(),
    timestamp: new Date(),
    ...mealData
  };
  
  const mealLogs = getMealLogsFromStorage();
  mealLogs.unshift(newMeal);
  saveMealLogsToStorage(mealLogs);
  notify('Meal logged successfully!');
  return newMeal;
};

// Log vitals
export const logVitals = (vitalsData) => {
  const newVitals = {
    id: Date.now(),
    timestamp: new Date(),
    ...vitalsData
  };
  
  const vitalLogs = getVitalLogsFromStorage();
  vitalLogs.unshift(newVitals);
  saveVitalLogsToStorage(vitalLogs);
  notify('Vitals logged successfully!');
  return newVitals;
};

// Log activity
export const logActivity = (activityData) => {
  const newActivity = {
    id: Date.now(),
    timestamp: new Date(),
    ...activityData
  };
  
  const activityLogs = getActivityLogsFromStorage();
  activityLogs.unshift(newActivity);
  saveActivityLogsToStorage(activityLogs);
  notify('Activity logged successfully!');
  return newActivity;
};

// Get activity suggestions
export const getActivitySuggestions = () => {
  return activities;
};

// Get all meal logs
export const getMealLogs = () => {
  return [...getMealLogsFromStorage()];
};

// Get all vital logs
export const getVitalLogs = () => {
  return [...getVitalLogsFromStorage()];
};

// Get all activity logs
export const getActivityLogs = () => {
  return [...getActivityLogsFromStorage()];
};

// Calculate calories from meal
export const calculateMealCalories = (foods) => {
  return foods.reduce((total, food) => total + (food.calories * (food.quantity || 1)), 0);
};

// Calculate calories burned from activity
export const calculateActivityCalories = (activity, durationMinutes) => {
  const foundActivity = activities.find(a => a.name.toLowerCase() === activity.toLowerCase());
  if (foundActivity) {
    return foundActivity.caloriesPerMinute * durationMinutes;
  }
  return durationMinutes * 5; // Default to 5 calories per minute if activity not found
};

// Process natural language food input
export const processNaturalLanguageFood = (input) => {
  // This is a simplified version - in a real app, you'd use NLP or AI
  const result = { foods: [], mealType: 'Snack' };
  
  // Try to detect meal type
  if (input.toLowerCase().includes('breakfast')) result.mealType = 'Breakfast';
  if (input.toLowerCase().includes('lunch')) result.mealType = 'Lunch';
  if (input.toLowerCase().includes('dinner')) result.mealType = 'Dinner';
  
  // Simple parsing for quantities and foods
  indianFoods.forEach(food => {
    if (input.toLowerCase().includes(food.name.toLowerCase())) {
      // Try to find quantity before the food name
      const regex = new RegExp(`(\\d+)\\s+${food.name.toLowerCase()}`, 'i');
      const match = input.match(regex);
      
      result.foods.push({
        ...food,
        quantity: match ? parseInt(match[1]) : 1
      });
    }
  });
  
  return result;
};