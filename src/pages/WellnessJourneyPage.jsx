import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Award, Zap, Crown, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import AchievementCard from '../components/gamification/AchievementCard.jsx';
import QuestCard from '../components/gamification/QuestCard.jsx';
import LevelProgressCard from '../components/gamification/LevelProgressCard.jsx';
import { 
  getUserAchievements, 
  getDailyQuests, 
  getWeeklyQuests,
  completeDailyQuest,
  updateWeeklyQuestProgress,
  checkAchievements
} from '../services/gamificationService.jsx';

const WellnessJourneyPage = () => {
  const { user, addPoints } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [weeklyQuests, setWeeklyQuests] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    if (user) {
      // Load achievements and quests
      setAchievements(getUserAchievements(user.id));
      setDailyQuests(getDailyQuests(user.id));
      setWeeklyQuests(getWeeklyQuests(user.id));
      
      // Check for achievements that should be unlocked
      checkAchievements(user.id, addPoints);
    }
  }, [user, addPoints]);
  
  const handleCompleteDaily = (questId) => {
    completeDailyQuest(questId, user?.id, addPoints);
    setDailyQuests([...getDailyQuests(user?.id)]);
    setAchievements([...getUserAchievements(user?.id)]);
  };
  
  const handleUpdateWeekly = (questId) => {
    const quest = weeklyQuests.find(q => q.id === questId);
    if (quest) {
      updateWeeklyQuestProgress(questId, quest.progress + 1, user?.id, addPoints);
      setWeeklyQuests([...getWeeklyQuests(user?.id)]);
      setAchievements([...getUserAchievements(user?.id)]);
    }
  };
  
  // Filter achievements
  const filteredAchievements = activeFilter === 'all' 
    ? achievements 
    : activeFilter === 'unlocked' 
      ? achievements.filter(a => a.unlocked) 
      : achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Wellness Journey</h1>
        <p className="text-gray-600">Track your progress and unlock achievements</p>
      </motion.div>

      <div className="space-y-6">
        {/* Current Level & Progress */}
        <LevelProgressCard user={user} />

        {/* Daily Quests */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Daily Quests</h2>
            <Target className="w-6 h-6 text-primary-500" />
          </div>
          
          <div className="space-y-3">
            {dailyQuests.map(quest => (
              <QuestCard 
                key={quest.id} 
                quest={quest} 
                onComplete={handleCompleteDaily} 
              />
            ))}
          </div>
        </motion.div>
        
        {/* Weekly Quests */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Challenges</h2>
            <Award className="w-6 h-6 text-teal-500" />
          </div>
          
          <div className="space-y-3">
            {weeklyQuests.map(quest => (
              <QuestCard 
                key={quest.id} 
                quest={quest} 
                onComplete={handleUpdateWeekly} 
                isWeekly={true} 
              />
            ))}
          </div>
        </motion.div>
        
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
            <Trophy className="w-6 h-6 text-accent-500" />
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeFilter === 'all' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('unlocked')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeFilter === 'unlocked' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
              >
                Unlocked
              </button>
              <button
                onClick={() => setActiveFilter('locked')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeFilter === 'locked' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
              >
                Locked
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default WellnessJourneyPage;
