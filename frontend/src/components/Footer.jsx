import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050507] border-t border-neutral-900 pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-lime-400 flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.4)]">
                <FaRocket className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">SummerPEP HackVerse</span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Empowering global innovators, developer communities, and organizations to host, hack, and evaluate cutting-edge technology competitions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li><Link to="/hackathons" className="hover:text-lime-400 transition-colors">Explore Hackathons</Link></li>
              <li><Link to="/leaderboards" className="hover:text-lime-400 transition-colors">Hall of Fame & Winners</Link></li>
              <li><Link to="/team-finder" className="hover:text-lime-400 transition-colors">Team Matchmaking</Link></li>
              <li><Link to="/organizer/create" className="hover:text-lime-400 transition-colors">Host a Hackathon</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li><span className="hover:text-lime-400 transition-colors cursor-pointer">Artificial Intelligence & ML</span></li>
              <li><span className="hover:text-lime-400 transition-colors cursor-pointer">Web3 & Zero Knowledge</span></li>
              <li><span className="hover:text-lime-400 transition-colors cursor-pointer">HealthTech & Biotech</span></li>
              <li><span className="hover:text-lime-400 transition-colors cursor-pointer">Climate & Energy</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Connect & Community</h4>
            <div className="flex items-center gap-3 mb-4 text-neutral-400">
              <a href="#" className="p-2.5 rounded-full bg-[#121216] border border-neutral-800 hover:border-lime-400/40 hover:text-lime-400 transition-all"><FaGithub className="w-4 h-4" /></a>
              <a href="#" className="p-2.5 rounded-full bg-[#121216] border border-neutral-800 hover:border-lime-400/40 hover:text-lime-400 transition-all"><FaTwitter className="w-4 h-4" /></a>
              <a href="#" className="p-2.5 rounded-full bg-[#121216] border border-neutral-800 hover:border-lime-400/40 hover:text-lime-400 transition-all"><FaDiscord className="w-4 h-4" /></a>
              <a href="#" className="p-2.5 rounded-full bg-[#121216] border border-neutral-800 hover:border-lime-400/40 hover:text-lime-400 transition-all"><FaLinkedin className="w-4 h-4" /></a>
            </div>
            <p className="text-[11px] text-neutral-500 font-semibold">Built for SummerPEP Hackathon Program 2026.</p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-medium gap-4">
          <p>© 2026 SummerPEP HackVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
