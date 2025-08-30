import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AchievementCard = ({ achievement }) => {
  // Dynamically get the icon component
  const IconComponent = achievement.icon ? LucideIcons[achievement.icon] : LucideIcons.Award;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl p-4 ${achievement.unlocked 
        ? 'bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200' 
        : 'bg-gray-100 border border-gray-200'}`}
    >
      {/* Locked overlay */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-[1px] flex items-center justify-center">
          <LucideIcons.Lock className="w-8 h-8 text-gray-500" />
        </div>
      )}
      
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${achievement.unlocked 
          ? 'bg-accent-500 text-white' 
          : 'bg-gray-300 text-gray-500'}`}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div>
          <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {achievement.description}
          </p>
        </div>
      </div>
      
      {achievement.unlocked && (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-accent-600 font-medium">
            +{achievement.points} points
          </span>
          <span className="text-xs text-gray-500">
            {new Date(achievement.dateUnlocked).toLocaleDateString()}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;