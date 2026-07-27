import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { ProjectCard } from '../../components/ProjectCard';
import { HackathonCard } from '../../components/HackathonCard';
import { FaUserGraduate, FaRocket, FaPaperPlane, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export const ParticipantDashboard = () => {
  const { currentUser } = useAuth();
  const { hackathons, submissions } = useHackathons();

  const myHackathons = hackathons.filter(h => currentUser?.registeredHackathons?.includes(h.id));
  const mySubmissions = submissions.filter(s => s.members?.includes(currentUser?.name) || s.teamName?.includes(currentUser?.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img src={currentUser?.avatar} alt={currentUser?.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/40" />
          <div>
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <h1 className="text-2xl font-extrabold text-white">{currentUser?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                Participant
              </span>
            </div>
            <p className="text-xs text-indigo-300 font-semibold">{currentUser?.title}</p>
            <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start">
              {currentUser?.skills?.map((sk, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-gray-300 border border-slate-700 font-mono">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/hackathons"
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            Explore More Events
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-indigo-400">{myHackathons.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Registered Competitions</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-purple-400">{mySubmissions.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Submitted Projects</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-amber-400">
            {mySubmissions.filter(s => s.award).length}
          </div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Winning Badges</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-emerald-400">95.5</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Top Judge Score</div>
        </div>
      </div>

      {/* Submissions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">My Project Submissions</h2>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="glass-panel p-10 rounded-2xl text-center border border-slate-800 space-y-3">
            <FaPaperPlane className="w-8 h-8 text-gray-500 mx-auto" />
            <h4 className="text-base font-bold text-white">No Projects Submitted Yet</h4>
            <p className="text-xs text-gray-400">Select an active hackathon to submit your GitHub repository & video demo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mySubmissions.map(sub => (
              <ProjectCard key={sub.id} submission={sub} />
            ))}
          </div>
        )}
      </div>

      {/* Registered Hackathons Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">My Registered Hackathons</h2>
        {myHackathons.length === 0 ? (
          <p className="text-xs text-gray-400">You haven't registered for any active hackathons yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myHackathons.map(h => (
              <HackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
