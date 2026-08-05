import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaGithub, FaExternalLinkAlt, FaVideo, FaCode, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const SubmitProject = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const { hackathons, submitProject } = useHackathons();
  const { currentUser, token } = useAuth();

  const selectedHackathon = hackathons.find(h => h.id === hackathonId || h._id === hackathonId) || hackathons[0];

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [teamName, setTeamName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !teamName || !githubUrl) {
      toast.error('Please fill out all required fields (*)');
      return;
    }

    setSubmitting(true);

    const payload = {
      hackathonId: selectedHackathon?.id || hackathonId || 'hk_1',
      hackathonTitle: selectedHackathon?.title || 'SummerPEP HackVerse 2026',
      title: title.trim(),
      tagline: tagline.trim(),
      teamName: teamName.trim(),
      members: [currentUser?.fullName || currentUser?.name || 'Participant Hacker'],
      repoUrl: githubUrl.trim(),
      demoUrl: demoUrl.trim(),
      videoUrl: videoUrl.trim(),
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim(),
    };

    await submitProject(payload, token);
    setSubmitting(false);
    navigate('/participant');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-bold border border-lime-400/30 mb-2">
          <FaPaperPlane className="w-3.5 h-3.5" />
          <span>Submission Studio</span>
        </div>
        <h1 className="text-3xl font-black text-white">Submit Your Project</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Submitting project for <strong className="text-white">{selectedHackathon?.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6 shadow-2xl">
        {/* Title & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-extrabold text-neutral-300 block mb-1.5 uppercase tracking-wider">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AuraMind AI"
              className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold text-neutral-300 block mb-1.5 uppercase tracking-wider">Short Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Autonomous multi-agent browser automation"
              className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
            />
          </div>
        </div>

        {/* Team Name */}
        <div>
          <label className="text-xs font-extrabold text-neutral-300 block mb-1.5 uppercase tracking-wider">Team Name *</label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. CyberKnights"
            className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
          />
        </div>

        {/* Repository & Links */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <h4 className="text-xs font-extrabold text-lime-400 uppercase tracking-wider">Repository & Media Links</h4>

          <div>
            <label className="text-xs font-extrabold text-neutral-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
              <FaGithub className="w-3.5 h-3.5" />
              <span>Public GitHub Repository URL *</span>
            </label>
            <input
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/project-repo"
              className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white font-mono focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold text-neutral-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                <FaExternalLinkAlt className="w-3.5 h-3.5 text-lime-400" />
                <span>Live App Demo URL</span>
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://my-demo-app.vercel.app"
                className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white font-mono focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-neutral-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                <FaVideo className="w-3.5 h-3.5 text-purple-400" />
                <span>Video Pitch / Demo URL</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white font-mono focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-xs font-extrabold text-neutral-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
            <FaCode className="w-3.5 h-3.5 text-lime-400" />
            <span>Technologies Used (comma separated)</span>
          </label>
          <input
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="e.g. React, Node.js, Python, MongoDB"
            className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="text-xs font-extrabold text-neutral-300 block mb-1.5 uppercase tracking-wider">Detailed Project Description *</label>
          <textarea
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain what problem your project solves, how it works, technical stack choices, and key features..."
            className="w-full px-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white leading-relaxed focus:border-lime-400 focus:outline-none placeholder-neutral-600 transition-all"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-400 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <FaPaperPlane className="w-3.5 h-3.5" />
            <span>{submitting ? 'Submitting...' : 'Submit Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
