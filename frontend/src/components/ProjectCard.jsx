import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlayCircle, FaStar, FaAward, FaComments, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectCard = ({ submission, showJudgeAction, onJudgeClick }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {submission.trackName || 'General Track'}
              </span>
              {submission.award && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <FaAward className="w-3 h-3 text-amber-400" />
                  <span>{submission.award}</span>
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-white hover:text-indigo-300 transition-colors">
              {submission.title}
            </h4>
          </div>

          {/* Score Badge if evaluated */}
          {submission.averageScore > 0 ? (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
                <FaStar className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{submission.averageScore} / 100</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">{submission.scores?.length || 0} reviews</span>
            </div>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 text-gray-400 border border-slate-700">
              Pending Evaluation
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
          {submission.tagline || submission.description}
        </p>

        {/* Team Members */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
          <span className="text-[11px] text-gray-500 font-semibold">Team:</span>
          <span className="font-bold text-gray-200">{submission.teamName}</span>
          <span className="text-gray-500">({submission.members?.join(', ')})</span>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {submission.techStack?.map((tech, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-indigo-300 border border-slate-800 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link & Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {submission.githubUrl && (
            <a
              href={submission.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-all text-xs flex items-center gap-1 font-semibold"
              title="GitHub Repo"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}

          {submission.demoUrl && (
            <a
              href={submission.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-all text-xs flex items-center gap-1 font-semibold"
              title="Live Demo"
            >
              <FaExternalLinkAlt className="w-3 h-3 text-indigo-400" />
              <span className="hidden sm:inline">Demo</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          {submission.scores?.length > 0 && (
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all border border-indigo-500/20"
            >
              <FaComments className="w-3 h-3" />
              <span>Feedback ({submission.scores.length})</span>
            </button>
          )}

          {showJudgeAction && (
            <button
              onClick={() => onJudgeClick(submission)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1"
            >
              <span>Score Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Judge Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowFeedbackModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg glass-panel p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h3 className="text-base font-bold text-white">Judge Evaluations for {submission.title}</h3>
                <button onClick={() => setShowFeedbackModal(false)} className="text-gray-400 hover:text-white font-bold text-sm">✕</button>
              </div>

              <div className="space-y-3">
                {submission.scores?.map((sc, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300">{sc.judgeName}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                        Total: {(sc.innovation || 0) + (sc.technical || 0) + (sc.design || 0) + (sc.impact || 0) + (sc.presentation || 0)} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-gray-400 pt-1">
                      <div>Innov: <strong className="text-white">{sc.innovation}</strong></div>
                      <div>Tech: <strong className="text-white">{sc.technical}</strong></div>
                      <div>Design: <strong className="text-white">{sc.design}</strong></div>
                      <div>Impact: <strong className="text-white">{sc.impact}</strong></div>
                      <div>Pitch: <strong className="text-white">{sc.presentation}</strong></div>
                    </div>

                    {sc.feedback && (
                      <p className="text-xs text-gray-300 italic pt-2 border-t border-slate-800/80">
                        "{sc.feedback}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
