import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaGithub, FaExternalLinkAlt, FaVideo, FaCode, FaCheckCircle } from 'react-icons/fa';

export const SubmitProject = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const { hackathons, submitProject } = useHackathons();
  const { currentUser } = useAuth();

  const selectedHackathon = hackathons.find(h => h.id === hackathonId) || hackathons[0];

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [trackId, setTrackId] = useState(selectedHackathon.tracks?.[0]?.id || '');
  const [teamName, setTeamName] = useState('Neural Hackers');
  const [members, setMembers] = useState(currentUser?.name ? [currentUser.name] : ['Alex Chen']);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, Python, TailwindCSS, FastAPI');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTrackObj = selectedHackathon.tracks?.find(t => t.id === trackId);

    submitProject({
      hackathonId: selectedHackathon.id,
      title,
      tagline,
      teamName,
      members,
      trackId,
      trackName: selectedTrackObj?.name || 'General Track',
      githubUrl,
      demoUrl,
      videoUrl,
      techStack: techStackInput.split(',').map(s => s.trim()),
      description
    });

    navigate('/participant');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
          <FaPaperPlane className="w-3.5 h-3.5" />
          <span>Submission Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Submit Your Project</h1>
        <p className="text-xs text-gray-400 mt-1">
          Submitting for <strong>{selectedHackathon.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Track Selection */}
        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Select Competition Track</label>
          <select
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-indigo-500"
          >
            {selectedHackathon.tracks?.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.prize})</option>
            ))}
          </select>
        </div>

        {/* Title & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AuraMind AI"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Short Tagline *</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Autonomous multi-agent browser task automation"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Team Name */}
        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Team Name *</label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        {/* Repository & Links */}
        <div className="space-y-4 pt-2 border-t border-slate-800/80">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Repository & Media Links</h4>

          <div>
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5 mb-1.5">
              <FaGithub className="w-3.5 h-3.5" />
              <span>Public GitHub Repository URL *</span>
            </label>
            <input
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/project-repo"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5 mb-1.5">
                <FaExternalLinkAlt className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live App Demo URL</span>
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://my-demo-app.vercel.app"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5 mb-1.5">
                <FaVideo className="w-3.5 h-3.5 text-pink-400" />
                <span>Video Pitch / Demo URL</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
            <FaCode className="w-3.5 h-3.5 text-purple-400" />
            <span>Technologies & Frameworks (comma separated)</span>
          </label>
          <input
            type="text"
            required
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Detailed Description & Architecture *</label>
          <textarea
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what your project does, how it was built, challenges faced, and future roadmap..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
          >
            Submit Project for Evaluation
          </button>
        </div>
      </form>
    </div>
  );
};
