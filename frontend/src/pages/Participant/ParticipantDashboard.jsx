import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { ProjectCard } from '../../components/ProjectCard';
import { HackathonCard } from '../../components/HackathonCard';
import {
  FaUserGraduate, FaRocket, FaPaperPlane, FaAward,
  FaUsers, FaCheck, FaTimes, FaShieldAlt, FaPlus, FaSignOutAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ParticipantDashboard = () => {
  const { currentUser } = useAuth();
  const { hackathons, submissions } = useHackathons();

  // Participant's team state demo
  const [myTeam, setMyTeam] = useState({
    id: 'team-404',
    name: 'CyberKnights',
    hackathonTitle: 'Global AI & Web3 Hackathon 2026',
    members: [
      { name: currentUser?.fullName || currentUser?.name || 'You', role: 'Team Leader' },
      { name: 'Alex Vance', role: 'Frontend Developer' },
      { name: 'Sofia Rodriguez', role: 'AI / Backend Engineer' },
    ],
  });

  const [newMemberName, setNewMemberName] = useState('');

  const myRegisteredHackathons = hackathons.filter(
    h => currentUser?.registeredHackathons?.includes(h.id) || h.id === 'hack-1'
  );

  const mySubmissions = submissions.filter(
    s => s.members?.includes(currentUser?.fullName) || s.teamName === myTeam?.name || true
  );

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    setMyTeam(prev => ({
      ...prev,
      members: [...prev.members, { name: newMemberName, role: 'Contributor' }],
    }));
    toast.success(`Added ${newMemberName} to team ${myTeam.name}!`);
    setNewMemberName('');
  };

  const handleLeaveTeam = () => {
    if (window.confirm('Are you sure you want to leave your team?')) {
      setMyTeam(null);
      toast.error('You have left the team.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
            alt={currentUser?.fullName || currentUser?.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-lime-400/40"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{currentUser?.fullName || currentUser?.name}</h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase tracking-wider">
                Participant Hacker
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold">{currentUser?.email} · Ready to build next-gen projects</p>
          </div>
        </div>

        <Link
          to="/hackathons"
          className="px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
        >
          Browse Hackathons
        </Link>
      </motion.div>

      {/* Participant Restrictions & Capabilities */}
      <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <FaShieldAlt className="text-lime-400 w-4 h-4" /> Participant Capabilities & Boundaries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-lime-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaCheck className="w-3 h-3" /> Allowed Actions
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-neutral-300">
              <span>• Register for Events</span>
              <span>• Create & Join Teams</span>
              <span>• Leave Team</span>
              <span>• Submit Projects</span>
              <span>• Edit Submission</span>
              <span>• View Leaderboards</span>
              <span>• Track Scores & Badges</span>
              <span>• Access Hackathon Detail</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-red-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaTimes className="w-3 h-3" /> Restricted Actions
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <p>🚫 Cannot create hackathons (Organizer only)</p>
              <p>🚫 Cannot judge projects (Judge only)</p>
              <p>🚫 Cannot access admin features (Admin only)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Registered Events', value: myRegisteredHackathons.length, color: 'text-lime-400' },
          { label: 'Submissions', value: mySubmissions.length, color: 'text-purple-400' },
          { label: 'Winning Badges', value: 1, color: 'text-amber-400' },
          { label: 'Top Score', value: '95.5 / 100', color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800 flex flex-col gap-1">
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Team Management Section */}
      <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaUsers className="text-lime-400" /> My Hackathon Team
            </h3>
            <p className="text-xs text-neutral-400">Create, manage, invite teammates, or leave team.</p>
          </div>
          {myTeam && (
            <button
              onClick={handleLeaveTeam}
              className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1"
            >
              <FaTimes className="w-3 h-3" /> Leave Team
            </button>
          )}
        </div>

        {myTeam ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold text-white">{myTeam.name}</div>
                <div className="text-xs text-neutral-400">Competing in: <span className="text-lime-400 font-bold">{myTeam.hackathonTitle}</span></div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-400/10 text-lime-400 border border-lime-400/30">
                {myTeam.members.length} Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {myTeam.members.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#141419] border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">{m.name}</div>
                    <div className="text-[10px] text-neutral-400">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddMember} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Teammate Full Name..."
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full bg-[#141419] border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:border-lime-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <FaPlus className="w-3 h-3" /> Add
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#141419] border border-neutral-800 text-center space-y-3">
            <p className="text-xs text-neutral-400">You are currently not in any team.</p>
            <button
              onClick={() => setMyTeam({
                id: 't-new',
                name: 'New Squad',
                hackathonTitle: 'Global AI & Web3 Hackathon 2026',
                members: [{ name: currentUser?.fullName || 'You', role: 'Leader' }]
              })}
              className="px-5 py-2 rounded-full bg-lime-400 text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Create Team Now
            </button>
          </div>
        )}
      </div>

      {/* Submissions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FaPaperPlane className="text-lime-400" /> My Project Submissions
          </h2>
          <Link
            to="/participant/submit/hack-1"
            className="px-4 py-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all"
          >
            + Submit New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mySubmissions.map(sub => (
            <ProjectCard key={sub.id} submission={sub} />
          ))}
        </div>
      </div>

      {/* Registered Hackathons */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white">Registered Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myRegisteredHackathons.map(h => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      </div>
    </div>
  );
};
