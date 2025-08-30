import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Search, Clock, CalendarClock, Filter, ChevronDown } from 'lucide-react';
import { logMeal, searchFoods, getRecentMeals, calculateMealCalories } from '../services/loggingService.jsx';
import { getAllCategories, getFoodsByCategory } from '../services/foodDatabaseService.jsx';

const MealLogForm = ({ onSuccess }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('Breakfast');
  const [recentMeals, setRecentMeals] = useState([]);
  const [notes, setNotes] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    // Load recent meals and categories
    setRecentMeals(getRecentMeals());
    loadCategories();
  }, []);
  
  const loadCategories = async () => {
    try {
      const cats = await getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };
  
  useEffect(() => {
    // Search foods when query changes (with debouncing)
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.length >= 1) {
        setIsSearching(true);
        setSearchError(null);
        try {
          const results = await searchFoods(searchQuery);
          setSearchResults(results);
          setShowSearchResults(results.length > 0);
        } catch (error) {
          console.error('Search error:', error);
          setSearchError('Failed to search foods. Please try again.');
          setSearchResults([]);
          setShowSearchResults(false);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
        setIsSearching(false);
        setSearchError(null);
      }
    }, 300); // 300ms debounce
    
    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory(''); // Clear category when typing
  };
  
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setShowCategoryFilter(false);
    
    if (category) {
      setIsSearching(true);
      try {
        const results = await getFoodsByCategory(category, 20);
        setSearchResults(results.map(food => ({ ...food, source: 'database' })));
        setShowSearchResults(results.length > 0);
      } catch (error) {
        console.error('Error loading category foods:', error);
        setSearchError('Failed to load foods for this category.');
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const addFoodItem = (food) => {
    // Check if food is already added
    const existingIndex = selectedFoods.findIndex(f => f.name === food.name);
    
    if (existingIndex >= 0) {
      // Increment quantity if already added
      const updatedFoods = [...selectedFoods];
      updatedFoods[existingIndex] = {
        ...updatedFoods[existingIndex],
        quantity: (updatedFoods[existingIndex].quantity || 1) + 1
      };
      setSelectedFoods(updatedFoods);
    } else {
      // Add new food with quantity 1
      setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    }
    
    // Clear search
    setSearchQuery('');
    setShowSearchResults(false);
  };
  
  const removeFood = (index) => {
    const updatedFoods = [...selectedFoods];
    updatedFoods.splice(index, 1);
    setSelectedFoods(updatedFoods);
  };
  
  const updateFoodQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedFoods = [...selectedFoods];
    updatedFoods[index] = {
      ...updatedFoods[index],
      quantity: newQuantity
    };
    setSelectedFoods(updatedFoods);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFoods.length === 0) {
      alert('Please add at least one food item');
      return;
    }
    
    const mealData = {
      mealType,
      foods: selectedFoods,
      totalCalories: calculateMealCalories(selectedFoods),
      notes
    };
    
    logMeal(mealData);
    
    // Reset form
    setSelectedFoods([]);
    setSearchQuery('');
    setNotes('');
    setRecentMeals(getRecentMeals()); // Refresh recent meals
    
    if (onSuccess) onSuccess();
  };
  
  const handleRecentMealSelect = (meal) => {
    setSelectedFoods(meal.foods);
    setMealType(meal.mealType);
    setNotes(meal.notes || '');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-login p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md">
          <Utensils className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-orange-600 to-red-500">Log Meal</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <label className="block text-sm text-slate-700 mb-1">Search Food</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  placeholder="Search from 1000+ foods: rice, dal, chicken, apple..."
                  autoComplete="off"
                />
                {isSearching && (
                  <div className="absolute right-3 top-3">
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className={`px-3 py-2.5 border border-slate-200 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white transition-colors flex items-center gap-2 ${
                    selectedCategory ? 'border-primary-600 bg-primary-50' : ''
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    showCategoryFilter ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {showCategoryFilter && (
                  <div className="absolute z-30 mt-1 right-0 w-64 bg-white shadow-lg rounded-xl border border-slate-200 max-h-60 overflow-y-auto">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
                      <div className="text-xs font-medium text-slate-600">Browse by Category</div>
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-primary-50 cursor-pointer text-sm border-b border-slate-100"
                      onClick={() => handleCategorySelect('')}
                    >
                      All Foods
                    </div>
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className={`px-3 py-2 hover:bg-primary-50 cursor-pointer text-sm border-b border-slate-100 last:border-b-0 ${
                          selectedCategory === category ? 'bg-primary-100 text-primary-700' : ''
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {(showSearchResults || isSearching || searchError) && (
              <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-xl border border-slate-200 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="px-4 py-6 text-center">
                    <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <div className="text-sm text-slate-500">Searching foods...</div>
                  </div>
                ) : searchError ? (
                  <div className="px-4 py-3 text-red-500 text-center text-sm">
                    {searchError}
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                       <div className="text-xs text-slate-600 font-medium">
                         {selectedCategory 
                           ? `${searchResults.length} foods in ${selectedCategory}`
                           : `Found ${searchResults.length} foods`
                         }
                       </div>
                     </div>
                    {searchResults.map((food, index) => (
                      <div
                        key={food.id || index}
                        className="px-4 py-3 hover:bg-primary-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-b-0 transition-colors"
                        onClick={() => addFoodItem(food)}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-slate-800">{food.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {food.category && (
                              <div className="text-xs text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">
                                {food.category}
                              </div>
                            )}
                            {food.source && (
                              <div className={`text-xs px-2 py-0.5 rounded-full ${
                                food.source === 'database' 
                                  ? 'text-green-600 bg-green-100' 
                                  : 'text-blue-600 bg-blue-100'
                              }`}>
                                {food.source === 'database' ? 'Verified' : 'Local'}
                              </div>
                            )}
                          </div>
                          {food.protein > 0 && (
                            <div className="text-xs text-slate-500 mt-1">
                              P: {food.protein?.toFixed(1)}g | C: {food.carbs?.toFixed(1)}g | F: {food.fat?.toFixed(1)}g
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-3">
                          <div className="text-sm font-medium text-slate-700">
                            {Math.round(food.calories || food.unit_calories || 0)} cal
                          </div>
                          <div className="text-xs text-slate-500">
                            per {food.serving || '100g'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-6 text-slate-500 text-center">
                    <div className="text-sm">No foods found for "{searchQuery}"</div>
                    <div className="text-xs mt-1">Try searching for common foods like "rice", "dal", or "chicken"</div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Meal</label>
            <div className="relative">
              <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={mealType}
                onChange={(e) => {
                  setMealType(e.target.value);
                  setSelectedFoods([]); // Clear the food list when meal type changes
                }}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Selected Foods */}
        {selectedFoods.length > 0 && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-2">Selected Foods</h4>
            <div className="space-y-2">
              {selectedFoods.map((food, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <div className="font-medium">{food.name}</div>
                    <div className="text-xs text-slate-500">{food.calories * (food.quantity || 1)} calories</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200"
                        onClick={() => updateFoodQuantity(index, (food.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{food.quantity || 1}</span>
                      <button
                        type="button"
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200"
                        onClick={() => updateFoodQuantity(index, (food.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      onClick={() => removeFood(index)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-2 border-t border-slate-200 mt-2">
                <span className="font-medium">Total Calories:</span>
                <span className="font-bold">{calculateMealCalories(selectedFoods)}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Recent Meals */}
        {recentMeals.length > 0 && selectedFoods.length === 0 && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h4 className="font-medium text-slate-800">Recent Meals</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recentMeals.map((meal, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-sm cursor-pointer hover:bg-slate-50"
                  onClick={() => handleRecentMealSelect(meal)}
                >
                  <div className="font-medium">{meal.mealType}</div>
                  <div className="text-xs text-slate-500">
                    {meal.foods.map(f => `${f.quantity || 1} ${f.name}`).join(', ')}
                  </div>
                  <div className="text-xs font-medium mt-1">{meal.totalCalories} calories</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Notes */}
        <div>
          <label className="block text-sm text-slate-700 mb-1">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
            placeholder="Any additional details about your meal"
            rows="2"
          />
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-2">
          <motion.button
            type="button"
            onClick={() => onSuccess()}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedFoods.length === 0}
          >
            Save Meal
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default MealLogForm;