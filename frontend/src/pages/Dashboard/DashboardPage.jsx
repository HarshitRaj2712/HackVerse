import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Universal /dashboard route.
 * Redirects the logged in user to their specific dashboard based on their role:
 * - admin ➔ /admin
 * - organizer ➔ /organizer
 * - judge ➔ /judge
 * - participant ➔ /participant
 */
export const DashboardPage = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = currentUser?.role;

  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'organizer') return <Navigate to="/organizer" replace />;
  if (role === 'judge') return <Navigate to="/judge" replace />;

  return <Navigate to="/participant" replace />;
};
