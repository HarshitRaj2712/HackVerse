import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers, FaGlobe, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const HackathonCard = ({ hackathon }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/40 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" /> Live Hacking
          </span>
        );
      case 'Upcoming':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-neutral-900 text-neutral-300 border border-neutral-700 uppercase tracking-widest">
            Upcoming
          </span>
        );
      case 'Judging':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-400/10 text-amber-300 border border-amber-400/40 uppercase tracking-widest">
            Under Judging
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-neutral-900 text-neutral-500 border border-neutral-800 uppercase tracking-widest">
            Concluded
          </span>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-[#0c0c0f] rounded-3xl overflow-hidden border border-neutral-800/80 hover:border-lime-400/40 flex flex-col h-full group transition-all duration-300 shadow-xl"
    >
      {/* Banner Header */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={hackathon.banner}
          alt={hackathon.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/40 to-transparent" />
        
        {/* Category & Status Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#050507]/90 backdrop-blur-md text-white border border-neutral-800 uppercase tracking-wider">
            {hackathon.category}
          </span>
          {getStatusBadge(hackathon.status)}
        </div>

        {/* Prize Pool Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lime-400 text-black font-black text-xs shadow-[0_0_15px_rgba(163,230,53,0.3)]">
          <FaTrophy className="w-3.5 h-3.5" />
          <span>{hackathon.prizePool} Prize Pool</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-semibold text-neutral-400 mb-1 flex items-center gap-1">
            <span>Hosted by</span>
            <span className="text-lime-400 font-bold">{hackathon.organizerName}</span>
          </div>
          <h3 className="text-base font-extrabold text-white group-hover:text-lime-400 transition-colors line-clamp-1">
            {hackathon.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {hackathon.tagline}
          </p>
        </div>

        {/* Tracks Pill Tags */}
        <div className="flex flex-wrap gap-1.5">
          {hackathon.tracks?.slice(0, 2).map((trk) => (
            <span key={trk.id} className="text-[10px] px-3 py-1 rounded-full bg-[#121216] text-neutral-300 border border-neutral-800 font-bold uppercase tracking-wide truncate max-w-[150px]">
              {trk.name}
            </span>
          ))}
          {hackathon.tracks?.length > 2 && (
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#121216] text-lime-400 border border-lime-400/20 font-extrabold">
              +{hackathon.tracks.length - 2}
            </span>
          )}
        </div>

        {/* Meta Stats & Footer Button */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-3 font-semibold">
            <span className="flex items-center gap-1" title="Participants">
              <FaUsers className="w-3.5 h-3.5 text-lime-400" />
              <span>{hackathon.participantsCount}</span>
            </span>
            <span className="flex items-center gap-1" title="Location/Mode">
              <FaGlobe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{hackathon.mode}</span>
            </span>
          </div>

          <Link
            to={`/hackathons/${hackathon.id}`}
            className="px-4 py-1.5 rounded-full bg-[#16161c] hover:bg-lime-400 hover:text-black border border-neutral-800 text-white font-extrabold text-xs flex items-center gap-1 transition-all"
          >
            <span>Details</span>
            <FaChevronRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
