import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('summerpep_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialUsers[0]; // Default: Participant Alex Chen
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('summerpep_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('summerpep_auth_user');
    }
  }, [currentUser]);

  const switchRole = (targetRole) => {
    const matchedUser = initialUsers.find(u => u.role === targetRole) || {
      id: `usr_${Date.now()}`,
      name: `Demo ${targetRole.toUpperCase()}`,
      email: `${targetRole}@summerpep.io`,
      role: targetRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      title: `${targetRole.toUpperCase()} Account`,
      bio: 'Demo mode user account.'
    };
    setCurrentUser(matchedUser);
    toast.success(`Switched role to ${targetRole.toUpperCase()} (${matchedUser.name})`);
  };

  const login = (email, password) => {
    const found = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      toast.success(`Welcome back, ${found.name}!`);
      return true;
    } else {
      // Create guest user
      const guest = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'participant',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        title: 'Developer',
        registeredHackathons: []
      };
      setCurrentUser(guest);
      toast.success(`Logged in as ${guest.name}`);
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
    toast.success('Profile updated!');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      switchRole,
      login,
      logout,
      updateProfile,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
