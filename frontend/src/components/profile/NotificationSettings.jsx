import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Award, Coffee, Pill, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getNotificationSettings, updatePreferenceCategory } from '../../services/profileService.jsx';

const NotificationSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: true,
    achievementAlerts: true,
    mealReminders: true,
    medicationReminders: false,
    activitySuggestions: true
  });

  useEffect(() => {
    if (user?.id) {
      const notificationSettings = getNotificationSettings(user.id);
      setSettings(notificationSettings);
    }
  }, [user]);

  const handleToggle = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(updatedSettings);
    
    if (user?.id) {
      updatePreferenceCategory(user.id, 'notifications', updatedSettings);
    }
  };

  const notificationItems = [
    {
      key: 'dailyReminders',
      label: 'Daily Health Reminders',
      description: 'Get daily reminders to log your health data',
      icon: <Clock className="w-5 h-5 text-primary-500" />
    },
    {
      key: 'weeklyReports',
      label: 'Weekly Health Reports',
      description: 'Receive a summary of your weekly health progress',
      icon: <Bell className="w-5 h-5 text-teal-500" />
    },
    {
      key: 'achievementAlerts',
      label: 'Achievement Alerts',
      description: 'Get notified when you earn badges or reach milestones',
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      key: 'mealReminders',
      label: 'Meal Logging Reminders',
      description: 'Reminders to log your meals throughout the day',
      icon: <Coffee className="w-5 h-5 text-orange-500" />
    },
    {
      key: 'medicationReminders',
      label: 'Medication Reminders',
      description: 'Reminders to take your medications on schedule',
      icon: <Pill className="w-5 h-5 text-red-500" />
    },
    {
      key: 'activitySuggestions',
      label: 'Activity Suggestions',
      description: 'Get personalized activity recommendations',
      icon: <Activity className="w-5 h-5 text-indigo-500" />
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
        <Bell className="w-6 h-6 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
      </div>
      
      <div className="space-y-5">
        {notificationItems.map((item) => (
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
    </motion.div>
  );
};

export default NotificationSettings;