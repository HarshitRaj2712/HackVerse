import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { FaCrown, FaPlus, FaTrash, FaTrophy, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export const CreateHackathon = () => {
  const navigate = useNavigate();
  const { createHackathon } = useHackathons();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('AI/ML');
  const [mode, setMode] = useState('Online');
  const [location, setLocation] = useState('Global (Virtual)');
  const [prizePool, setPrizePool] = useState('$50,000');
  const [startDate, setStartDate] = useState('2026-08-15');
  const [endDate, setEndDate] = useState('2026-08-30');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');

  // Dynamic Tracks
  const [tracks, setTracks] = useState([
    { id: 'trk_1', name: 'Main Innovation Track', prize: '$30,000', description: 'Best overall technical implementation.' },
    { id: 'trk_2', name: 'UI / UX Design Excellence', prize: '$20,000', description: 'Best user experience and interface polish.' }
  ]);

  const addTrack = () => {
    setTracks(prev => [
      ...prev,
      { id: `trk_${Date.now()}`, name: 'New Track', prize: '$10,000', description: 'Track description...' }
    ]);
  };

  const removeTrack = (id) => {
    setTracks(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdId = createHackathon({
      title,
      tagline,
      category,
      mode,
      location,
      prizePool,
      startDate,
      endDate,
      description,
      banner,
      tracks,
      organizerId: currentUser?.id || 'usr_2',
      organizerName: currentUser?.company || currentUser?.name || 'TechForge Global'
    });

    navigate(`/hackathons/${createdId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
          <FaCrown className="w-3.5 h-3.5" />
          <span>Organizer Wizard</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Create & Publish a Hackathon</h1>
        <p className="text-xs text-gray-400 mt-1">Configure competition details, custom tracks, prize pools, and schedule timelines.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Title & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Hackathon Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NextGen Autonomous AI Hack"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Tagline *</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Build multi-agent AI tools in 48 hours"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Category, Mode, Prize Pool */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            >
              <option value="AI/ML">AI/ML</option>
              <option value="Web3">Web3</option>
              <option value="Health">Health</option>
              <option value="Sustainability">Sustainability</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Mode *</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            >
              <option value="Online">Online (Virtual)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Total Prize Pool *</label>
            <input
              type="text"
              required
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              placeholder="e.g. $50,000"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Start Date *</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">End Date *</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase tracking-wider">Event Overview & Guidelines *</label>
          <textarea
            required
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the challenge goals, eligible participants, and evaluation process..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
          />
        </div>

        {/* Dynamic Tracks Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Competition Tracks ({tracks.length})</h4>
            <button
              type="button"
              onClick={addTrack}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all flex items-center gap-1"
            >
              <FaPlus className="w-3 h-3 text-purple-400" />
              <span>Add Track</span>
            </button>
          </div>

          <div className="space-y-3">
            {tracks.map((trk, index) => (
              <div key={trk.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">Track #{index + 1}</span>
                  {tracks.length > 1 && (
                    <button type="button" onClick={() => removeTrack(trk.id)} className="text-rose-400 hover:text-rose-300 text-xs">
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={trk.name}
                    onChange={(e) => {
                      const updated = [...tracks];
                      updated[index].name = e.target.value;
                      setTracks(updated);
                    }}
                    placeholder="Track Title"
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    value={trk.prize}
                    onChange={(e) => {
                      const updated = [...tracks];
                      updated[index].prize = e.target.value;
                      setTracks(updated);
                    }}
                    placeholder="Prize Pool (e.g. $20,000)"
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
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
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition-all hover:scale-105"
          >
            Publish Hackathon Now
          </button>
        </div>
      </form>
    </div>
  );
};
