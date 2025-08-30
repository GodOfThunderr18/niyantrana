import { toast } from 'react-hot-toast';

// Mock user preferences data
const defaultPreferences = {
  theme: 'light',
  notifications: {
    dailyReminders: true,
    weeklyReports: true,
    achievementAlerts: true,
    mealReminders: true,
    medicationReminders: false,
    activitySuggestions: true
  },
  privacy: {
    shareDataWithDoctors: true,
    anonymousDataForResearch: true,
    showProfileInCommunity: false
  },
  units: {
    weight: 'kg',
    height: 'cm',
    glucose: 'mg/dL',
    temperature: 'celsius'
  },
  accessibility: {
    highContrast: false,
    largerText: false,
    reduceMotion: false
  },
  connectedDevices: []
};

// Mock health data for reports
const mockHealthData = {
  recentVitals: [
    { date: '2023-06-01', bloodPressure: '120/80', heartRate: 72, bloodGlucose: 95 },
    { date: '2023-06-08', bloodPressure: '118/78', heartRate: 70, bloodGlucose: 92 },
    { date: '2023-06-15', bloodPressure: '122/82', heartRate: 74, bloodGlucose: 98 },
    { date: '2023-06-22', bloodPressure: '119/79', heartRate: 71, bloodGlucose: 94 }
  ],
  medications: [
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
  ],
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Type 2 Diabetes', 'Hypertension']
};

// Mock devices that can be connected
const availableDevices = [
  { id: 'fitbit1', name: 'Fitbit Sense', type: 'fitness_tracker', icon: 'watch' },
  { id: 'apple_watch', name: 'Apple Watch', type: 'smartwatch', icon: 'watch' },
  { id: 'glucose_monitor', name: 'Dexcom G6', type: 'glucose_monitor', icon: 'activity' },
  { id: 'bp_monitor', name: 'Omron BP Monitor', type: 'blood_pressure', icon: 'heart' },
  { id: 'scale1', name: 'Withings Body+', type: 'smart_scale', icon: 'trending-up' },
  { id: 'oura1', name: 'Oura Ring', type: 'sleep_tracker', icon: 'moon' }
];

// Get user preferences (from localStorage in this mock implementation)
export const getUserPreferences = (userId) => {
  try {
    const savedPrefs = localStorage.getItem(`niyantrana_prefs_${userId}`);
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return defaultPreferences;
  }
};

// Save user preferences
export const saveUserPreferences = (userId, preferences) => {
  try {
    localStorage.setItem(`niyantrana_prefs_${userId}`, JSON.stringify(preferences));
    toast.success('Preferences saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    toast.error('Failed to save preferences');
    return false;
  }
};

// Update a specific preference category
export const updatePreferenceCategory = (userId, category, values) => {
  try {
    const currentPrefs = getUserPreferences(userId);
    const updatedPrefs = {
      ...currentPrefs,
      [category]: {
        ...currentPrefs[category],
        ...values
      }
    };
    return saveUserPreferences(userId, updatedPrefs);
  } catch (error) {
    console.error(`Error updating ${category} preferences:`, error);
    toast.error(`Failed to update ${category} settings`);
    return false;
  }
};

// Get available devices for connection
export const getAvailableDevices = () => {
  return availableDevices;
};

// Connect a new device
export const connectDevice = (userId, deviceId) => {
  try {
    const device = availableDevices.find(d => d.id === deviceId);
    if (!device) {
      toast.error('Device not found');
      return false;
    }
    
    const prefs = getUserPreferences(userId);
    const connectedDevices = prefs.connectedDevices || [];
    
    // Check if device is already connected
    if (connectedDevices.some(d => d.id === deviceId)) {
      toast.error('Device already connected');
      return false;
    }
    
    // Add device with connected timestamp
    const updatedDevices = [
      ...connectedDevices,
      { ...device, connectedAt: new Date().toISOString() }
    ];
    
    const updatedPrefs = {
      ...prefs,
      connectedDevices: updatedDevices
    };
    
    saveUserPreferences(userId, updatedPrefs);
    toast.success(`${device.name} connected successfully`);
    return true;
  } catch (error) {
    console.error('Error connecting device:', error);
    toast.error('Failed to connect device');
    return false;
  }
};

// Disconnect a device
export const disconnectDevice = (userId, deviceId) => {
  try {
    const prefs = getUserPreferences(userId);
    const connectedDevices = prefs.connectedDevices || [];
    
    const updatedDevices = connectedDevices.filter(d => d.id !== deviceId);
    
    const updatedPrefs = {
      ...prefs,
      connectedDevices: updatedDevices
    };
    
    saveUserPreferences(userId, updatedPrefs);
    toast.success('Device disconnected');
    return true;
  } catch (error) {
    console.error('Error disconnecting device:', error);
    toast.error('Failed to disconnect device');
    return false;
  }
};

// Generate a doctor's report with user health data
export const generateDoctorsReport = (userId) => {
  // In a real app, this would compile actual user data
  // For now, we'll return mock data
  return {
    patientId: userId,
    generatedAt: new Date().toISOString(),
    data: mockHealthData
  };
};

// Get theme settings
export const getThemeSettings = (userId) => {
  const prefs = getUserPreferences(userId);
  return {
    theme: prefs.theme || 'light',
    accessibility: prefs.accessibility || defaultPreferences.accessibility
  };
};

// Update theme
export const updateTheme = (userId, theme) => {
  return updatePreferenceCategory(userId, 'theme', theme);
};

// Get notification settings
export const getNotificationSettings = (userId) => {
  const prefs = getUserPreferences(userId);
  return prefs.notifications || defaultPreferences.notifications;
};