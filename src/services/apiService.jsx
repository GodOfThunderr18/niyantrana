// Mock API Service for Frontend-Only Operation
// This service provides mock implementations of all API calls using localStorage

// Helper function to simulate API delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate mock responses
const createMockResponse = (data, message = 'Operation successful') => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

// Helper function to get current user from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('niyantrana_user') || 'null');
};

// Helper function to save user to localStorage
const saveUser = (user) => {
  localStorage.setItem('niyantrana_user', JSON.stringify(user));
};

// Mock user data
const generateMockUser = (email, profile = {}) => ({
  id: Date.now().toString(),
  email,
  profile: {
    firstName: profile.firstName || 'John',
    lastName: profile.lastName || 'Doe',
    dateOfBirth: profile.dateOfBirth || '1990-01-01',
    gender: profile.gender || 'male',
    height: profile.height || 175,
    ...profile
  },
  preferences: {
    units: 'metric',
    notifications: true,
    privacy: 'private'
  },
  fattyLiverIndex: 75,
  points: 1250,
  streak: 7,
  level: 3,
  createdAt: new Date().toISOString(),
  token: 'mock_jwt_token_' + Date.now()
});

// Authentication API - Mock Implementation
export const authAPI = {
  register: async (userData) => {
    await simulateDelay();
    const user = generateMockUser(userData.email, userData.profile);
    saveUser(user);
    return createMockResponse({ user, token: user.token }, 'Registration successful');
  },
  
  login: async (credentials) => {
    await simulateDelay();
    // Simple mock validation - accept any email/password combination
    const user = generateMockUser(credentials.email);
    saveUser(user);
    return createMockResponse({ user, token: user.token }, 'Login successful');
  },
  
  logout: async () => {
    await simulateDelay();
    localStorage.removeItem('niyantrana_user');
    return createMockResponse({}, 'Logout successful');
  },
  
  refreshToken: async () => {
    await simulateDelay();
    const user = getCurrentUser();
    if (user) {
      user.token = 'mock_jwt_token_' + Date.now();
      saveUser(user);
      return createMockResponse({ token: user.token }, 'Token refreshed');
    }
    throw new Error('No user found');
  },
  
  forgotPassword: async (email) => {
    await simulateDelay();
    return createMockResponse({}, 'Password reset email sent');
  },
  
  resetPassword: async (token, password) => {
    await simulateDelay();
    return createMockResponse({}, 'Password reset successful');
  },
  
  changePassword: async (passwords) => {
    await simulateDelay();
    return createMockResponse({}, 'Password changed successfully');
  },
  
  getProfile: async () => {
    await simulateDelay();
    const user = getCurrentUser();
    if (user) {
      return createMockResponse({ user }, 'Profile retrieved');
    }
    throw new Error('User not authenticated');
  },
};

