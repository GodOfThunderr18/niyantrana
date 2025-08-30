import Papa from 'papaparse';

// Food database state
let foodDatabase = [];
let isLoaded = false;
let isLoading = false;

// Load CSV data
export const loadFoodDatabase = async () => {
  if (isLoaded || isLoading) return foodDatabase;
  
  isLoading = true;
  
  try {
    const response = await fetch('/Anuvaad_INDB_2024.11.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            foodDatabase = results.data.map((row, index) => {
              // Parse nutritional data with fallbacks
              const parseFloatSafe = (value) => {
                const parsed = parseFloat(value);
                return isNaN(parsed) ? 0 : parsed;
              };
              
              return {
                id: `csv_${index}`,
                food_code: row.food_code || '',
                name: row.food_name || 'Unknown Food',
                primarysource: row.primarysource || '',
                
                // Energy
                energy_kj: parseFloatSafe(row.energy_kj),
                calories: parseFloatSafe(row.energy_kcal) || parseFloatSafe(row.energy_kj) * 0.239, // Convert kJ to kcal if needed
                
                // Macronutrients (per 100g)
                carbs: parseFloatSafe(row.carb_g),
                protein: parseFloatSafe(row.protein_g),
                fat: parseFloatSafe(row.fat_g),
                fiber: parseFloatSafe(row.fibre_g),
                sugar: parseFloatSafe(row.freesugar_g),
                
                // Minerals (mg)
                calcium: parseFloatSafe(row.calcium_mg),
                phosphorus: parseFloatSafe(row.phosphorus_mg),
                magnesium: parseFloatSafe(row.magnesium_mg),
                sodium: parseFloatSafe(row.sodium_mg),
                potassium: parseFloatSafe(row.potassium_mg),
                iron: parseFloatSafe(row.iron_mg),
                zinc: parseFloatSafe(row.zinc_mg),
                
                // Vitamins
                vitamin_a: parseFloatSafe(row.vita_ug),
                vitamin_c: parseFloatSafe(row.vitc_mg),
                vitamin_d2: parseFloatSafe(row.vitd2_ug),
                vitamin_d3: parseFloatSafe(row.vitd3_ug),
                vitamin_b1: parseFloatSafe(row.vitb1_mg),
                vitamin_b2: parseFloatSafe(row.vitb2_mg),
                vitamin_b3: parseFloatSafe(row.vitb3_mg),
                vitamin_b6: parseFloatSafe(row.vitb6_mg),
                folate: parseFloatSafe(row.folate_ug),
                
                // Serving information
                serving: row.servings_unit || '100g',
                unit_calories: parseFloatSafe(row.unit_serving_energy_kcal) || parseFloatSafe(row.unit_serving_energy_kj) * 0.239,
                unit_carbs: parseFloatSafe(row.unit_serving_carb_g),
                unit_protein: parseFloatSafe(row.unit_serving_protein_g),
                unit_fat: parseFloatSafe(row.unit_serving_fat_g),
                
                // Categorization for better search
                category: categorizeFood(row.food_name || ''),
                searchTerms: generateSearchTerms(row.food_name || '')
              };
            }).filter(food => food.name && food.name !== 'Unknown Food');
            
            isLoaded = true;
            isLoading = false;
            console.log(`Loaded ${foodDatabase.length} foods from CSV database`);
            resolve(foodDatabase);
          } catch (error) {
            console.error('Error processing CSV data:', error);
            isLoading = false;
            reject(error);
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          isLoading = false;
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    isLoading = false;
    throw error;
  }
};

// Categorize food based on name patterns
const categorizeFood = (foodName) => {
  const name = foodName.toLowerCase();
  
  // Grains and cereals
  if (name.includes('rice') || name.includes('wheat') || name.includes('flour') || 
      name.includes('bread') || name.includes('roti') || name.includes('chapati')) {
    return 'Grains & Cereals';
  }
  
  // Vegetables
  if (name.includes('vegetable') || name.includes('tomato') || name.includes('onion') || 
      name.includes('potato') || name.includes('carrot') || name.includes('spinach') ||
      name.includes('cabbage') || name.includes('cauliflower') || name.includes('brinjal')) {
    return 'Vegetables';
  }
  
  // Fruits
  if (name.includes('fruit') || name.includes('apple') || name.includes('banana') || 
      name.includes('orange') || name.includes('mango') || name.includes('grape')) {
    return 'Fruits';
  }
  
  // Dairy
  if (name.includes('milk') || name.includes('curd') || name.includes('cheese') || 
      name.includes('paneer') || name.includes('butter') || name.includes('ghee')) {
    return 'Dairy';
  }
  
  // Legumes and pulses
  if (name.includes('dal') || name.includes('lentil') || name.includes('bean') || 
      name.includes('pea') || name.includes('chickpea') || name.includes('gram')) {
    return 'Legumes & Pulses';
  }
  
  // Meat and fish
  if (name.includes('chicken') || name.includes('mutton') || name.includes('fish') || 
      name.includes('meat') || name.includes('egg')) {
    return 'Meat & Fish';
  }
  
  // Nuts and seeds
  if (name.includes('nut') || name.includes('seed') || name.includes('almond') || 
      name.includes('cashew') || name.includes('groundnut')) {
    return 'Nuts & Seeds';
  }
  
  // Oils and fats
  if (name.includes('oil') || name.includes('fat')) {
    return 'Oils & Fats';
  }
  
  // Spices and condiments
  if (name.includes('spice') || name.includes('masala') || name.includes('powder') || 
      name.includes('paste') || name.includes('sauce')) {
    return 'Spices & Condiments';
  }
  
  // Beverages
  if (name.includes('tea') || name.includes('coffee') || name.includes('juice') || 
      name.includes('drink') || name.includes('water')) {
    return 'Beverages';
  }
  
  // Sweets and desserts
  if (name.includes('sweet') || name.includes('sugar') || name.includes('jaggery') || 
      name.includes('honey') || name.includes('dessert')) {
    return 'Sweets & Desserts';
  }
  
  return 'Other';
};

