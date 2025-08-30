import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Zap, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getThemeSettings, updatePreferenceCategory } from '../../services/profileService.jsx';

const ThemeSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    accessibility: {
      highContrast: false,
      largerText: false,
      reduceMotion: false
    }
  });
  const [activeTab, setActiveTab] = useState('theme');

  useEffect(() => {
    if (user?.id) {
      const themeSettings = getThemeSettings(user.id);
      setSettings(themeSettings);
    }
  }, [user]);

  const handleThemeChange = (theme) => {
    const updatedSettings = { ...settings, theme };
    setSettings(updatedSettings);
    if (user?.id) {
      updatePreferenceCategory(user.id, 'theme', theme);
    }
    
    // Apply theme to document
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    document.documentElement.classList.add(`theme-${theme}`);
  };

  const handleAccessibilityChange = (key, value) => {
    const updatedAccessibility = {
      ...settings.accessibility,
      [key]: value
    };
    
    const updatedSettings = {
      ...settings,
      accessibility: updatedAccessibility
    };
    
    setSettings(updatedSettings);
    
    if (user?.id) {
      updatePreferenceCategory(user.id, 'accessibility', updatedAccessibility);
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
        <Palette className="w-6 h-6 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-800">Appearance & Accessibility</h3>
      </div>
      
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'theme' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500'}`}
        >
          Theme
        </button>
        <button
          onClick={() => setActiveTab('accessibility')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'accessibility' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500'}`}
        >
          Accessibility
        </button>
      </div>
      
      {activeTab === 'theme' && (
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex flex-col items-center p-3 rounded-lg ${settings.theme === 'light' ? 'bg-primary-50 ring-2 ring-primary-500' : 'bg-white/50 hover:bg-white/80'}`}
          >
            <Sun className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-sm font-medium">Light</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex flex-col items-center p-3 rounded-lg ${settings.theme === 'dark' ? 'bg-primary-50 ring-2 ring-primary-500' : 'bg-white/50 hover:bg-white/80'}`}
          >
            <Moon className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-sm font-medium">Dark</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('auto')}
            className={`flex flex-col items-center p-3 rounded-lg ${settings.theme === 'auto' ? 'bg-primary-50 ring-2 ring-primary-500' : 'bg-white/50 hover:bg-white/80'}`}
          >
            <Zap className="w-8 h-8 text-teal-500 mb-2" />
            <span className="text-sm font-medium">Auto</span>
          </button>
        </div>
      )}
      
      {activeTab === 'accessibility' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">High Contrast</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.accessibility.highContrast}
                onChange={(e) => handleAccessibilityChange('highContrast', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-600">Aa</span>
              <span className="text-gray-700">Larger Text</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.accessibility.largerText}
                onChange={(e) => handleAccessibilityChange('largerText', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">🚶‍♂️</span>
              <span className="text-gray-700">Reduce Motion</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.accessibility.reduceMotion}
                onChange={(e) => handleAccessibilityChange('reduceMotion', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ThemeSettings;