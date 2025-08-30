import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService.jsx';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Get user profile from mock service
          const response = await apiService.user.getProfile();
          setUser(response.data);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.auth.login({ email, password });
      
      // Store tokens
      localStorage.setItem('authToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      // Set user data
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.auth.register(userData);
      
      // Store tokens
      localStorage.setItem('authToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      // Set user data
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await apiService.auth.logout();
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      // Clear local state and storage regardless of API call result
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('niyantrana_user', JSON.stringify(updatedUser));
  };

  const updateFattyLiverIndex = (newScore) => {
    updateUser({ fattyLiverIndex: newScore });
  };

  const addPoints = (points) => {
    const newPoints = user.points + points;
    let newLevel = user.level;
    
    // Simple level progression
    if (newPoints >= 1000 && user.level === 'Wellness Novice') {
      newLevel = 'Wellness Explorer';
    } else if (newPoints >= 2500 && user.level === 'Wellness Explorer') {
      newLevel = 'Wellness Champion';
    } else if (newPoints >= 5000 && user.level === 'Wellness Champion') {
      newLevel = 'Wellness Master';
    }
    
    updateUser({ 
      points: newPoints, 
      level: newLevel 
    });
    
    if (newLevel !== user.level) {
      toast.success(`Congratulations! You've reached ${newLevel}!`);
    }
  };

  const updateStreak = (newStreak) => {
    updateUser({ streak: newStreak });
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.user.updateProfile(profileData);
      
      // Update user data with response
      setUser(response.data);
      
      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    updateProfile,
    updateFattyLiverIndex,
    addPoints,
    updateStreak,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
