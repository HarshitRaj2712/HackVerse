import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#030304] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-lime-400/10 border border-lime-400/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(163,230,53,0.2)]">
          <FaExclamationTriangle className="w-10 h-10 text-lime-400" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900 border border-neutral-800 text-lime-400 uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">Page Lost in Cyberspace</h1>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            The URL or page you are searching for does not exist or has been moved to another coordinate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <FaHome className="w-3.5 h-3.5" /> Return Home
          </Link>
          <Link
            to="/hackathons"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121216] hover:bg-[#1a1a22] text-white font-extrabold text-xs border border-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <FaRocket className="w-3.5 h-3.5 text-lime-400" /> Explore Hackathons
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