// User API - Mock Implementation
export const userAPI = {
  getProfile: async () => {
    await simulateDelay();
    const user = getCurrentUser();
    if (user) {
      return createMockResponse({ user }, 'Profile retrieved');
    }
    throw new Error('User not authenticated');
  },
  
  updateProfile: async (profileData) => {
    await simulateDelay();
    const user = getCurrentUser();
    if (user) {
      user.profile = { ...user.profile, ...profileData };
      saveUser(user);
      return createMockResponse({ user }, 'Profile updated successfully');
    }
    throw new Error('User not authenticated');
  },
  
  getHealthData: async (params) => {
    await simulateDelay();
    const healthData = JSON.parse(localStorage.getItem('health_data') || '[]');
    return createMockResponse(healthData, 'Health data retrieved');
  },
  
  addHealthData: async (healthData) => {
    await simulateDelay();
    const existingData = JSON.parse(localStorage.getItem('health_data') || '[]');
    const newEntry = { ...healthData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    existingData.push(newEntry);
    localStorage.setItem('health_data', JSON.stringify(existingData));
    return createMockResponse(newEntry, 'Health data added successfully');
  },
  
  deleteHealthData: async (id) => {
    await simulateDelay();
    const existingData = JSON.parse(localStorage.getItem('health_data') || '[]');
    const filteredData = existingData.filter(item => item.id !== id);
    localStorage.setItem('health_data', JSON.stringify(filteredData));
    return createMockResponse({}, 'Health data deleted successfully');
  },
  
  getHealthSummary: async () => {
    await simulateDelay();
    const mockSummary = {
      totalEntries: 45,
      lastEntry: new Date().toISOString(),
      avgWeight: 70.5,
      avgBloodPressure: { systolic: 120, diastolic: 80 },
      avgHeartRate: 72
    };
    return createMockResponse(mockSummary, 'Health summary retrieved');
  },
  
  getRiskAssessments: async () => {
    await simulateDelay();
    const mockAssessments = [
      { id: '1', type: 'NAFLD', score: 0.25, risk: 'Low', date: new Date().toISOString() },
      { id: '2', type: 'Diabetes', score: 0.15, risk: 'Low', date: new Date().toISOString() }
    ];
    return createMockResponse(mockAssessments, 'Risk assessments retrieved');
  },
  
  getLatestRiskAssessment: async () => {
    await simulateDelay();
    const mockAssessment = { id: '1', type: 'NAFLD', score: 0.25, risk: 'Low', date: new Date().toISOString() };
    return createMockResponse(mockAssessment, 'Latest risk assessment retrieved');
  },
  
  getDashboard: async () => {
    await simulateDelay();
    const user = getCurrentUser();
    const mockDashboard = {
      fattyLiverIndex: user?.fattyLiverIndex || 75,
      dailyFocus: 'Stay hydrated and maintain regular meal times',
      recentActivities: 3,
      weeklyGoals: { completed: 4, total: 7 },
      insights: ['Your sleep pattern has improved', 'Consider increasing fiber intake']
    };
    return createMockResponse(mockDashboard, 'Dashboard data retrieved');
  },
  
  updatePreferences: async (preferences) => {
    await simulateDelay();
    const user = getCurrentUser();
    if (user) {
      user.preferences = { ...user.preferences, ...preferences };
      saveUser(user);
      return createMockResponse({ preferences: user.preferences }, 'Preferences updated successfully');
    }
    throw new Error('User not authenticated');
  },
};

// Health Data API - Mock Implementation
export const healthAPI = {
  addVitals: async (vitalsData) => {
    await simulateDelay();
    const vitals = JSON.parse(localStorage.getItem('vitals_data') || '[]');
    const newVital = { ...vitalsData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    vitals.push(newVital);
    localStorage.setItem('vitals_data', JSON.stringify(vitals));
    return createMockResponse(newVital, 'Vitals added successfully');
  },
  
  addLabResults: async (labData) => {
    await simulateDelay();
    const labs = JSON.parse(localStorage.getItem('lab_data') || '[]');
    const newLab = { ...labData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    labs.push(newLab);
    localStorage.setItem('lab_data', JSON.stringify(labs));
    return createMockResponse(newLab, 'Lab results added successfully');
  },
  
  addMeal: async (mealData) => {
    await simulateDelay();
    const meals = JSON.parse(localStorage.getItem('meal_data') || '[]');
    const newMeal = { ...mealData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    meals.push(newMeal);
    localStorage.setItem('meal_data', JSON.stringify(meals));
    return createMockResponse(newMeal, 'Meal added successfully');
  },
  
  addActivity: async (activityData) => {
    await simulateDelay();
    const activities = JSON.parse(localStorage.getItem('activity_data') || '[]');
    const newActivity = { ...activityData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    activities.push(newActivity);
    localStorage.setItem('activity_data', JSON.stringify(activities));
    return createMockResponse(newActivity, 'Activity added successfully');
  },
  
  addSymptoms: async (symptomsData) => {
    await simulateDelay();
    const symptoms = JSON.parse(localStorage.getItem('symptoms_data') || '[]');
    const newSymptom = { ...symptomsData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    symptoms.push(newSymptom);
    localStorage.setItem('symptoms_data', JSON.stringify(symptoms));
    return createMockResponse(newSymptom, 'Symptoms added successfully');
  },
  
  addMedication: async (medicationData) => {
    await simulateDelay();
    const medications = JSON.parse(localStorage.getItem('medication_data') || '[]');
    const newMedication = { ...medicationData, id: Date.now().toString(), timestamp: new Date().toISOString() };
    medications.push(newMedication);
    localStorage.setItem('medication_data', JSON.stringify(medications));
    return createMockResponse(newMedication, 'Medication added successfully');
  },
  
  getTrends: async (params) => {
    await simulateDelay();
    const mockTrends = {
      weight: [{ date: '2024-01-01', value: 70 }, { date: '2024-01-02', value: 69.8 }],
      bloodPressure: [{ date: '2024-01-01', systolic: 120, diastolic: 80 }],
      heartRate: [{ date: '2024-01-01', value: 72 }]
    };
    return createMockResponse(mockTrends, 'Trends retrieved');
  },
  
  getLatestVitals: async () => {
    await simulateDelay();
    const vitals = JSON.parse(localStorage.getItem('vitals_data') || '[]');
    const latest = vitals[vitals.length - 1] || { weight: 70, bloodPressure: { systolic: 120, diastolic: 80 }, heartRate: 72 };
    return createMockResponse(latest, 'Latest vitals retrieved');
  },
  
  getNutritionSummary: async (params) => {
    await simulateDelay();
    const mockSummary = {
      totalCalories: 2150,
      protein: 85,
      carbs: 250,
      fat: 75,
      fiber: 25
    };
    return createMockResponse(mockSummary, 'Nutrition summary retrieved');
  },
  
  getActivitySummary: async (params) => {
    await simulateDelay();
    const mockSummary = {
      totalSteps: 8500,
      caloriesBurned: 350,
      activeMinutes: 45,
      exerciseMinutes: 30
    };
    return createMockResponse(mockSummary, 'Activity summary retrieved');
  },
  
  updateHealthData: async (id, data) => {
    await simulateDelay();
    // Update data in localStorage based on type
    const dataTypes = ['vitals_data', 'meal_data', 'activity_data', 'symptoms_data', 'medication_data'];
    for (const type of dataTypes) {
      const items = JSON.parse(localStorage.getItem(type) || '[]');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...data };
        localStorage.setItem(type, JSON.stringify(items));
        return createMockResponse(items[index], 'Health data updated successfully');
      }
    }
    throw new Error('Health data not found');
  },
};

// Risk Assessment API - Mock Implementation
export const assessmentAPI = {
  createAssessment: async (assessmentData) => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const newAssessment = {
      ...assessmentData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    };
    assessments.push(newAssessment);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    return createMockResponse(newAssessment, 'Assessment created successfully');
  },
  
  getAssessments: async (params) => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    return createMockResponse(assessments, 'Assessments retrieved');
  },
  
  getAssessmentById: async (id) => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const assessment = assessments.find(a => a.id === id);
    if (!assessment) throw new Error('Assessment not found');
    return createMockResponse(assessment, 'Assessment retrieved');
  },
  
  updateAssessment: async (id, data) => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const index = assessments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Assessment not found');
    assessments[index] = { ...assessments[index], ...data };
    localStorage.setItem('assessments', JSON.stringify(assessments));
    return createMockResponse(assessments[index], 'Assessment updated successfully');
  },
  
  deleteAssessment: async (id) => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const filteredAssessments = assessments.filter(a => a.id !== id);
    localStorage.setItem('assessments', JSON.stringify(filteredAssessments));
    return createMockResponse(null, 'Assessment deleted successfully');
  },
  
  getLatestAssessment: async () => {
    await simulateDelay();
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const latest = assessments[assessments.length - 1] || {
      id: '1',
      riskScore: 25,
      riskLevel: 'Low',
      timestamp: new Date().toISOString()
    };
    return createMockResponse(latest, 'Latest assessment retrieved');
  },
  
  getRiskFactors: async () => {
    await simulateDelay();
    const mockRiskFactors = [
      { factor: 'Age', weight: 0.2, value: 'Medium' },
      { factor: 'BMI', weight: 0.3, value: 'Normal' },
      { factor: 'Blood Pressure', weight: 0.25, value: 'Normal' },
      { factor: 'Family History', weight: 0.15, value: 'Low' },
      { factor: 'Lifestyle', weight: 0.1, value: 'Good' }
    ];
    return createMockResponse(mockRiskFactors, 'Risk factors retrieved');
  },
  
  getRecommendations: async (assessmentId) => {
    await simulateDelay();
    const mockRecommendations = [
      { category: 'Exercise', recommendation: 'Increase cardio activity to 150 minutes per week', priority: 'High' },
      { category: 'Diet', recommendation: 'Reduce sodium intake to less than 2300mg daily', priority: 'Medium' },
      { category: 'Sleep', recommendation: 'Maintain 7-9 hours of sleep per night', priority: 'Medium' },
      { category: 'Stress', recommendation: 'Practice stress management techniques', priority: 'Low' }
    ];
    return createMockResponse(mockRecommendations, 'Recommendations retrieved');
  },
};

