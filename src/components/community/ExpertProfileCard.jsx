import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ExpertProfileCard = ({ expert, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 border rounded-xl bg-white cursor-pointer transition-all hover:shadow-sm"
      onClick={() => onClick(expert.id)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <img 
            src={expert.avatar} 
            alt={expert.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          {expert.verified && (
            <CheckCircle className="w-4 h-4 text-primary-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
          )}
        </div>
        
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-gray-800">{expert.name}</h3>
            {expert.verified && (
              <span className="ml-1 text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">{expert.title}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
          {expert.specialty}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{expert.bio}</p>
      
      <div className="text-xs font-medium text-primary-600">
        View full profile
      </div>
    </motion.div>
  );
};

export default ExpertProfileCard;