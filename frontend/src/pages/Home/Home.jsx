import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHackathons } from '../../context/HackathonContext';
import { HackathonCard } from '../../components/HackathonCard';
import { FaRocket, FaTrophy, FaUsers, FaArrowRight, FaCode, FaBrain, FaExternalLinkAlt, FaCheckCircle, FaLaptopCode, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Home = () => {
  const { hackathons, submissions, teamPosts } = useHackathons();
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('All');

  const tracks = ['All', 'Artificial Intelligence', 'Web3', 'GreenTech', 'IoT'];

  const filteredHackathons = selectedTrackFilter === 'All'
    ? hackathons
    : hackathons.filter(h => h.tags?.includes(selectedTrackFilter) || h.category === selectedTrackFilter);

  return (
    <div className="space-y-24 pb-20 bg-[#030304] text-white selection:bg-lime-400 selection:text-black">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto space-y-8">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-extrabold uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(163,230,53,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
            <span>GLOBAL HACKATHON PLATFORM 2026</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.1] text-white"
          >
            Build Next-Gen Apps. <br />
            <span className="text-lime-400">Compete & Win Prizes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Empowering developers, designers & AI researchers to build groundbreaking software, find ideal teammates, and get evaluated by top industry judges.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/hackathons"
              className="px-8 py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(163,230,53,0.4)] transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <FaRocket className="w-4 h-4" />
              <span>Explore Live Hackathons</span>
            </Link>

            <Link
              to="/team-finder"
              className="px-8 py-3.5 rounded-full bg-[#121216] hover:bg-[#1a1a22] text-white font-extrabold text-xs uppercase tracking-wider border border-neutral-800 hover:border-lime-400/40 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <FaUsers className="w-4 h-4 text-lime-400" />
              <span>Find Teammates</span>
            </Link>
          </motion.div>

          {/* Platform Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800/80 text-center space-y-1">
              <div className="text-3xl font-black text-lime-400">$500,000+</div>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Total Prize Pool</div>
            </div>
            <div className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800/80 text-center space-y-1">
              <div className="text-3xl font-black text-white">15,000+</div>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Global Developers</div>
            </div>
            <div className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800/80 text-center space-y-1">
              <div className="text-3xl font-black text-lime-400">450+</div>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Submitted Projects</div>
            </div>
            <div className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800/80 text-center space-y-1">
              <div className="text-3xl font-black text-white">100%</div>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Transparent Scoring</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRACK FILTERING & FEATURED HACKATHONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-2">
            <div className="badge-lime">
              <span>EXPLORE OPPORTUNITIES</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Active & Upcoming Hackathons</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-[#0c0c0f] p-1.5 rounded-full border border-neutral-800">
            {tracks.map((trk) => (
              <button
                key={trk}
                onClick={() => setSelectedTrackFilter(trk)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  selectedTrackFilter === trk
                    ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {trk}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="badge-lime">
            <span>PROJECT SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Featured Winning Submissions</h2>
          <p className="text-xs text-neutral-400">Discover innovative projects built during recent hackathons.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {submissions.slice(0, 2).map((sub) => (
            <div key={sub.id} className="bg-[#0c0c0f] rounded-3xl p-6 border border-neutral-800/90 hover:border-lime-400/40 transition-all space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-lime-400/10 text-lime-400 border border-lime-400/30">
                  SCORE: {sub.averageScore > 0 ? `${sub.averageScore} / 100` : 'Under Review'}
                </span>
                <span className="text-xs text-neutral-500 font-bold">{sub.teamName}</span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">{sub.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{sub.tagline}</p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {sub.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-[#141419] border border-neutral-800 text-neutral-300 text-[10px] font-bold">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <a
                  href={sub.githubRepo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#16161c] hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-300 flex items-center gap-2 transition-all"
                >
                  <FaCode className="w-3 h-3 text-lime-400" />
                  <span>GitHub Repo</span>
                </a>
                <Link
                  to={`/leaderboards/${sub.hackathonId}`}
                  className="px-4 py-1.5 rounded-full bg-lime-400 text-black hover:bg-lime-300 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(163,230,53,0.3)]"
                >
                  <span>Leaderboard</span>
                  <FaArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="badge-lime">
            <span>PLATFORM WORKFLOW</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">How SummerPEP HackVerse Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Register & Browse', desc: 'Filter hackathons by prize pool or tech domain and register instantly.' },
            { num: '02', title: 'Team Finder', desc: 'Find teammates with complementary skills or create your dream team.' },
            { num: '03', title: 'Build & Submit', desc: 'Submit repos, live demos & pitch videos directly to Submission Studio.' },
            { num: '04', title: 'Rubric Judging', desc: 'Judges score projects transparently across innovation, code & design.' },
          ].map((step) => (
            <div key={step.num} className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800/80 space-y-4">
              <div className="w-10 h-10 rounded-full bg-lime-400/10 text-lime-400 font-extrabold flex items-center justify-center border border-lime-400/30 text-sm">
                {step.num}
              </div>
              <h3 className="text-base font-extrabold text-white">{step.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-lime-400/5 blur-3xl pointer-events-none" />

          <div className="badge-lime mx-auto">
            <span>GET STARTED TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Ready to Hack, Build & Win?
          </h2>

          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Join thousands of developers competing in global hackathons today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(163,230,53,0.4)] transition-all transform hover:scale-105"
            >
              Join Platform Now
            </Link>
            <Link
              to="/organizer/create"
              className="px-8 py-3.5 rounded-full bg-[#121216] hover:bg-[#1a1a22] text-white font-extrabold text-xs uppercase tracking-wider border border-neutral-800 transition-all transform hover:scale-105"
            >
              Host a Hackathon
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
