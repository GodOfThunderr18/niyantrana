import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Award, Star, Trophy, Medal } from 'lucide-react';
import { getLevelProgress } from '../../services/gamificationService.jsx';

const LevelProgressCard = ({ user }) => {
  const progress = getLevelProgress(user);
  
  // Get the appropriate icon based on user level
  const getLevelIcon = () => {
    switch (user?.level) {
      case 'Wellness Explorer':
        return <Star className="w-8 h-8 text-accent-500" />;
      case 'Wellness Champion':
        return <Trophy className="w-8 h-8 text-accent-500" />;
      case 'Wellness Master':
        return <Medal className="w-8 h-8 text-accent-500" />;
      default:
        return <Crown className="w-8 h-8 text-accent-500" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glassmorphism-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Current Level</h2>
        {getLevelIcon()}
      </div>
      
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-accent-600 mb-2">
          {user?.level || 'Wellness Novice'}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {progress.current} / {progress.target} points to next level
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-accent-500 to-accent-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-2xl font-bold text-primary-600">{user?.points || 0}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-2xl font-bold text-teal-600">{user?.streak || 0}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LevelProgressCard;