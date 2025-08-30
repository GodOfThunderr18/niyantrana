import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const QuestCard = ({ quest, onComplete, isWeekly = false }) => {
  // Dynamically get the icon component
  const IconComponent = quest.icon ? LucideIcons[quest.icon] : LucideIcons.CheckCircle;
  
  const handleComplete = () => {
    if (!quest.completed && onComplete) {
      onComplete(quest.id);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl p-4 ${quest.completed 
        ? 'bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200' 
        : 'bg-white border border-gray-200 hover:border-primary-200 transition-colors'}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${quest.completed 
          ? 'bg-primary-500 text-white' 
          : 'bg-primary-100 text-primary-500'}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{quest.title}</h3>
          <p className="text-sm text-gray-600">{quest.description}</p>
        </div>
        
        {!quest.completed ? (
          <button
            onClick={handleComplete}
            className="px-3 py-1 text-sm bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-full transition-colors"
          >
            {isWeekly ? `${quest.progress}/${quest.target}` : 'Complete'}
          </button>
        ) : (
          <div className="px-3 py-1 text-sm bg-primary-500 text-white rounded-full">
            <LucideIcons.Check className="w-4 h-4" />
          </div>
        )}
      </div>
      
      {isWeekly && !quest.completed && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
      
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-primary-600 font-medium">
          +{quest.points} points
        </span>
        {quest.completed && (
          <span className="text-xs text-gray-500">
            {new Date(quest.dateCompleted).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default QuestCard;