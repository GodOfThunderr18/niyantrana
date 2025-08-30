import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Database } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getUserPreferences, updatePreferenceCategory } from '../../services/profileService.jsx';

const PrivacySettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    shareDataWithDoctors: true,
    anonymousDataForResearch: true,
    showProfileInCommunity: false
  });

  useEffect(() => {
    if (user?.id) {
      const prefs = getUserPreferences(user.id);
      setSettings(prefs.privacy || settings);
    }
  }, [user]);

  const handleToggle = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(updatedSettings);
    
    if (user?.id) {
      updatePreferenceCategory(user.id, 'privacy', updatedSettings);
    }
  };

  const privacyItems = [
    {
      key: 'shareDataWithDoctors',
      label: 'Share Data with Healthcare Providers',
      description: 'Allow your doctors to access your health data',
      icon: <User className="w-5 h-5 text-primary-500" />
    },
    {
      key: 'anonymousDataForResearch',
      label: 'Anonymous Data for Research',
      description: 'Contribute anonymized data to improve health research',
      icon: <Database className="w-5 h-5 text-teal-500" />
    },
    {
      key: 'showProfileInCommunity',
      label: 'Show Profile in Community',
      description: 'Make your profile visible to other community members',
      icon: <User className="w-5 h-5 text-indigo-500" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glassmorphism-card p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
      </div>
      
      <div className="space-y-5">
        {privacyItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <div className="text-sm font-medium text-gray-700">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings[item.key]}
                onChange={(e) => handleToggle(item.key, e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800">Your Privacy Matters</h4>
            <p className="text-xs text-amber-700 mt-1">
              We take your privacy seriously. Your data is encrypted and stored securely. 
              You can request a full export or deletion of your data at any time.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacySettings;