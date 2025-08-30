import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Trophy, Users, User, MessageCircle, Plus } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext.jsx';

const Navigation = () => {
  const location = useLocation();
  // const { user } = useAuth();

  const navItems = [
    {
      path: '/dashboard',
      icon: Home,
      label: 'Dashboard',
      color: 'text-primary-600'
    },
    {
      path: '/logging',
      icon: Plus,
      label: 'Logging',
      color: 'text-green-600'
    },
    {
      path: '/trends',
      icon: TrendingUp,
      label: 'Trends',
      color: 'text-teal-600'
    },
    {
      path: '/wellness-journey',
      icon: Trophy,
      label: 'Journey',
      color: 'text-accent-600'
    },
    {
      path: '/community',
      icon: Users,
      label: 'Community',
      color: 'text-secondary-600'
    },
    {
      path: '/profile',
      icon: User,
      label: 'Profile',
      color: 'text-gray-600'
    }
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-t border-slate-200/70 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-colors duration-200 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? item.color : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-current rounded-full"
                      style={{ color: 'inherit' }}
                    />
                  )}
                </motion.div>
                <span className={`text-xs font-medium transition-colors duration-200 ${
                  isActive ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'
                }`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button for Quick Logging */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 left-6 z-40 w-14 h-14 bg-primary-600 hover:bg-primary-700 rounded-full shadow-card transition-colors duration-200 flex items-center justify-center text-white md:hidden"
        onClick={() => window.location.href = '/logging'}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Chatbot Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-secondary-600 hover:bg-secondary-700 rounded-full shadow-card transition-colors duration-200 flex items-center justify-center text-white md:hidden"
        onClick={() => window.location.href = '/chatbot'}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default Navigation;
