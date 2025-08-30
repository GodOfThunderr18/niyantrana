import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

const EducationalContentCard = ({ content, featured = false, onClick }) => {
  // Format for featured (larger) cards vs regular cards
  if (featured) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-xl overflow-hidden shadow-sm cursor-pointer h-full"
        onClick={() => onClick(content.id)}
      >
        <div className="relative h-48 w-full">
          <img 
            src={content.image} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            {content.category}
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{content.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{content.readTime}</span>
            </div>
            <div className="flex items-center text-xs font-medium text-primary-600">
              <span>Read article</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Regular (smaller) card layout
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex rounded-xl overflow-hidden shadow-sm cursor-pointer h-full"
      onClick={() => onClick(content.id)}
    >
      <div className="relative h-full w-24 flex-shrink-0">
        <img 
          src={content.image} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3 bg-white flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
            {content.category}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>{content.readTime}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-sm mb-1">{content.title}</h3>
        <p className="text-gray-600 text-xs line-clamp-2">{content.description}</p>
        
        <div className="mt-2 text-xs font-medium text-primary-600 flex items-center">
          <span>Read more</span>
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default EducationalContentCard;