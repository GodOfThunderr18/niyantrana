import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, FileText, LogOut, Bell, Palette, Shield, Smartphone, Ruler } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import ThemeSettings from '../components/profile/ThemeSettings.jsx';
import NotificationSettings from '../components/profile/NotificationSettings.jsx';
import ConnectedDevices from '../components/profile/ConnectedDevices.jsx';
import HealthReports from '../components/profile/HealthReports.jsx';
import PrivacySettings from '../components/profile/PrivacySettings.jsx';
import UnitPreferences from '../components/profile/UnitPreferences.jsx';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </motion.div>

      <div className="space-y-6">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism-card p-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-primary-600">{user?.level || 'Wellness Novice'}</p>
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

        {/* Quick Actions - Only shown on profile section */}
        {activeSection === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glassmorphism-card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setActiveSection('reports')}
                className="w-full flex items-center space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
              >
                <FileText className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700">Generate Doctor's Report</span>
              </button>
              <button 
                onClick={() => setActiveSection('notifications')}
                className="w-full flex items-center space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
              >
                <Bell className="w-5 h-5 text-teal-500" />
                <span className="text-gray-700">Notification Settings</span>
              </button>
              <button 
                onClick={() => setActiveSection('theme')}
                className="w-full flex items-center space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
              >
                <Palette className="w-5 h-5 text-accent-500" />
                <span className="text-gray-700">App Theme</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism-card p-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveSection('profile')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'profile' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
            
            <button
              onClick={() => setActiveSection('theme')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'theme' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <Palette className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Theme</span>
            </button>
            
            <button
              onClick={() => setActiveSection('notifications')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'notifications' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <Bell className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Notifications</span>
            </button>
            
            <button
              onClick={() => setActiveSection('devices')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'devices' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <Smartphone className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Devices</span>
            </button>
            
            <button
              onClick={() => setActiveSection('reports')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'reports' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Reports</span>
            </button>
            
            <button
              onClick={() => setActiveSection('privacy')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${activeSection === 'privacy' ? 'bg-primary-50 text-primary-600' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              <Shield className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Privacy</span>
            </button>
          </div>
        </motion.div>
        
        {/* Active Section Content */}
        {activeSection === 'profile' && (
          <>
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism-card p-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-primary-600">{user?.level || 'Wellness Novice'}</p>
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

            {/* Unit Preferences */}
            <UnitPreferences />
          </>
        )}
        
        {activeSection === 'theme' && <ThemeSettings />}
        {activeSection === 'notifications' && <NotificationSettings />}
        {activeSection === 'devices' && <ConnectedDevices />}
        {activeSection === 'reports' && <HealthReports />}
        {activeSection === 'privacy' && <PrivacySettings />}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={logout}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
