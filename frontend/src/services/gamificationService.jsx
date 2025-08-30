import { toast } from 'react-hot-toast';

// Mock database for achievements
const achievements = [
  {
    id: 'first-log',
    title: 'First Steps',
    description: 'Log your first health data',
    icon: 'Footprints',
    points: 50,
    category: 'logging',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'streak-3',
    title: 'Consistency Starter',
    description: 'Maintain a 3-day streak',
    icon: 'Flame',
    points: 100,
    category: 'streak',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'CalendarCheck',
    points: 200,
    category: 'streak',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'meals-10',
    title: 'Nutrition Tracker',
    description: 'Log 10 meals',
    icon: 'Utensils',
    points: 150,
    category: 'logging',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'vitals-10',
    title: 'Health Monitor',
    description: 'Log 10 vital measurements',
    icon: 'Activity',
    points: 150,
    category: 'logging',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'activity-10',
    title: 'Active Lifestyle',
    description: 'Log 10 physical activities',
    icon: 'Dumbbell',
    points: 150,
    category: 'logging',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'profile-complete',
    title: 'Identity Established',
    description: 'Complete your profile information',
    icon: 'UserCheck',
    points: 100,
    category: 'profile',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'chat-first',
    title: 'AI Companion',
    description: 'Have your first chat with the AI assistant',
    icon: 'MessageSquare',
    points: 75,
    category: 'engagement',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'level-up-first',
    title: 'Level Up',
    description: 'Reach your first level promotion',
    icon: 'TrendingUp',
    points: 250,
    category: 'progression',
    unlocked: false,
    dateUnlocked: null,
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Complete all daily quests for a full week',
    icon: 'Award',
    points: 300,
    category: 'quests',
    unlocked: false,
    dateUnlocked: null,
  },
];

// Mock database for quests
const dailyQuests = [
  {
    id: 'log-meal',
    title: 'Log a Meal',
    description: 'Record what you ate today',
    icon: 'Coffee',
    points: 20,
    category: 'logging',
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'log-vitals',
    title: 'Check Your Vitals',
    description: 'Record at least one vital measurement',
    icon: 'Heart',
    points: 20,
    category: 'logging',
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'log-activity',
    title: 'Stay Active',
    description: 'Log a physical activity',
    icon: 'Zap',
    points: 20,
    category: 'logging',
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'chat-assistant',
    title: 'Chat with Assistant',
    description: 'Ask your AI companion a health question',
    icon: 'MessageCircle',
    points: 15,
    category: 'engagement',
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'check-insights',
    title: 'Review Insights',
    description: 'Check your health trends and insights',
    icon: 'BarChart2',
    points: 15,
    category: 'engagement',
    completed: false,
    dateCompleted: null,
  },
];

// Mock database for weekly quests
const weeklyQuests = [
  {
    id: 'log-all-meals',
    title: 'Complete Meal Tracking',
    description: 'Log at least 10 meals this week',
    icon: 'Clipboard',
    points: 100,
    category: 'logging',
    progress: 0,
    target: 10,
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'activity-streak',
    title: 'Activity Streak',
    description: 'Log physical activities for 5 days this week',
    icon: 'TrendingUp',
    points: 150,
    category: 'logging',
    progress: 0,
    target: 5,
    completed: false,
    dateCompleted: null,
  },
  {
    id: 'maintain-streak',
    title: 'Maintain Your Streak',
    description: 'Don\'t break your daily login streak this week',
    icon: 'Calendar',
    points: 200,
    category: 'engagement',
    completed: false,
    dateCompleted: null,
  },
];

// Get user's achievements
export const getUserAchievements = (userId) => {
  // In a real app, this would filter achievements by user ID
  // For now, we'll just return all achievements from our mock database
  return achievements;
};

// Get user's daily quests
export const getDailyQuests = (userId) => {
  // Reset quests if it's a new day
  const today = new Date().toDateString();
  const lastQuestDate = localStorage.getItem('niyantrana_last_quest_date');
  
  if (lastQuestDate !== today) {
    // Reset daily quests
    dailyQuests.forEach(quest => {
      quest.completed = false;
      quest.dateCompleted = null;
    });
    localStorage.setItem('niyantrana_last_quest_date', today);
  }
  
  return dailyQuests;
};

