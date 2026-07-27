import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { FaTrophy, FaMedal, FaCrown, FaStar, FaGithub, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Leaderboard = () => {
  const { hackathonId } = useParams();
  const { hackathons, submissions } = useHackathons();

  const selectedHackathon = hackathons.find(h => h.id === hackathonId) || hackathons[0];
  const [selectedTrack, setSelectedTrack] = useState('All');

  const hackathonSubmissions = submissions
    .filter(s => s.hackathonId === selectedHackathon.id)
    .filter(s => selectedTrack === 'All' || s.trackId === selectedTrack)
    .sort((a, b) => b.averageScore - a.averageScore);

  const top1 = hackathonSubmissions[0];
  const top2 = hackathonSubmissions[1];
  const top3 = hackathonSubmissions[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 uppercase tracking-widest">
          <FaTrophy className="w-4 h-4 text-amber-400" />
          <span>Official Live Leaderboard & Winners Hall</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">{selectedHackathon.title}</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
          Scored by expert judges across Innovation, Technical Depth, UI/UX, Impact, and Demo Pitch.
        </p>
      </div>

      {/* Track Filter Pills */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedTrack('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTrack === 'All'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
              : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          All Tracks ({selectedHackathon.submissionsCount || hackathonSubmissions.length})
        </button>
        {selectedHackathon.tracks?.map(trk => (
          <button
            key={trk.id}
            onClick={() => setSelectedTrack(trk.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTrack === trk.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                : 'glass-panel text-gray-400 hover:text-white'
            }`}
          >
            {trk.name}
          </button>
        ))}
      </div>

      {/* Winner Podium (If top submissions exist) */}
      {hackathonSubmissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end max-w-4xl mx-auto">
          {/* 2nd Place */}
          {top2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="order-2 md:order-1 glass-panel p-6 rounded-3xl border border-slate-700 text-center space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="w-12 h-12 rounded-full bg-slate-700/60 text-slate-300 mx-auto flex items-center justify-center font-black text-lg border border-slate-500">
                2nd
              </div>
              <h3 className="text-base font-bold text-white line-clamp-1">{top2.title}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{top2.teamName}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                <FaStar className="w-3 h-3 fill-amber-400" />
                <span>{top2.averageScore} / 100</span>
              </div>
            </motion.div>
          )}

          {/* 1st Place Champion */}
          {top1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="order-1 md:order-2 glass-panel p-8 rounded-3xl border-2 border-amber-500/60 text-center space-y-4 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 shadow-2xl shadow-amber-500/20 transform md:-translate-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 mx-auto flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-amber-500/30">
                👑 1st
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">Grand Champion</span>
                <h3 className="text-xl font-black text-white">{top1.title}</h3>
                <p className="text-xs text-indigo-300 font-semibold mt-1">{top1.teamName}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-amber-500 text-slate-950 text-sm font-black shadow-lg">
                <FaStar className="w-4 h-4 fill-slate-950" />
                <span>{top1.averageScore} / 100 Points</span>
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="order-3 glass-panel p-6 rounded-3xl border border-amber-700/40 text-center space-y-3 bg-gradient-to-b from-amber-950/20 to-slate-950">
              <div className="w-12 h-12 rounded-full bg-amber-900/60 text-amber-300 mx-auto flex items-center justify-center font-black text-lg border border-amber-700">
                3rd
              </div>
              <h3 className="text-base font-bold text-white line-clamp-1">{top3.title}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{top3.teamName}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                <FaStar className="w-3 h-3 fill-amber-400" />
                <span>{top3.averageScore} / 100</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Full Rankings Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Full Leaderboard Table</h3>
          <span className="text-xs text-gray-400">{hackathonSubmissions.length} Projects Ranked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Project & Team</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Award Status</th>
                <th className="py-3.5 px-4 text-right">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-gray-300">
              {hackathonSubmissions.map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-black text-sm text-white">
                    #{idx + 1}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{sub.title}</div>
                    <div className="text-[11px] text-gray-400">Team: <span className="text-indigo-300 font-semibold">{sub.teamName}</span></div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-300 border border-slate-800 font-medium">
                      {sub.trackName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 font-black text-xs border border-amber-500/30">
                      ★ {sub.averageScore || 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {sub.award ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {sub.award}
                      </span>
                    ) : (
                      <span className="text-gray-500">Participant</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {sub.githubUrl && (
                        <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300">
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
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
