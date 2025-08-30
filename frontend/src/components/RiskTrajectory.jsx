import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RiskTrajectory = ({ riskData }) => {
  const { score, category, trend } = riskData;
  
  // Determine color based on risk category
  const getColorClass = () => {
    switch (category) {
      case 'Low':
        return 'text-green-500';
      case 'Moderate':
        return 'text-amber-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Determine trend icon
  const getTrendIcon = () => {
    switch (trend) {
      case 'Increasing':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'Decreasing':
        return <TrendingDown className="w-5 h-5 text-green-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glassmorphism-card p-4"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Trajectory</h3>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Risk Score</span>
        <span className={`font-medium ${getColorClass()}`}>{score}/100</span>
      </div>
      
      {/* Risk gauge */}
      <div className="w-full h-4 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${category === 'Low' ? 'bg-green-500' : category === 'Moderate' ? 'bg-amber-500' : 'bg-red-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>Low Risk</span>
        <span>Moderate Risk</span>
        <span>High Risk</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">Current Status</span>
          <div className={`font-medium ${getColorClass()}`}>{category} Risk</div>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Trend</span>
          {getTrendIcon()}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskTrajectory;