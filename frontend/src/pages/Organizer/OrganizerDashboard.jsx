import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import {
  FaCrown, FaPlus, FaUsers, FaTrophy, FaPaperPlane,
  FaGavel, FaCheckCircle, FaTrash, FaEdit, FaTimesCircle,
  FaLock, FaLockOpen, FaBullhorn, FaCheck, FaTimes, FaShieldAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const OrganizerDashboard = () => {
  const { currentUser } = useAuth();
  const { hackathons, submissions, updateHackathonStatus, deleteHackathon } = useHackathons();

  // Filter hackathons owned by this organizer (or all default ones for demonstration)
  const myHackathons = hackathons.filter(
    h => h.organizerId === currentUser?.id || h.organizerId === currentUser?._id || h.organizerName?.includes('TechForge') || true
  );

  const [activeTab, setActiveTab] = useState('hackathons');
  const [selectedHackathonId, setSelectedHackathonId] = useState(myHackathons[0]?.id || 'hack-1');
  const [editingHackathon, setEditingHackathon] = useState(null);
  const [judgeEmail, setJudgeEmail] = useState('');
  const [teamsState, setTeamsState] = useState([
    { id: 't1', name: 'CyberKnights', members: 4, leader: 'Alex Rivera', status: 'Pending', hackathonId: 'hack-1' },
    { id: 't2', name: 'Quantum Coders', members: 3, leader: 'Sarah Jenkins', status: 'Approved', hackathonId: 'hack-1' },
    { id: 't3', name: 'NeuralNet AI', members: 5, leader: 'David Chen', status: 'Approved', hackathonId: 'hack-1' },
    { id: 't4', name: 'Pixel Pioneers', members: 2, leader: 'Maria Garcia', status: 'Rejected', hackathonId: 'hack-1' },
  ]);

  const selectedHackathon = hackathons.find(h => h.id === selectedHackathonId) || myHackathons[0];

  const handleApproveTeam = (teamId) => {
    setTeamsState(prev => prev.map(t => t.id === teamId ? { ...t, status: 'Approved' } : t));
    toast.success('Team approved for participation!');
  };

  const handleRejectTeam = (teamId) => {
    setTeamsState(prev => prev.map(t => t.id === teamId ? { ...t, status: 'Rejected' } : t));
    toast.error('Team registration rejected.');
  };

  const handleAddJudge = (e) => {
    e.preventDefault();
    if (!judgeEmail) return;
    toast.success(`Judge invitation sent to ${judgeEmail}`);
    setJudgeEmail('');
  };

  const handleAnnounceWinners = (hackathonTitle) => {
    toast.success(`Winners for "${hackathonTitle}" have been officially published!`);
  };

  const handleDeleteOwn = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete your hackathon "${title}"?`)) return;
    deleteHackathon(id);
    toast.success(`Hackathon "${title}" deleted.`);
  };

  const currentHackathonSubmissions = submissions.filter(s => s.hackathonId === selectedHackathonId || true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <FaCrown className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{currentUser?.fullName || currentUser?.name}</h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-400/10 text-purple-400 border border-purple-400/30 uppercase tracking-wider">
                Hackathon Organizer
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold">Create competitions, approve teams, assign judges & publish results</p>
          </div>
        </div>

        <Link
          to="/organizer/create"
          className="px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all flex items-center gap-2"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>Host New Hackathon</span>
        </Link>
      </motion.div>

      {/* Organizer Restrictions Warning Panel */}
      <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <FaShieldAlt className="text-lime-400 w-4 h-4" /> Organizer Capabilities & Scope
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-lime-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaCheck className="w-3 h-3" /> Organizer Permissions
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-neutral-300">
              <span>• Create Hackathon</span>
              <span>• Edit Hackathon</span>
              <span>• Delete Own Hackathon</span>
              <span>• Open / Close Registration</span>
              <span>• View Registered Teams</span>
              <span>• Approve / Reject Teams</span>
              <span>• Assign Judges</span>
              <span>• Publish Results</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-red-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaTimes className="w-3 h-3" /> Organizer Scope Boundaries
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <p>🚫 Cannot delete platform users (Admin only)</p>
              <p>🚫 Cannot access admin dashboard (Admin only)</p>
              <p>🚫 Cannot modify other organizers' hackathons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Hosted Competitions', value: myHackathons.length, color: 'text-purple-400' },
          { label: 'Registered Teams', value: teamsState.length, color: 'text-lime-400' },
          { label: 'Submissions', value: currentHackathonSubmissions.length, color: 'text-blue-400' },
          { label: 'Assigned Judges', value: selectedHackathon?.judges?.length || 3, color: 'text-amber-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800 flex flex-col gap-1">
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-[#0c0c0f] p-1.5 rounded-full border border-neutral-800 w-fit">
        {[
          { id: 'hackathons', label: 'My Hackathons' },
          { id: 'teams', label: 'Approve / Manage Teams' },
          { id: 'judges', label: 'Assign Judges' },
          { id: 'results', label: 'Publish Results' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
              activeTab === tab.id
                ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'hackathons' && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white">Manage My Hackathons</h2>
          <div className="grid grid-cols-1 gap-4">
            {myHackathons.map(h => (
              <div key={h.id} className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={h.banner} alt={h.title} className="w-14 h-14 rounded-2xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-white">{h.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${h.status === 'Live' ? 'bg-lime-400/10 text-lime-400 border-lime-400/30' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                          {h.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">{h.category} · {h.prizePool} Prize Pool</p>
                    </div>
                  </div>

                  {/* Stage Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Registration:</span>
                    {['Upcoming', 'Live', 'Judging', 'Concluded'].map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          updateHackathonStatus(h.id, st);
                          toast.success(`Stage set to ${st}`);
                        }}
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                          h.status === st
                            ? 'bg-lime-400 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                            : 'bg-[#141419] text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Row Actions */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4 text-neutral-400">
                    <span>Teams: <strong className="text-white">4 Registered</strong></span>
                    <span>Judges: <strong className="text-white">{h.judges?.length || 2} Assigned</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedHackathonId(h.id);
                        setActiveTab('teams');
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#141419] hover:bg-neutral-800 text-neutral-300 font-bold border border-neutral-800 transition-all"
                    >
                      Manage Teams
                    </button>
                    <button
                      onClick={() => handleDeleteOwn(h.id, h.title)}
                      className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/30 transition-all flex items-center gap-1"
                    >
                      <FaTrash className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approve / Reject Teams Tab */}
      {activeTab === 'teams' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <FaUsers className="text-lime-400" /> Registered Teams Approval Queue
              </h3>
              <p className="text-xs text-neutral-400">Review team details and accept or reject participation requests.</p>
            </div>
            <select
              value={selectedHackathonId}
              onChange={e => setSelectedHackathonId(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-[#141419] border border-neutral-800 text-xs text-white focus:outline-none"
            >
              {myHackathons.map(h => (
                <option key={h.id} value={h.id}>{h.title}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-widest text-[10px]">
                  <th className="px-6 py-3 text-left">Team Name</th>
                  <th className="px-6 py-3 text-left">Team Leader</th>
                  <th className="px-6 py-3 text-left">Members</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {teamsState.map(team => (
                  <tr key={team.id} className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{team.name}</td>
                    <td className="px-6 py-4 text-neutral-300">{team.leader}</td>
                    <td className="px-6 py-4 text-neutral-400">{team.members} hackers</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        team.status === 'Approved' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' :
                        team.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveTeam(team.id)}
                          className="px-3 py-1 rounded-full bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/30 font-bold text-[11px] transition-all flex items-center gap-1"
                        >
                          <FaCheck className="w-3 h-3" /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectTeam(team.id)}
                          className="px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-[11px] transition-all flex items-center gap-1"
                        >
                          <FaTimes className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Judges Tab */}
      {activeTab === 'judges' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <FaGavel className="text-lime-400" /> Assign Official Judges
              </h3>
              <p className="text-xs text-neutral-400">Invite judges to review submissions for "{selectedHackathon?.title}".</p>
            </div>
          </div>

          <form onSubmit={handleAddJudge} className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="Judge Email address..."
              value={judgeEmail}
              onChange={e => setJudgeEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-[#141419] border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:border-lime-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all"
            >
              Invite Judge
            </button>
          </form>

          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <h4 className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Assigned Judges Panel</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Dr. Sarah Connor', role: 'AI Ethics Lead @ OpenAI', email: 'sarah.c@ai.org' },
                { name: 'Marcus Vance', role: 'VP Engineering @ Vercel', email: 'marcus@vercel.com' },
                { name: 'Elena Rostova', role: 'Principal Architect @ Google', email: 'elena@google.com' },
              ].map(j => (
                <div key={j.email} className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">{j.name}</div>
                    <div className="text-[11px] text-neutral-400">{j.role}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/30">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Publish Results Tab */}
      {activeTab === 'results' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <FaBullhorn className="text-lime-400" /> Publish Leaderboard & Announce Winners
              </h3>
              <p className="text-xs text-neutral-400">Finalize scores and announce winners for public viewing.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#141419] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-white text-sm">{selectedHackathon?.title}</div>
                <div className="text-xs text-neutral-400">Status: <span className="text-lime-400 font-bold">{selectedHackathon?.status}</span></div>
              </div>
              <button
                onClick={() => handleAnnounceWinners(selectedHackathon?.title)}
                className="px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all flex items-center gap-2"
              >
                <FaBullhorn className="w-3.5 h-3.5" /> Publish Results
              </button>
            </div>
            <Link
              to={`/leaderboards/${selectedHackathon?.id}`}
              className="text-xs text-lime-400 hover:underline font-bold inline-block"
            >
              View Public Leaderboard Page →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
