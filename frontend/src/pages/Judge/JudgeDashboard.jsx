import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import { ProjectCard } from '../../components/ProjectCard';
import { FaGavel, FaCheckCircle, FaStar, FaClock, FaArrowRight } from 'react-icons/fa';

export const JudgeDashboard = () => {
  const { currentUser } = useAuth();
  const { submissions } = useHackathons();
  const navigate = useNavigate();

  const pendingSubmissions = submissions.filter(s => {
    const scoredByMe = s.scores?.some(sc => sc.judgeId === currentUser?.id);
    return !scoredByMe;
  });

  const evaluatedSubmissions = submissions.filter(s => {
    return s.scores?.some(sc => sc.judgeId === currentUser?.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-orange-950/60">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <FaGavel className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white">{currentUser?.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Official Judge
              </span>
            </div>
            <p className="text-xs text-amber-300 font-semibold">{currentUser?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-amber-300">
            {pendingSubmissions.length} Projects Pending Score
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-amber-400">{pendingSubmissions.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Evaluation Queue</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-emerald-400">{evaluatedSubmissions.length}</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Evaluations Completed</div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="text-2xl font-black text-indigo-400">100 / 100</div>
          <div className="text-xs text-gray-400 font-semibold mt-1">Max Rubric Points</div>
        </div>
      </div>

      {/* Evaluation Queue Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaClock className="w-5 h-5 text-amber-400" />
            <span>Pending Evaluation Queue</span>
          </h2>
        </div>

        {pendingSubmissions.length === 0 ? (
          <div className="glass-panel p-10 rounded-2xl text-center border border-slate-800 space-y-2">
            <FaCheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Queue Empty! All Projects Evaluated</h4>
            <p className="text-xs text-gray-400">You've completed all assigned project reviews.</p>
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
          <h2 className="text-xl font-bold text-white">Completed Reviews</h2>
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
