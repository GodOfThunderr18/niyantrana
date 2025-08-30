import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react';

const EducationalArticle = ({ content, onBack }) => {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Header Image */}
      <div className="relative h-48 md:h-64 w-full">
        <img 
          src={content.image} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      {/* Article Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {content.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{content.readTime}</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{content.title}</h1>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
              {content.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{content.author}</p>
              <p className="text-xs text-gray-500">{content.authorTitle}</p>
            </div>
          </div>
        </div>
        
        {/* Article Text - This would be the actual content */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 mb-4">
            {content.description}
          </p>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 my-4">Key Points to Remember</h2>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Regular monitoring is essential for managing your health effectively.</li>
            <li className="mb-2">Consult with healthcare professionals before making significant changes to your routine.</li>
            <li className="mb-2">Stay consistent with your health tracking for the best results.</li>
            <li className="mb-2">Small, sustainable changes often lead to better long-term outcomes.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Remember that everyone's health journey is unique. What works for one person may not work for another. Always personalize your approach based on your specific needs and medical history.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-primary-600">
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span>Helpful</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-primary-600">
              <Share2 className="w-5 h-5 mr-1" />
              <span>Share</span>
            </button>
          </div>
          <button className="flex items-center text-gray-600 hover:text-primary-600">
            <Bookmark className="w-5 h-5 mr-1" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationalArticle;