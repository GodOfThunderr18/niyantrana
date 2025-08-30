import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Thermometer } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getUserPreferences, updatePreferenceCategory } from '../../services/profileService.jsx';

const UnitPreferences = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    weight: 'kg',
    height: 'cm',
    glucose: 'mg/dL',
    temperature: 'celsius'
  });

  useEffect(() => {
    if (user?.id) {
      const prefs = getUserPreferences(user.id);
      setSettings(prefs.units || settings);
    }
  }, [user]);

  const handleChange = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(updatedSettings);
    
    if (user?.id) {
      updatePreferenceCategory(user.id, 'units', updatedSettings);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glassmorphism-card p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Ruler className="w-6 h-6 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-800">Measurement Units</h3>
      </div>
      
      <div className="space-y-5">
        {/* Weight Units */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Weight</label>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="weight"
                value="kg"
                checked={settings.weight === 'kg'}
                onChange={() => handleChange('weight', 'kg')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Kilograms (kg)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="weight"
                value="lb"
                checked={settings.weight === 'lb'}
                onChange={() => handleChange('weight', 'lb')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Pounds (lb)</span>
            </label>
          </div>
        </div>
        
        {/* Height Units */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Height</label>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="height"
                value="cm"
                checked={settings.height === 'cm'}
                onChange={() => handleChange('height', 'cm')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Centimeters (cm)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="height"
                value="ft"
                checked={settings.height === 'ft'}
                onChange={() => handleChange('height', 'ft')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Feet/Inches (ft/in)</span>
            </label>
          </div>
        </div>
        
        {/* Glucose Units */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Blood Glucose</label>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="glucose"
                value="mg/dL"
                checked={settings.glucose === 'mg/dL'}
                onChange={() => handleChange('glucose', 'mg/dL')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">mg/dL</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="glucose"
                value="mmol/L"
                checked={settings.glucose === 'mmol/L'}
                onChange={() => handleChange('glucose', 'mmol/L')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">mmol/L</span>
            </label>
          </div>
        </div>
        
        {/* Temperature Units */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Temperature</label>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="temperature"
                value="celsius"
                checked={settings.temperature === 'celsius'}
                onChange={() => handleChange('temperature', 'celsius')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Celsius (°C)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="temperature"
                value="fahrenheit"
                checked={settings.temperature === 'fahrenheit'}
                onChange={() => handleChange('temperature', 'fahrenheit')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Fahrenheit (°F)</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Thermometer className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Unit Conversion</h4>
            <p className="text-xs text-blue-700 mt-1">
              Your measurements will be automatically converted when you change units. 
              Historical data will be displayed in your preferred units.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnitPreferences;