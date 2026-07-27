import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHackathons } from '../context/HackathonContext';
import { QuickRoleSwitcher } from './QuickRoleSwitcher';
import { FaRocket, FaBell, FaUser, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { notifications, markNotificationRead } = useHackathons();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;
  const userNotifications = notifications.filter(n => n.userId === currentUser?.id);

  const getDashboardPath = () => {
    switch (currentUser?.role) {
      case 'organizer': return '/organizer';
      case 'judge': return '/judge';
      case 'admin': return '/admin';
      default: return '/participant';
    }
  };

  const navLinks = [
    { label: 'Explore Hackathons', path: '/hackathons' },
    { label: 'Leaderboards', path: '/leaderboards' },
    { label: 'Team Finder', path: '/team-finder' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-neutral-900 bg-[#050507]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-lime-400 flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform">
            <FaRocket className="w-4 h-4 text-black transform -rotate-12 group-hover:rotate-0 transition-transform" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>SummerPEP</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/30 font-mono font-bold uppercase tracking-wider">
                HACKVERSE
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#0e0e12] p-1.5 rounded-full border border-neutral-800">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <QuickRoleSwitcher />

          {/* Organizer Create Button */}
          {currentUser?.role === 'organizer' && (
            <Link
              to="/organizer/create"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all"
            >
              <FaPlus className="w-3 h-3" />
              <span>Host Hackathon</span>
            </Link>
          )}

          {/* Role Dashboard Button */}
          <Link
            to={getDashboardPath()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121216] hover:bg-[#1a1a22] text-white hover:text-lime-400 text-xs font-bold border border-neutral-800 transition-all"
          >
            <span>My Workspace</span>
          </Link>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full bg-[#121216] hover:bg-[#1a1a22] text-neutral-300 hover:text-white border border-neutral-800 transition-all"
              title="Notifications"
            >
              <FaBell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-400 text-black text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 z-50 rounded-3xl bg-[#0c0c0f] p-4 border border-neutral-800 shadow-2xl shadow-black"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                      <span className="text-[11px] text-lime-400 font-bold">{userNotifications.length} total</span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {userNotifications.length === 0 ? (
                        <p className="text-xs text-neutral-500 text-center py-4">No notifications yet.</p>
                      ) : (
                        userNotifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 rounded-2xl text-left border text-xs cursor-pointer transition-all ${
                              n.read ? 'bg-[#050507] border-neutral-900 text-neutral-400' : 'bg-lime-400/5 border-lime-400/30 text-neutral-200 font-medium'
                            }`}
                          >
                            <div className="font-bold text-lime-400 mb-0.5">{n.title}</div>
                            <div className="text-[11px] leading-relaxed text-neutral-300">{n.message}</div>
                            <div className="text-[10px] text-neutral-500 mt-1.5">{n.date}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-full bg-[#121216] hover:bg-[#1a1a22] border border-neutral-800 transition-all"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-lime-400/40"
              />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 z-50 rounded-3xl bg-[#0c0c0f] p-3 border border-neutral-800 shadow-2xl shadow-black"
                  >
                    <div className="p-2 border-b border-neutral-800/80 mb-2">
                      <p className="text-xs font-extrabold text-white truncate">{currentUser?.name}</p>
                      <p className="text-[11px] text-lime-400 capitalize font-bold truncate">{currentUser?.role} Account</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-2xl text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all"
                      >
                        <FaUser className="w-3.5 h-3.5 text-lime-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-xs text-rose-400 hover:bg-rose-500/10 transition-all text-left font-semibold"
                      >
                        <FaSignOutAlt className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
