import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('summerpep_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem('summerpep_token') || null);
  const [loading, setLoading] = useState(false);

  // Persist user & token
  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('summerpep_user', JSON.stringify(currentUser));
      localStorage.setItem('summerpep_token', token);
    } else {
      localStorage.removeItem('summerpep_user');
      localStorage.removeItem('summerpep_token');
    }
  }, [currentUser, token]);

  // ─── Real API signup (does NOT auto-login) ─────────────────────────────
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', formData);
      if (res.data.success) {
        toast.success(`Account created for ${res.data.user.fullName}! Please log in.`);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // ─── Real API login ───────────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setCurrentUser(res.data.user);
        setToken(res.data.token);
        toast.success(res.data.message);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    toast.success('You have been signed out.');
  };

  // ─── Update profile locally ───────────────────────────────────────────────
  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    toast.success('Profile updated!');
  };

  // ─── Demo role switcher (for development/demo only) ───────────────────────
  const switchRole = (targetRole) => {
    const demoUsers = {
      participant: { id: 'demo_1', fullName: 'Alex Chen', email: 'alex.chen@hackverse.io', role: 'participant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
      organizer:   { id: 'demo_2', fullName: 'Sarah Jenkins', email: 'sarah.j@techforge.org', role: 'organizer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80' },
      judge:       { id: 'demo_3', fullName: 'Dr. Aris Thorne', email: 'aris.thorne@ai-lab.edu', role: 'judge', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
      admin:       { id: 'demo_4', fullName: 'Marcus Vance', email: 'admin@summerpep.io', role: 'admin', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80' },
    };
    const demoUser = demoUsers[targetRole] || demoUsers.participant;
    setCurrentUser(demoUser);
    setToken('demo_token_' + targetRole);
    toast.success(`Switched to ${targetRole.toUpperCase()} demo (${demoUser.fullName})`);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      loading,
      isAuthenticated: !!currentUser,
      signup,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
