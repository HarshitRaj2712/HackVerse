import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { ProjectCard } from '../../components/ProjectCard';
import { FaTrophy, FaCalendarAlt, FaClock, FaUsers, FaGlobe, FaCheckCircle, FaUserCheck, FaPaperPlane, FaGavel, FaShareAlt, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hackathons, submissions, registerForHackathon } = useHackathons();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const hackathon = hackathons.find(h => h.id === id) || hackathons[0];
  const hackathonSubmissions = submissions.filter(s => s.hackathonId === hackathon.id);

  const isRegistered = currentUser?.registeredHackathons?.includes(hackathon.id);

  const handleRegister = () => {
    registerForHackathon(hackathon.id, currentUser);
    setShowRegisterModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner & Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800">
        <div className="h-64 sm:h-80 relative">
          <img src={hackathon.banner} alt={hackathon.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white uppercase tracking-wider shadow-lg">
              {hackathon.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
              ● {hackathon.status}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-gray-300">Hosted by <strong className="text-indigo-400">{hackathon.organizerName}</strong></span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{hackathon.title}</h1>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">{hackathon.tagline}</p>
            </div>

            <div className="flex items-center gap-3">
              {isRegistered ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                  <FaUserCheck className="w-4 h-4" />
                  <span>Registered Hacker</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  Register Now (Free)
                </button>
              )}

              <Link
                to={`/participant/submit/${hackathon.id}`}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5 hover:scale-105"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
                <span>Submit Project</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400"><FaTrophy className="w-5 h-5" /></div>
          <div>
            <div className="text-[11px] text-gray-400 font-semibold uppercase">Prize Pool</div>
            <div className="text-sm font-extrabold text-white">{hackathon.prizePool}</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400"><FaCalendarAlt className="w-5 h-5" /></div>
          <div>
            <div className="text-[11px] text-gray-400 font-semibold uppercase">Dates</div>
            <div className="text-xs font-bold text-white">{hackathon.startDate} - {hackathon.endDate}</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400"><FaUsers className="w-5 h-5" /></div>
          <div>
            <div className="text-[11px] text-gray-400 font-semibold uppercase">Hackers</div>
            <div className="text-sm font-extrabold text-white">{hackathon.participantsCount} Registered</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400"><FaGlobe className="w-5 h-5" /></div>
          <div>
            <div className="text-[11px] text-gray-400 font-semibold uppercase">Location</div>
            <div className="text-xs font-bold text-white">{hackathon.location}</div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Nav */}
          <div className="flex border-b border-slate-800 gap-4 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Overview & Rules' },
              { id: 'tracks', label: `Tracks (${hackathon.tracks?.length || 0})` },
              { id: 'timeline', label: 'Timeline & Schedule' },
              { id: 'submissions', label: `Submissions (${hackathonSubmissions.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-300'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">About the Hackathon</h3>
                <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                  {hackathon.description}
                </p>
              </div>

              {/* Rubric Criteria */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaGavel className="w-4 h-4 text-amber-400" />
                  <span>Official Judging Rubric & Criteria</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hackathon.rubricCriteria?.map((crit) => (
                    <div key={crit.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-300">{crit.name}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold">{crit.maxScore} pts</span>
                      </div>
                      <p className="text-[11px] text-gray-400">{crit.description || 'Evaluated by assigned judges.'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">Rules & Guidelines</h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  {hackathon.rules?.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Tracks & Prizes */}
          {activeTab === 'tracks' && (
            <div className="space-y-4">
              {hackathon.tracks?.map((track) => (
                <div key={track.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{track.name}</h3>
                    <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30">
                      {track.prize} Prize
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{track.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Timeline */}
          {activeTab === 'timeline' && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">Schedule Phases</h3>
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {hackathon.timeline?.map((phase, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                      phase.completed ? 'bg-emerald-500 text-white' : phase.active ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30' : 'bg-slate-800 text-gray-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{phase.phase}</div>
                        <div className="text-[11px] text-gray-400">{phase.date}</div>
                      </div>
                      {phase.completed ? (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Done</span>
                      ) : phase.active ? (
                        <span className="text-[10px] font-bold text-indigo-400 uppercase animate-pulse">Active Phase</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Submissions */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              {hackathonSubmissions.length === 0 ? (
                <div className="glass-panel p-10 rounded-2xl text-center border border-slate-800 space-y-2">
                  <p className="text-xs text-gray-400">No project submissions recorded yet for this hackathon.</p>
                  <Link to={`/participant/submit/${hackathon.id}`} className="inline-block text-xs font-bold text-indigo-400 underline">
                    Be the first to submit a project!
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hackathonSubmissions.map((sub) => (
                    <ProjectCard key={sub.id} submission={sub} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Team Matchmaking Promo Box */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 space-y-4 bg-gradient-to-b from-purple-950/30 to-slate-900">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <FaUsers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Need Teammates?</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Looking for a designer, frontend dev, or AI expert? Browse posts or list your team on Team Finder.
            </p>
            <Link
              to="/team-finder"
              className="w-full inline-block text-center py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
            >
              Open Team Matchmaking
            </Link>
          </div>

          {/* Leaderboard Link */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 space-y-4 bg-gradient-to-b from-amber-950/20 to-slate-900">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FaTrophy className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Live Leaderboard</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Track live evaluation scores, rank tables, and judge feedback as scores are submitted.
            </p>
            <Link
              to={`/leaderboards/${hackathon.id}`}
              className="w-full inline-block text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs transition-all shadow-md"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowRegisterModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-md glass-panel p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Confirm Registration</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              You are registering for <strong>{hackathon.title}</strong> as <strong>{currentUser?.name}</strong> ({currentUser?.role}).
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-xs text-indigo-300 space-y-1">
              <div>✓ Free participation</div>
              <div>✓ Access to mentors & Discord</div>
              <div>✓ Project submission eligibility</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setShowRegisterModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white">
                Cancel
              </button>
              <button onClick={handleRegister} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg">
                Confirm Registration
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
