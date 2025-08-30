import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Watch, Activity, Heart, Moon, TrendingUp, RefreshCw } from 'lucide-react';
import googleFitService from '../services/googleFitService.jsx';
import toast from 'react-hot-toast';

const GoogleFitWidget = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [fitData, setFitData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    // Check if Google Fit is connected
    const connected = localStorage.getItem('googleFitConnected') === 'true';
    setIsConnected(connected);
    
    if (connected) {
      loadFitnessData();
    }
  }, []);

  const loadFitnessData = async () => {
    setIsLoading(true);
    try {
      const result = await googleFitService.getTodaysSummary();
      
      if (result.success) {
        setFitData(result.data);
        setLastSync(new Date());
      } else {
        console.error('Failed to load fitness data:', result.error);
        // If authentication failed, mark as disconnected
        if (result.error.includes('not authenticated')) {
          setIsConnected(false);
          localStorage.removeItem('googleFitConnected');
          localStorage.removeItem('googleFitUser');
        }
      }
    } catch (error) {
      console.error('Error loading fitness data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const result = await googleFitService.authenticate();
      
      if (result.success) {
        toast.success('Successfully connected to Google Fit!');
        localStorage.setItem('googleFitConnected', 'true');
        localStorage.setItem('googleFitUser', JSON.stringify(result.user));
        setIsConnected(true);
        await loadFitnessData();
      } else {
        toast.error(result.error || 'Failed to connect to Google Fit');
      }
    } catch (error) {
      console.error('Google Fit connection error:', error);
      toast.error('Failed to connect to Google Fit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await googleFitService.disconnect();
      localStorage.removeItem('googleFitConnected');
      localStorage.removeItem('googleFitUser');
      setIsConnected(false);
      setFitData(null);
      toast.success('Disconnected from Google Fit');
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast.error('Failed to disconnect from Google Fit');
    }
  };

  const calculateTotalSteps = () => {
    if (!fitData?.steps) return 0;
    return fitData.steps.reduce((total, entry) => total + entry.steps, 0);
  };

  const calculateAverageHeartRate = () => {
    if (!fitData?.heartRate || fitData.heartRate.length === 0) return 0;
    const total = fitData.heartRate.reduce((sum, entry) => sum + entry.heartRate, 0);
    return Math.round(total / fitData.heartRate.length);
  };

  const getActivityDuration = () => {
    if (!fitData?.activities) return 0;
    return fitData.activities.reduce((total, activity) => total + activity.duration, 0);
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-login p-6 mb-6 shadow-glow relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <Watch className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Wearable Device</h3>
              <p className="text-sm text-gray-600">Not connected</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 relative z-10">
          Connect your smartwatch or fitness tracker to automatically sync your health data.
        </p>
        
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2 relative z-10"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Watch className="w-4 h-4" />
              <span>Connect Google Fit</span>
            </>
          )}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-login p-6 mb-6 shadow-glow relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Watch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Google Fit</h3>
            <p className="text-sm text-green-600">Connected</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={loadFitnessData}
            disabled={isLoading}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDisconnect}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>

      {fitData ? (
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <motion.div 
            className="bg-white/50 backdrop-blur-md rounded-xl p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{calculateTotalSteps().toLocaleString()}</div>
            <div className="text-sm text-gray-600">Steps Today</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/50 backdrop-blur-md rounded-xl p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{calculateAverageHeartRate()}</div>
            <div className="text-sm text-gray-600">Avg Heart Rate</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/50 backdrop-blur-md rounded-xl p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{formatDuration(getActivityDuration())}</div>
            <div className="text-sm text-gray-600">Active Time</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/50 backdrop-blur-md rounded-xl p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Moon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">--</div>
            <div className="text-sm text-gray-600">Sleep Score</div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-8 relative z-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fitness data...</p>
        </div>
      )}
      
      {lastSync && (
        <div className="text-xs text-gray-500 mt-4 text-center relative z-10">
          Last synced: {lastSync.toLocaleTimeString()}
        </div>
      )}
    </motion.div>
  );
};

export default GoogleFitWidget;