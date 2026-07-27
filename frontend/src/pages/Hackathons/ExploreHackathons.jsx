import React, { useState } from 'react';
import { useHackathons } from '../../context/HackathonContext';
import { HackathonCard } from '../../components/HackathonCard';
import { FaSearch, FaFilter, FaTrophy, FaCalendarAlt, FaTimes } from 'react-icons/fa';

export const ExploreHackathons = () => {
  const { hackathons } = useHackathons();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  const categories = ['All', 'AI/ML', 'Web3', 'Health', 'Sustainability'];
  const statuses = ['All', 'Live', 'Upcoming', 'Judging', 'Ended'];
  const modes = ['All', 'Online', 'Hybrid', 'In-Person'];

  const filteredHackathons = hackathons.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.organizerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || h.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || h.status === selectedStatus;
    const matchesMode = selectedMode === 'All' || h.mode === selectedMode;

    return matchesSearch && matchesCategory && matchesStatus && matchesMode;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Hackathons</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Discover active competitions, filter by tracks & prize pool, and submit your breakthrough projects.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackathons by keyword, technology, or organizer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/60 text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {statuses.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedStatus === st
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-900/60 text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Location / Mode</label>
            <div className="flex flex-wrap gap-1.5">
              {modes.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMode(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedMode === m
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-900/60 text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>Showing <strong className="text-white">{filteredHackathons.length}</strong> hackathons</span>
          {(selectedCategory !== 'All' || selectedStatus !== 'All' || selectedMode !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSelectedMode('All');
                setSearchQuery('');
              }}
              className="text-indigo-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredHackathons.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-3">
            <FaFilter className="w-8 h-8 text-gray-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Hackathons Found</h3>
            <p className="text-xs text-gray-400">Try relaxing your search query or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(h => (
              <HackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
