import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { initialUsers } from '../../data/mockData';
import { FaUserShield, FaUsers, FaTrophy, FaPaperPlane, FaServer, FaCheckCircle } from 'react-icons/fa';

export const AdminDashboard = () => {
  const { currentUser, switchRole } = useAuth();
  const { hackathons, submissions } = useHackathons();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <FaUserShield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white">{currentUser?.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                System Administrator
              </span>
            </div>
            <p className="text-xs text-emerald-300 font-semibold">{currentUser?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Platform Operational (100% Uptime)</span>
        </div>
      </div>

      {/* Global System Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-emerald-400">{initialUsers.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Platform Users</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-indigo-400">{hackathons.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Active Hackathons</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-purple-400">{submissions.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Total Submissions</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-amber-400">$265,000</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Disbursed Rewards</div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Registered Users & System Personas</h3>
          <span className="text-xs text-gray-400">Click persona to assume role</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Title / Organization</th>
                <th className="py-3.5 px-4 text-right">Quick Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-gray-300">
              {initialUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span className="font-bold text-white">{u.name}</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-gray-400">{u.email}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase font-extrabold text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{u.title || u.company || 'Member'}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => switchRole(u.role)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 border border-slate-700 transition-all"
                    >
                      Login As {u.role}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
