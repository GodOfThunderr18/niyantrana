import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-primary-200 border-t-primary-500 rounded-full"></div>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-semibold text-gray-700 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Niyantrana
        </motion.h2>
        
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Loading your wellness journey...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
