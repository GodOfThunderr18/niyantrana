import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Activity } from 'lucide-react';
import MealLogForm from '../components/MealLogForm.jsx';
import VitalsLogForm from '../components/VitalsLogForm.jsx';
import ActivityLogForm from '../components/ActivityLogForm.jsx';

const LoggingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const handleLogSuccess = (type) => {
    setSuccessMessage(`${type} logged successfully!`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setActiveTab('overview');
  };
  
  const renderMealsForm = () => (
    <MealLogForm onSuccess={() => handleLogSuccess('Meal')} onCancel={() => setActiveTab('overview')} />
  );
  const renderVitalsForm = () => (
    <VitalsLogForm onSuccess={() => handleLogSuccess('Vitals')} onCancel={() => setActiveTab('overview')} />
  );
  
  const renderActivityForm = () => (
    <ActivityLogForm onSuccess={() => handleLogSuccess('Activity')} onCancel={() => setActiveTab('overview')} />
  );
  

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quick Logging</h1>
        <p className="text-gray-600">Log your meals, vitals, and activities</p>
      </motion.div>

      <div className="space-y-6">
        <div className="glassmorphism-card p-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'meals', label: '🍽️ Meals' },
              { key: 'vitals', label: 'Vitals' },
              { key: 'activity', label: 'Activity' },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 whitespace-nowrap ${activeTab === t.key ? 'bg-primary-50 text-primary-700 border-2 border-primary-200' : 'text-slate-600 hover:bg-slate-50'}`}>{t.label}</button>
            ))}
            <div className="ml-auto">
              <a href="/reports" className="px-3 py-2 text-sm rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-50">Enter Test Report</a>
            </div>
          </div>
        </div>

        {showSuccessMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glassmorphism-card p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl mb-4 flex items-center justify-between"
          >
            <p>{successMessage}</p>
            <button onClick={() => setShowSuccessMessage(false)} className="text-green-700 hover:text-green-900">
              ×
            </button>
          </motion.div>
        )}

        {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div onClick={() => setActiveTab('meals')} className="glassmorphism-card p-6 text-center cursor-pointer hover:scale-105 transition-transform will-change-transform backface-visibility-hidden">
            <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Log Meal</h3>
            <p className="text-sm text-gray-600">Track your food intake</p>
          </div>
          
          <div onClick={() => setActiveTab('vitals')} className="glassmorphism-card p-6 text-center cursor-pointer hover:scale-105 transition-transform will-change-transform backface-visibility-hidden">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Log Vitals</h3>
            <p className="text-sm text-gray-600">Blood pressure, glucose</p>
          </div>
          
          <div onClick={() => setActiveTab('activity')} className="glassmorphism-card p-6 text-center cursor-pointer hover:scale-105 transition-transform will-change-transform backface-visibility-hidden">
            <Activity className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Log Activity</h3>
            <p className="text-sm text-gray-600">Exercise and movement</p>
          </div>
        </motion.div>
        )}

        {activeTab === 'meals' && renderMealsForm()}
        {activeTab === 'vitals' && renderVitalsForm()}
        {activeTab === 'activity' && renderActivityForm()}


      </div>
      </div>
    </div>
  );
};

export default LoggingPage;
