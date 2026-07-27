import React, { useState } from 'react';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaPlus, FaSearch, FaUserTag, FaEnvelope, FaDiscord, FaTimes, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const TeamFinder = () => {
  const { teamPosts, hackathons, createTeamPost } = useHackathons();
  const { currentUser } = useAuth();

  const [selectedSkill, setSelectedSkill] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);

  // Modal Form State
  const [hackathonId, setHackathonId] = useState(hackathons[0]?.id || '');
  const [teamName, setTeamName] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const skillFilterPills = ['All', 'Frontend / UI Designer', 'PyTorch / ML Specialist', 'Solidity Developer', 'C++ / CoreML Developer'];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const selectedHk = hackathons.find(h => h.id === hackathonId);

    createTeamPost({
      hackathonId,
      hackathonTitle: selectedHk?.title || 'Global Summit',
      teamName,
      creatorName: currentUser?.name || 'Hacker',
      creatorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      lookingFor: lookingFor.split(',').map(s => s.trim()),
      ideaDescription,
      currentMembersCount: 1,
      maxMembers: 4,
      contactInfo
    });

    setShowPostModal(false);
    setTeamName('');
    setLookingFor('');
    setIdeaDescription('');
    setContactInfo('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
            <FaUsers className="w-3.5 h-3.5" />
            <span>Team Matchmaking Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Find Your Dream Hackathon Team</h1>
          <p className="text-xs text-gray-400 mt-1">Connect with developers, designers, and AI specialists looking to build winning projects together.</p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 hover:scale-105"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>Post Team Request</span>
        </button>
      </div>

      {/* Skill Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mr-2">Filter by skill:</span>
        {skillFilterPills.map((skill) => (
          <button
            key={skill}
            onClick={() => setSelectedSkill(skill)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSkill === skill
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -3 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={post.creatorAvatar} alt={post.creatorName} className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/30" />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.teamName}</h4>
                  <p className="text-[11px] text-gray-400">Created by <strong className="text-indigo-300">{post.creatorName}</strong></p>
                </div>
              </div>

              <div className="text-[11px] font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 mb-3 truncate">
                Target: {post.hackathonTitle}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                "{post.ideaDescription}"
              </p>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Looking For Roles:</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.lookingFor?.map((role, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-300 border border-slate-700/80 font-semibold">
                      + {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-semibold">
                Members: <strong className="text-white">{post.currentMembersCount} / {post.maxMembers}</strong>
              </span>
              <a
                href={`mailto:${post.contactInfo}`}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all border border-slate-700"
              >
                Contact Lead
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPostModal(false)} />
            <motion.form
              onSubmit={handlePostSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg glass-panel p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h3 className="text-base font-bold text-white">Post Team Recruitment Request</h3>
                <button type="button" onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Target Hackathon</label>
                <select
                  value={hackathonId}
                  onChange={(e) => setHackathonId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  {hackathons.map(h => (
                    <option key={h.id} value={h.id}>{h.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Quantum Hackers"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Looking For Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  placeholder="e.g. React Frontend, PyTorch AI Specialist, UI Designer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Project Idea Summary</label>
                <textarea
                  required
                  rows="3"
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  placeholder="Describe your concept and what you plan to build during the hackathon..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Contact Info (Discord / Email / Telegram)</label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. Discord: @alex_hacker / Email: alex@dev.io"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-700/60">
                <button type="button" onClick={() => setShowPostModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg">
                  Publish Request
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
