import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const CorrelationCard = ({ correlation }) => {
  const { title, description, strength } = correlation;
  
  // Determine color based on correlation strength
  const getStrengthColor = () => {
    switch (strength) {
      case 'Strong':
        return 'text-green-500';
      case 'Moderate':
        return 'text-blue-500';
      case 'Weak':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-card p-4 mb-4"
    >
      <div className="flex items-start">
        <div className="mr-3 text-primary-500">
          <Link2 className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-gray-800">{title}</h3>
            {strength !== 'Unknown' && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 ${getStrengthColor()}`}>
                {strength} Correlation
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CorrelationCard;