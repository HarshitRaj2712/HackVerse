import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { FaGavel, FaStar, FaGithub, FaExternalLinkAlt, FaVideo, FaCheckCircle, FaCode } from 'react-icons/fa';

export const EvaluationStudio = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { submissions, submitJudgeScore } = useHackathons();
  const { currentUser } = useAuth();

  const submission = submissions.find(s => s.id === submissionId) || submissions[0];

  // Sliders State
  const [innovation, setInnovation] = useState(22);
  const [technical, setTechnical] = useState(23);
  const [design, setDesign] = useState(18);
  const [impact, setImpact] = useState(19);
  const [presentation, setPresentation] = useState(9);
  const [feedback, setFeedback] = useState('');

  const totalScore = innovation + technical + design + impact + presentation;

  const handleSubmitScore = (e) => {
    e.preventDefault();

    submitJudgeScore(submission.id, {
      innovation,
      technical,
      design,
      impact,
      presentation,
      feedback
    }, currentUser);

    navigate('/judge');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 mb-1">
            <FaGavel className="w-3.5 h-3.5" />
            <span>Interactive Judge Rubric Studio</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Evaluating: {submission.title}</h1>
        </div>

        <button onClick={() => navigate('/judge')} className="text-xs font-semibold text-gray-400 hover:text-white">
          ← Back to Queue
        </button>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Project Media & Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Video Pitch Player Embed */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <FaVideo className="w-3.5 h-3.5 text-pink-400" />
                <span>Video Pitch & Live Demo Preview</span>
              </span>
              {submission.demoUrl && (
                <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-400 font-bold hover:underline flex items-center gap-1">
                  <span>Open App</span>
                  <FaExternalLinkAlt className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            <div className="aspect-video bg-black flex items-center justify-center relative">
              {submission.videoUrl ? (
                <iframe
                  src={submission.videoUrl}
                  title="Demo Video"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8 space-y-2">
                  <FaVideo className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="text-xs text-gray-400">Direct video embed link not provided.</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Details Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">{submission.trackName}</div>
              <h3 className="text-xl font-bold text-white">{submission.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{submission.tagline}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-gray-300 space-y-1">
              <div><strong className="text-gray-400">Team:</strong> {submission.teamName} ({submission.members?.join(', ')})</div>
              <div><strong className="text-gray-400">Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {submission.techStack?.map((t, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 text-indigo-300 border border-slate-800 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Detailed Architecture</h4>
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {submission.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
              {submission.githubUrl && (
                <a
                  href={submission.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Inspect GitHub Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Scoring Rubric Sliders */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmitScore} className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 bg-gradient-to-b from-slate-900 to-amber-950/20 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Score & Rubric Breakdown</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm font-black">
                <FaStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{totalScore} / 100</span>
              </div>
            </div>

            {/* Slider 1: Innovation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">1. Innovation & Originality</span>
                <span className="text-amber-400 font-extrabold">{innovation} / 25 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={innovation}
                onChange={(e) => setInnovation(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 2: Technical Execution */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">2. Technical Depth & Execution</span>
                <span className="text-indigo-400 font-extrabold">{technical} / 25 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={technical}
                onChange={(e) => setTechnical(Number(e.target.value))}
                className="w-full accent-indigo-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 3: Design & UI/UX */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">3. UI / UX & Design Polish</span>
                <span className="text-purple-400 font-extrabold">{design} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={design}
                onChange={(e) => setDesign(Number(e.target.value))}
                className="w-full accent-purple-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 4: Practical Impact */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">4. Practical Impact & Utility</span>
                <span className="text-emerald-400 font-extrabold">{impact} / 20 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 5: Presentation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">5. Video Demo & Pitch</span>
                <span className="text-pink-400 font-extrabold">{presentation} / 10 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={presentation}
                onChange={(e) => setPresentation(Number(e.target.value))}
                className="w-full accent-pink-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Feedback Note Area */}
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Judge Feedback & Suggestions</label>
              <textarea
                rows="3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write constructive notes for the hacker team..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
            >
              Submit Score ({totalScore} pts)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
