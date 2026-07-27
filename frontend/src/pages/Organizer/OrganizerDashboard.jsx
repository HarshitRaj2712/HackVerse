import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { FaCrown, FaPlus, FaUsers, FaTrophy, FaChartBar, FaGavel, FaCheckCircle, FaExchangeAlt } from 'react-icons/fa';

export const OrganizerDashboard = () => {
  const { currentUser } = useAuth();
  const { hackathons, submissions, updateHackathonStatus } = useHackathons();

  const myHackathons = hackathons.filter(h => h.organizerId === currentUser?.id || h.organizerName.includes('TechForge'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center">
            <FaCrown className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white">{currentUser?.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                Organizer
              </span>
            </div>
            <p className="text-xs text-gray-400">{currentUser?.company || 'Hackathon Host Manager'}</p>
          </div>
        </div>

        <Link
          to="/organizer/create"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition-all flex items-center gap-2 hover:scale-105"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>Host New Hackathon</span>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-purple-400">{myHackathons.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Hosted Hackathons</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-indigo-400">
            {myHackathons.reduce((acc, h) => acc + h.participantsCount, 0)}
          </div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Total Hackers Reached</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-emerald-400">
            {submissions.length}
          </div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Total Submissions Received</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-amber-400">$175,000</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Prize Money Allocated</div>
        </div>
      </div>

      {/* Manage Hosted Hackathons */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Manage Hosted Competitions</h2>

        <div className="space-y-4">
          {myHackathons.map((hackathon) => {
            const hackathonSubmissions = submissions.filter(s => s.hackathonId === hackathon.id);

            return (
              <div key={hackathon.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={hackathon.banner} alt={hackathon.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-white">{hackathon.title}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                          {hackathon.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{hackathon.category} • {hackathon.prizePool} Prize Pool</p>
                    </div>
                  </div>

                  {/* Status Toggle buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-semibold">Change Stage:</span>
                    {['Upcoming', 'Live', 'Judging', 'Ended'].map((st) => (
                      <button
                        key={st}
                        onClick={() => updateHackathonStatus(hackathon.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          hackathon.status === st
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-slate-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submissions count bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>Submissions: <strong className="text-white">{hackathonSubmissions.length}</strong></span>
                    <span>Participants: <strong className="text-white">{hackathon.participantsCount}</strong></span>
                    <span>Assigned Judges: <strong className="text-white">{hackathon.judges?.length || 2}</strong></span>
                  </div>

                  <Link
                    to={`/leaderboards/${hackathon.id}`}
                    className="text-indigo-400 hover:underline font-bold"
                  >
                    View Live Leaderboard →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
