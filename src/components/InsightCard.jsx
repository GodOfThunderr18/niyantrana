import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

const InsightCard = ({ insight }) => {
  const { type, title, description } = insight;
  
  // Define styling based on insight type
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200'
        };
      case 'alert':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'positive':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'suggestion':
        return {
          icon: <TrendingUp className="w-5 h-5" />,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };
  
  const styles = getTypeStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-4 ${styles.bgColor} ${styles.borderColor} mb-3`}
    >
      <div className="flex items-start">
        <div className={`mr-3 ${styles.color}`}>
          {styles.icon}
        </div>
        <div>
          <h3 className={`font-medium ${styles.color}`}>{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightCard;