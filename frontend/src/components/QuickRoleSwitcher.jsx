import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaCrown, FaGavel, FaUserShield, FaSyncAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickRoleSwitcher = () => {
  const { currentUser, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { key: 'participant', label: 'Participant', user: 'Alex Chen', icon: FaUserGraduate, badge: 'Hacker' },
    { key: 'organizer', label: 'Organizer', user: 'Sarah Jenkins', icon: FaCrown, badge: 'Host' },
    { key: 'judge', label: 'Judge', user: 'Dr. Aris Thorne', icon: FaGavel, badge: 'Evaluator' },
    { key: 'admin', label: 'Platform Admin', user: 'Marcus Vance', icon: FaUserShield, badge: 'Admin' },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-neutral-800 hover:border-lime-400/40 transition-all text-xs font-bold text-neutral-200"
        title="Switch persona for testing"
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-lime-400/10 text-lime-400">
          <FaSyncAlt className={`w-3 h-3 ${isOpen ? 'rotate-180 transition-transform duration-300' : ''}`} />
        </span>
        <span className="text-neutral-400">Role:</span>
        <span className="capitalize font-extrabold text-lime-400">{currentUser?.role || 'Guest'}</span>
        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/30">
          Demo
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 z-50 rounded-3xl bg-[#0c0c0f] p-3 border border-neutral-800 shadow-2xl shadow-black"
            >
              <div className="px-3 py-2 mb-2 border-b border-neutral-800/80">
                <p className="text-xs font-bold uppercase tracking-wider text-lime-400">Switch Persona (Interactive)</p>
                <p className="text-[11px] text-neutral-400">Test multi-role features instantly</p>
              </div>

              <div className="space-y-1.5">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isActive = currentUser?.role === r.key;
                  return (
                    <button
                      key={r.key}
                      onClick={() => {
                        switchRole(r.key);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-lime-400 text-black font-extrabold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                          : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-black/20 text-black' : 'bg-neutral-900 text-lime-400 border border-neutral-800'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{r.label}</div>
                          <div className={`text-[11px] ${isActive ? 'text-black/80' : 'text-neutral-400'}`}>{r.user}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-black/20 text-black' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}>
                        {r.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
