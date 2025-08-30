import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Flame, BarChart } from 'lucide-react';
import { logActivity, getActivitySuggestions, calculateActivityCalories } from '../services/loggingService.jsx';

const ActivityLogForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    activityType: '',
    duration: '',
    intensity: 'Moderate',
    caloriesBurned: 0,
    notes: ''
  });
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    // Load activity suggestions
    setSuggestions(getActivitySuggestions());
  }, []);
  
  useEffect(() => {
    // Calculate calories burned when activity or duration changes
    if (form.activityType && form.duration) {
      const calories = calculateActivityCalories(form.activityType, parseInt(form.duration));
      setForm(prev => ({ ...prev, caloriesBurned: calories }));
    }
  }, [form.activityType, form.duration]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'activityType') {
      setShowSuggestions(value.length > 0);
    }
  };
  
  const selectSuggestion = (activity) => {
    setForm(prev => ({
      ...prev,
      activityType: activity.name,
      intensity: activity.intensity
    }));
    setShowSuggestions(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.activityType || !form.duration) {
      alert('Please fill in the activity type and duration');
      return;
    }
    
    const activityData = {
      ...form,
      duration: parseInt(form.duration),
      caloriesBurned: parseInt(form.caloriesBurned)
    };
    
    logActivity(activityData);
    
    // Reset form
    setForm({
      activityType: '',
      duration: '',
      intensity: 'Moderate',
      caloriesBurned: 0,
      notes: ''
    });
    
    if (onSuccess) onSuccess();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-login p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-600 to-indigo-500">Log Activity</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm text-slate-700 mb-1">Activity Type</label>
            <div className="relative">
              <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                name="activityType"
                value={form.activityType}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., Walking, Running"
                autoComplete="off"
              />
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-xl border border-slate-200 max-h-60 overflow-y-auto">
                {suggestions.map((activity, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                    onClick={() => selectSuggestion(activity)}
                  >
                    <span>{activity.name}</span>
                    <span className="text-xs text-slate-500">{activity.intensity} intensity</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Duration (minutes)</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 30"
                min="1"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Intensity</label>
            <div className="relative">
              <BarChart className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                name="intensity"
                value={form.intensity}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Calories Burned</label>
            <div className="relative">
              <Flame className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="caloriesBurned"
                value={form.caloriesBurned}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Calculated automatically"
                readOnly
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-slate-700 mb-1">Notes (Optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
            placeholder="Any additional details about your activity"
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
          >
            Save Activity
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ActivityLogForm;