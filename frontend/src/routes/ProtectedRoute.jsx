import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route so only authenticated users with an allowed role can access it.
 * Unauthenticated users are sent to /login.
 * Authenticated users with wrong role see an Access Denied page.
 */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center mx-auto">
          <span className="text-3xl">🚫</span>
        </div>
        <h1 className="text-2xl font-black text-white">Access Denied</h1>
        <p className="text-sm text-neutral-400 max-w-sm">
          Your account role (<span className="text-lime-400 font-bold capitalize">{currentUser?.role}</span>) does not have permission to access this page.
        </p>
        <a
          href="/"
          className="px-6 py-2.5 rounded-full bg-lime-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return children;
};
