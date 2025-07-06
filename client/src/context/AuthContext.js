// Authentication context for user state and login/logout
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider manages user state and provides login/logout
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object
  const [loading, setLoading] = useState(true); // Loading state
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Check auth status on mount or token change
  useEffect(() => {
    if (token) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Check if token is valid and get user info
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    logout
  };

  // Provide context to children
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 