// ML API - Mock Implementation
export const mlAPI = {
  assessRisk: async (riskData) => {
    await simulateDelay();
    const mockAssessment = {
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      confidence: Math.random() * 0.4 + 0.6,
      factors: [
        { name: 'Age', impact: Math.random() * 0.3 },
        { name: 'BMI', impact: Math.random() * 0.4 },
        { name: 'Blood Pressure', impact: Math.random() * 0.3 }
      ]
    };
    return createMockResponse(mockAssessment, 'Risk assessment completed');
  },
  
  getModelInfo: async () => {
    await simulateDelay();
    const mockModelInfo = {
      version: '2.1.0',
      accuracy: 0.89,
      lastTrained: new Date().toISOString(),
      features: ['age', 'bmi', 'bloodPressure', 'lifestyle', 'familyHistory']
    };
    return createMockResponse(mockModelInfo, 'Model info retrieved');
  },
  
  batchAssess: async (batchData) => {
    await simulateDelay(1500); // Longer delay for batch processing
    const mockBatchResults = batchData.map((item, index) => ({
      id: item.id || index.toString(),
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      confidence: Math.random() * 0.4 + 0.6
    }));
    return createMockResponse(mockBatchResults, 'Batch assessment completed');
  },
};

// Chat API - Mock Implementation
export const chatAPI = {
  sendMessage: async (messageData) => {
    await simulateDelay(1000); // Simulate thinking time
    const mockResponses = [
      "Based on your health data, I recommend focusing on cardiovascular exercise.",
      "Your recent vitals look good! Keep up the healthy lifestyle.",
      "Consider consulting with a healthcare provider about your symptoms.",
      "Here are some personalized nutrition tips based on your profile.",
      "Your risk assessment shows low risk. Continue your current health routine."
    ];
    const mockResponse = {
      id: Date.now().toString(),
      message: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      timestamp: new Date().toISOString(),
      type: 'ai_response'
    };
    
    // Store in chat history
    const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '[]');
    chatHistory.push(messageData, mockResponse);
    localStorage.setItem('chat_history', JSON.stringify(chatHistory));
    
    return createMockResponse(mockResponse, 'Message sent successfully');
  },
  
  getSessions: async (params) => {
    await simulateDelay();
    const sessions = JSON.parse(localStorage.getItem('chat_sessions') || '[]');
    return createMockResponse(sessions, 'Chat sessions retrieved');
  },
  
  getSession: async (sessionId) => {
    await simulateDelay();
    const sessions = JSON.parse(localStorage.getItem('chat_sessions') || '[]');
    const session = sessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');
    return createMockResponse(session, 'Session retrieved');
  },
  
  updateSession: async (sessionId, data) => {
    await simulateDelay();
    const sessions = JSON.parse(localStorage.getItem('chat_sessions') || '[]');
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index === -1) throw new Error('Session not found');
    sessions[index] = { ...sessions[index], ...data };
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
    return createMockResponse(sessions[index], 'Session updated');
  },
  
  deleteSession: async (sessionId) => {
    await simulateDelay();
    const sessions = JSON.parse(localStorage.getItem('chat_sessions') || '[]');
    const filteredSessions = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('chat_sessions', JSON.stringify(filteredSessions));
    return createMockResponse(null, 'Session deleted');
  },
  
  sendFeedback: async (feedbackData) => {
    await simulateDelay();
    const feedback = JSON.parse(localStorage.getItem('chat_feedback') || '[]');
    const newFeedback = {
      ...feedbackData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    feedback.push(newFeedback);
    localStorage.setItem('chat_feedback', JSON.stringify(feedback));
    return createMockResponse(newFeedback, 'Feedback sent');
  },
  
  getSuggestions: async () => {
    await simulateDelay();
    const mockSuggestions = [
      "How can I improve my cardiovascular health?",
      "What are the symptoms of NAFLD?",
      "Can you analyze my recent lab results?",
      "What exercises are best for my condition?",
      "How can I reduce my risk factors?"
    ];
    return createMockResponse(mockSuggestions, 'Suggestions retrieved');
  },
  
  getAnalytics: async (params) => {
    await simulateDelay();
    const mockAnalytics = {
      totalMessages: 156,
      avgResponseTime: 2.3,
      userSatisfaction: 4.2,
      topTopics: ['Health Tips', 'Risk Assessment', 'Nutrition']
    };
    return createMockResponse(mockAnalytics, 'Analytics retrieved');
  },
  
  getWellnessCoach: async (coachData) => {
    await simulateDelay(1500);
    const mockCoachResponse = {
      recommendation: "Based on your profile, I suggest a balanced approach focusing on nutrition and moderate exercise.",
      plan: {
        exercise: "30 minutes of walking daily",
        nutrition: "Increase fiber intake and reduce processed foods",
        lifestyle: "Maintain regular sleep schedule"
      },
      nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    return createMockResponse(mockCoachResponse, 'Wellness coaching completed');
  },
  
  getRagStats: async () => {
    await simulateDelay();
    const mockRagStats = {
      documentsIndexed: 1250,
      lastUpdate: new Date().toISOString(),
      accuracy: 0.92,
      avgRetrievalTime: 0.15
    };
    return createMockResponse(mockRagStats, 'RAG stats retrieved');
  },
};

// Health Check API - Mock Implementation
export const healthCheckAPI = {
  ping: async () => {
    await simulateDelay(100);
    return createMockResponse({ status: 'ok', timestamp: new Date().toISOString() }, 'Ping successful');
  },
  
  getStats: async () => {
    await simulateDelay();
    const mockStats = {
      totalUsers: 1250,
      activeUsers: 890,
      totalAssessments: 3420,
      avgRiskScore: 42.5,
      systemHealth: 'good'
    };
    return createMockResponse(mockStats, 'Stats retrieved');
  },
  
  status: async () => {
    await simulateDelay();
    const mockStatus = {
      status: 'healthy',
      version: '1.0.0',
      uptime: Math.floor(Math.random() * 86400),
      services: {
        database: 'connected',
        cache: 'connected',
        ml_service: 'connected'
      }
    };
    return createMockResponse(mockStatus, 'Status retrieved');
  },
  
  metrics: async () => {
    await simulateDelay();
    const mockMetrics = {
      requests_per_minute: Math.floor(Math.random() * 100),
      avg_response_time: Math.random() * 200 + 50,
      error_rate: Math.random() * 0.05,
      memory_usage: Math.random() * 0.3 + 0.4,
      cpu_usage: Math.random() * 0.5 + 0.2
    };
    return createMockResponse(mockMetrics, 'Metrics retrieved');
  },
};

// File Upload API - Mock Implementation
export const uploadAPI = {
  uploadProfileImage: async (file) => {
    await simulateDelay(1000);
    const mockImageUrl = `https://mock-storage.com/profiles/${Date.now()}_${file.name}`;
    const uploadResult = {
      url: mockImageUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
    
    // Store in localStorage for persistence
    const user = getCurrentUser();
    if (user) {
      user.profile.profileImage = mockImageUrl;
      saveUser(user);
    }
    
    return createMockResponse(uploadResult, 'Profile image uploaded successfully');
  },
  
  uploadHealthDocument: async (file) => {
    await simulateDelay(1500);
    const mockDocumentUrl = `https://mock-storage.com/documents/${Date.now()}_${file.name}`;
    const uploadResult = {
      id: Date.now().toString(),
      url: mockDocumentUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      category: 'health_document',
      uploadedAt: new Date().toISOString()
    };
    
    // Store in localStorage
    const documents = JSON.parse(localStorage.getItem('health_documents') || '[]');
    documents.push(uploadResult);
    localStorage.setItem('health_documents', JSON.stringify(documents));
    
    return createMockResponse(uploadResult, 'Health document uploaded successfully');
  },
  
  uploadLabReport: async (file) => {
    await simulateDelay(2000);
    const mockReportUrl = `https://mock-storage.com/lab-reports/${Date.now()}_${file.name}`;
    const uploadResult = {
      id: Date.now().toString(),
      url: mockReportUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      category: 'lab_report',
      uploadedAt: new Date().toISOString(),
      processed: true,
      extractedData: {
        cholesterol: Math.floor(Math.random() * 100) + 150,
        glucose: Math.floor(Math.random() * 50) + 80,
        hemoglobin: Math.random() * 3 + 12
      }
    };
    
    // Store in localStorage
    const labReports = JSON.parse(localStorage.getItem('lab_reports') || '[]');
    labReports.push(uploadResult);
    localStorage.setItem('lab_reports', JSON.stringify(labReports));
    
    return createMockResponse(uploadResult, 'Lab report uploaded and processed successfully');
  },
  
  getDocuments: async (params) => {
    await simulateDelay();
    const documents = JSON.parse(localStorage.getItem('health_documents') || '[]');
    const labReports = JSON.parse(localStorage.getItem('lab_reports') || '[]');
    const allDocuments = [...documents, ...labReports];
    return createMockResponse(allDocuments, 'Documents retrieved successfully');
  },
  
  deleteDocument: async (documentId) => {
    await simulateDelay();
    const documents = JSON.parse(localStorage.getItem('health_documents') || '[]');
    const labReports = JSON.parse(localStorage.getItem('lab_reports') || '[]');
    
    const filteredDocuments = documents.filter(doc => doc.id !== documentId);
    const filteredReports = labReports.filter(report => report.id !== documentId);
    
    localStorage.setItem('health_documents', JSON.stringify(filteredDocuments));
    localStorage.setItem('lab_reports', JSON.stringify(filteredReports));
    
    return createMockResponse(null, 'Document deleted successfully');
  },
};

// Utility functions
export const apiUtils = {
  // Check if backend is available
  checkConnection: async () => {
    try {
      await healthCheckAPI.ping();
      return { connected: true, message: 'Backend connection successful' };
    } catch (error) {
      return { connected: false, message: 'Backend connection failed', error };
    }
  },

  // Handle API errors consistently
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        type: 'server_error',
        status: error.response.status,
        message: error.response.data?.message || 'Server error occurred',
        details: error.response.data,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        type: 'network_error',
        message: 'Network error - please check your connection',
        details: error.request,
      };
    } else {
      // Something else happened
      return {
        type: 'unknown_error',
        message: error.message || 'An unexpected error occurred',
        details: error,
      };
    }
  },

  // Format API responses consistently
  formatResponse: (response) => {
    return {
      success: true,
      data: response.data || response,
      message: response.message || 'Operation successful',
      timestamp: new Date().toISOString(),
    };
  },
};

// Combined API service object
const apiService = {
  auth: authAPI,
  user: userAPI,
  health: healthAPI,
  assessment: assessmentAPI,
  ml: mlAPI,
  chat: chatAPI,
  healthCheck: healthCheckAPI,
  upload: uploadAPI,
  utils: apiUtils,
  client: null // Mock implementation doesn't use apiClient
};

// Export default API service
export default apiService;

// Also export the raw client for custom requests
// apiClient not needed in mock implementation