// Get user's weekly quests
export const getWeeklyQuests = (userId) => {
  // Reset quests if it's a new week
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  
  const lastWeeklyReset = localStorage.getItem('niyantrana_weekly_quest_reset');
  const lastResetDate = lastWeeklyReset ? new Date(parseInt(lastWeeklyReset)) : null;
  
  if (!lastResetDate || lastResetDate < startOfWeek) {
    // Reset weekly quests
    weeklyQuests.forEach(quest => {
      quest.completed = false;
      quest.dateCompleted = null;
      quest.progress = 0;
    });
    localStorage.setItem('niyantrana_weekly_quest_reset', startOfWeek.getTime().toString());
  }
  
  return weeklyQuests;
};

// Complete a daily quest
export const completeDailyQuest = (questId, userId, addPointsCallback) => {
  const quest = dailyQuests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    quest.dateCompleted = new Date().toISOString();
    
    // Award points to the user
    if (addPointsCallback) {
      addPointsCallback(quest.points);
      toast.success(`Quest completed! +${quest.points} points`);
    }
    
    // Check for related achievements
    checkAchievements(userId, addPointsCallback);
    
    return true;
  }
  return false;
};

// Update progress on a weekly quest
export const updateWeeklyQuestProgress = (questId, progress, userId, addPointsCallback) => {
  const quest = weeklyQuests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.progress = Math.min(progress, quest.target);
    
    // Check if quest is now completed
    if (quest.progress >= quest.target) {
      quest.completed = true;
      quest.dateCompleted = new Date().toISOString();
      
      // Award points to the user
      if (addPointsCallback) {
        addPointsCallback(quest.points);
        toast.success(`Weekly quest completed! +${quest.points} points`);
      }
      
      // Check for related achievements
      checkAchievements(userId, addPointsCallback);
    }
    
    return true;
  }
  return false;
};

// Unlock an achievement
export const unlockAchievement = (achievementId, userId, addPointsCallback) => {
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.dateUnlocked = new Date().toISOString();
    
    // Award points to the user
    if (addPointsCallback) {
      addPointsCallback(achievement.points);
      toast.success(`Achievement unlocked: ${achievement.title}! +${achievement.points} points`, {
        duration: 5000,
        icon: '🏆',
      });
    }
    
    return true;
  }
  return false;
};

// Check for achievements that should be unlocked
export const checkAchievements = (userId, addPointsCallback) => {
  // In a real app, this would check the user's progress against achievement criteria
  // For this demo, we'll just check a few simple conditions
  
  // Check for streak achievements
  const user = JSON.parse(localStorage.getItem('niyantrana_user'));
  if (user) {
    // Streak achievements
    if (user.streak >= 3) {
      unlockAchievement('streak-3', userId, addPointsCallback);
    }
    if (user.streak >= 7) {
      unlockAchievement('streak-7', userId, addPointsCallback);
    }
    
    // Level up achievement
    if (user.level !== 'Wellness Novice') {
      unlockAchievement('level-up-first', userId, addPointsCallback);
    }
  }
  
  // Check for quest completion achievements
  const allDailyCompleted = dailyQuests.every(q => q.completed);
  if (allDailyCompleted) {
    // Check if all daily quests were completed for 7 consecutive days
    const perfectWeekCount = parseInt(localStorage.getItem('niyantrana_perfect_days') || '0');
    localStorage.setItem('niyantrana_perfect_days', (perfectWeekCount + 1).toString());
    
    if (perfectWeekCount + 1 >= 7) {
      unlockAchievement('perfect-week', userId, addPointsCallback);
      localStorage.setItem('niyantrana_perfect_days', '0');
    }
  }
};

// Get user's level progress
export const getLevelProgress = (user) => {
  if (!user) return { current: 0, target: 1000, percentage: 0 };
  
  let target = 1000;
  let current = user.points;
  
  // Determine target based on current level
  if (user.level === 'Wellness Explorer') {
    target = 2500;
    current = user.points - 1000;
  } else if (user.level === 'Wellness Champion') {
    target = 5000;
    current = user.points - 2500;
  } else if (user.level === 'Wellness Master') {
    target = 10000;
    current = user.points - 5000;
  }
  
  const percentage = Math.min(Math.floor((current / target) * 100), 100);
  
  return {
    current,
    target,
    percentage,
  };
};