import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { ProjectCard } from '../../components/ProjectCard';
import {
  FaGavel, FaCheckCircle, FaStar, FaClock,
  FaShieldAlt, FaCheck, FaTimes, FaTrophy
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export const JudgeDashboard = () => {
  const { currentUser } = useAuth();
  const { submissions, hackathons } = useHackathons();
  const navigate = useNavigate();

  const pendingSubmissions = submissions.filter(s => {
    const scoredByMe = s.scores?.some(sc => sc.judgeId === currentUser?.id || sc.judgeId === currentUser?._id);
    return !scoredByMe;
  });

  const evaluatedSubmissions = submissions.filter(s => {
    return s.scores?.some(sc => sc.judgeId === currentUser?.id || sc.judgeId === currentUser?._id);
  });

  const assignedHackathons = hackathons.filter(h => h.status === 'Judging' || h.status === 'Live' || true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <FaGavel className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{currentUser?.fullName || currentUser?.name}</h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/10 text-amber-400 border border-amber-400/30 uppercase tracking-wider">
                Official Hackathon Judge
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold">Evaluate submissions, grade code & impact rubrics, and leave feedback</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-5 py-2.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold text-xs">
            {pendingSubmissions.length} Pending Reviews
          </span>
        </div>
      </motion.div>

      {/* Judge Scope & Permissions */}
      <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <FaShieldAlt className="text-lime-400 w-4 h-4" /> Judge Role Capabilities & Constraints
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-lime-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaCheck className="w-3 h-3" /> Judge Permissions
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-neutral-300">
              <span>• View Assigned Hackathons</span>
              <span>• View All Submissions</span>
              <span>• Evaluate Projects</span>
              <span>• Submit Detailed Scores</span>
              <span>• Provide Constructive Feedback</span>
              <span>• View Live Leaderboards</span>
              <span>• Access Evaluation Studio</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800 space-y-2">
            <div className="font-bold text-red-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaTimes className="w-3 h-3" /> Judge Restrictions
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <p>🚫 Cannot edit hackathons (Organizer/Admin only)</p>
              <p>🚫 Cannot delete project submissions</p>
              <p>🚫 Cannot access admin features (Admin only)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Evaluation Queue', value: pendingSubmissions.length, color: 'text-amber-400' },
          { label: 'Reviews Completed', value: evaluatedSubmissions.length, color: 'text-lime-400' },
          { label: 'Assigned Events', value: assignedHackathons.length, color: 'text-purple-400' },
          { label: 'Rubric Max Points', value: '100 / 100', color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800 flex flex-col gap-1">
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Evaluation Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FaClock className="text-amber-400" /> Pending Evaluation Queue
          </h2>
        </div>

        {pendingSubmissions.length === 0 ? (
          <div className="bg-[#0c0c0f] p-10 rounded-3xl text-center border border-neutral-800 space-y-2">
            <FaCheckCircle className="w-8 h-8 text-lime-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Queue Empty! All Projects Evaluated</h4>
            <p className="text-xs text-neutral-400">You have completed all pending reviews assigned to you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingSubmissions.map(sub => (
              <ProjectCard
                key={sub.id}
                submission={sub}
                showJudgeAction
                onJudgeClick={(s) => navigate(`/judge/evaluate/${s.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed Evaluations */}
      {evaluatedSubmissions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FaCheckCircle className="text-lime-400" /> Completed Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluatedSubmissions.map(sub => (
              <ProjectCard key={sub.id} submission={sub} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
