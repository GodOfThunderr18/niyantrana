import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plus, X, Watch, Activity, Heart, TrendingUp, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getUserPreferences, getAvailableDevices, connectDevice, disconnectDevice } from '../../services/profileService.jsx';

const ConnectedDevices = () => {
  const { user } = useAuth();
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const prefs = getUserPreferences(user.id);
      setConnectedDevices(prefs.connectedDevices || []);
      setAvailableDevices(getAvailableDevices());
    }
  }, [user]);

  const handleConnectDevice = (deviceId) => {
    if (user?.id) {
      const success = connectDevice(user.id, deviceId);
      if (success) {
        const prefs = getUserPreferences(user.id);
        setConnectedDevices(prefs.connectedDevices || []);
        setShowAddModal(false);
      }
    }
  };

  const handleDisconnectDevice = (deviceId) => {
    if (user?.id) {
      const success = disconnectDevice(user.id, deviceId);
      if (success) {
        const prefs = getUserPreferences(user.id);
        setConnectedDevices(prefs.connectedDevices || []);
      }
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'fitness_tracker':
      case 'smartwatch':
        return <Watch className="w-5 h-5" />;
      case 'glucose_monitor':
        return <Activity className="w-5 h-5" />;
      case 'blood_pressure':
        return <Heart className="w-5 h-5" />;
      case 'smart_scale':
        return <TrendingUp className="w-5 h-5" />;
      case 'sleep_tracker':
        return <Moon className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glassmorphism-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-800">Connected Devices</h3>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary-sm flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      
      {connectedDevices.length === 0 ? (
        <div className="text-center py-8 bg-white/30 rounded-lg">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-2">No devices connected</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            Connect a device
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {connectedDevices.map((device) => (
            <div 
              key={device.id}
              className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{device.name}</div>
                  <div className="text-xs text-gray-500">
                    Connected {new Date(device.connectedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDisconnectDevice(device.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Disconnect device"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add a Device</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableDevices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => handleConnectDevice(device.id)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-800">{device.name}</div>
                      <div className="text-xs text-gray-500">
                        {device.type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <Plus className="w-5 h-5 text-primary-500" />
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ConnectedDevices;