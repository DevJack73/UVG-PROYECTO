import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const current = await api.getCurrentUser();
        if (current) {
          setUser(current);
        } else {
          // Default demo user: Donor
          const defaultDonor = await api.switchDemoUser('donor');
          setUser(defaultDonor);
        }
      } catch (err) {
        console.error('Error loading current user', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    setUser(res.user);
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await api.logout();
    const guest = await api.switchDemoUser('donor');
    setUser(guest);
  };

  const switchRole = async (role) => {
    const switched = await api.switchDemoUser(role);
    setUser(switched);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    switchRole,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'campaign_manager' || user?.role === 'admin',
    isVolunteer: user?.role === 'volunteer' || user?.role === 'admin' || user?.role === 'campaign_manager',
    isDonor: user?.role === 'donor'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
