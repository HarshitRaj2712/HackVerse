import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaRocket, FaUserGraduate, FaCrown, FaGavel, FaUserShield } from 'react-icons/fa';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('alex.chen@hackverse.io');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/participant');
  };

  const quickLogins = [
    { role: 'participant', name: 'Alex Chen', email: 'alex.chen@hackverse.io', icon: FaUserGraduate, desc: 'Participant' },
    { role: 'organizer', name: 'Sarah Jenkins', email: 'sarah.j@techforge.org', icon: FaCrown, desc: 'Organizer' },
    { role: 'judge', name: 'Dr. Aris Thorne', email: 'aris.thorne@ai-lab.edu', icon: FaGavel, desc: 'Judge' },
    { role: 'admin', name: 'Marcus Vance', email: 'admin@summerpep.io', icon: FaUserShield, desc: 'Admin' },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <FaRocket className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Sign In to SummerPEP HackVerse</h1>
          <p className="text-xs text-gray-400">Select a demo role account or enter your credentials.</p>
        </div>

        {/* Quick Demo Login Grid */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">1-Click Quick Demo Sign In</div>
          <div className="grid grid-cols-2 gap-2">
            {quickLogins.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.role}
                  onClick={() => {
                    switchRole(item.role);
                    navigate(item.role === 'organizer' ? '/organizer' : item.role === 'judge' ? '/judge' : item.role === 'admin' ? '/admin' : '/participant');
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition-all hover:scale-102 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-extrabold uppercase">
                      {item.desc}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{item.email}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