// Generate search terms for better matching
const generateSearchTerms = (foodName) => {
  const terms = [foodName.toLowerCase()];
  
  // Add common variations and synonyms
  const synonyms = {
    'rice': ['chawal', 'bhat'],
    'wheat': ['gehun', 'atta'],
    'milk': ['doodh'],
    'water': ['paani', 'jal'],
    'oil': ['tel'],
    'sugar': ['cheeni', 'shakkar'],
    'salt': ['namak'],
    'onion': ['pyaz'],
    'potato': ['aloo'],
    'tomato': ['tamatar'],
    'lentil': ['dal', 'daal'],
    'chicken': ['murgi'],
    'fish': ['machli', 'machhli'],
    'egg': ['anda']
  };
  
  // Add synonyms
  Object.entries(synonyms).forEach(([english, hindi]) => {
    if (foodName.toLowerCase().includes(english)) {
      terms.push(...hindi);
    }
    hindi.forEach(h => {
      if (foodName.toLowerCase().includes(h)) {
        terms.push(english);
      }
    });
  });
  
  // Add word variations
  const words = foodName.toLowerCase().split(/[\s,.-]+/);
  terms.push(...words.filter(word => word.length > 2));
  
  return [...new Set(terms)];
};

// Enhanced search function
export const searchFoodsInDatabase = async (query, limit = 20) => {
  // Ensure database is loaded
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  
  if (!query || query.length < 1) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  
  const scoredResults = foodDatabase.map(food => {
    let score = 0;
    const foodName = food.name.toLowerCase();
    
    // Exact name match (highest priority)
    if (foodName === lowerQuery) {
      score += 100;
    }
    
    // Name starts with query
    if (foodName.startsWith(lowerQuery)) {
      score += 80;
    }
    
    // Name contains query
    if (foodName.includes(lowerQuery)) {
      score += 60;
    }
    
    // Search terms match
    food.searchTerms.forEach(term => {
      if (term === lowerQuery) score += 70;
      if (term.startsWith(lowerQuery)) score += 50;
      if (term.includes(lowerQuery)) score += 30;
    });
    
    // Multi-word matching
    if (queryWords.length > 1) {
      const matchedWords = queryWords.filter(word => 
        foodName.includes(word) || food.searchTerms.some(term => term.includes(word))
      );
      score += (matchedWords.length / queryWords.length) * 40;
    }
    
    // Category match
    if (food.category && food.category.toLowerCase().includes(lowerQuery)) {
      score += 20;
    }
    
    return { ...food, searchScore: score };
  });
  
  // Filter and sort by score
  return scoredResults
    .filter(food => food.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore)
    .slice(0, limit);
};

// Get food by ID
export const getFoodById = async (id) => {
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  return foodDatabase.find(food => food.id === id);
};

// Get foods by category
export const getFoodsByCategory = async (category, limit = 50) => {
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  
  return foodDatabase
    .filter(food => food.category === category)
    .slice(0, limit);
};

// Get all categories
export const getAllCategories = async () => {
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  
  const categories = [...new Set(foodDatabase.map(food => food.category))]
    .filter(Boolean)
    .sort();
  
  return categories;
};

// Get popular foods (foods with higher nutritional density)
export const getPopularFoods = async (limit = 20) => {
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  
  return foodDatabase
    .filter(food => food.calories > 0)
    .sort((a, b) => {
      // Sort by nutritional density (protein + fiber - sugar)
      const scoreA = (a.protein || 0) + (a.fiber || 0) - (a.sugar || 0);
      const scoreB = (b.protein || 0) + (b.fiber || 0) - (b.sugar || 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

// Get database stats
export const getDatabaseStats = async () => {
  if (!isLoaded) {
    await loadFoodDatabase();
  }
  
  const categories = await getAllCategories();
  
  return {
    totalFoods: foodDatabase.length,
    totalCategories: categories.length,
    categories: categories,
    isLoaded,
    isLoading
  };
};

// Initialize database on module load
loadFoodDatabase().catch(console.error);