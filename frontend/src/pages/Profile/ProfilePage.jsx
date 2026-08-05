import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import {
  FaUser, FaEnvelope, FaPhone, FaBirthdayCake,
  FaShieldAlt, FaEdit, FaSave, FaCheck, FaTimes,
  FaTrophy, FaPaperPlane, FaUserGraduate, FaCrown, FaGavel, FaUserShield
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { hackathons, submissions } = useHackathons();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: currentUser?.fullName || currentUser?.name || '',
    email: currentUser?.email || '',
    age: currentUser?.age || '',
    phoneNumber: currentUser?.phoneNumber || '',
    title: currentUser?.title || 'HackVerse Engineer',
    bio: currentUser?.bio || 'Passionate developer building innovative projects in AI and Web3.',
    skills: currentUser?.skills?.join(', ') || 'React, Node.js, Python, MongoDB, TailwindCSS',
  });

  const role = currentUser?.role || 'participant';

  const roleIcons = {
    participant: FaUserGraduate,
    organizer: FaCrown,
    judge: FaGavel,
    admin: FaUserShield,
  };

  const RoleIcon = roleIcons[role] || FaUserGraduate;

  const myRegisteredHackathons = hackathons.filter(
    h => currentUser?.registeredHackathons?.includes(h.id) || h.id === 'hack-1'
  );

  const mySubmissions = submissions.filter(
    s => s.members?.includes(currentUser?.fullName) || s.teamName === 'CyberKnights' || true
  );

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: form.fullName,
      age: form.age ? Number(form.age) : null,
      phoneNumber: form.phoneNumber,
      title: form.title,
      bio: form.bio,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
              alt={form.fullName}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-lime-400/40 shadow-xl"
            />
            <span className="absolute bottom-0 right-0 p-2 rounded-full bg-lime-400 text-black shadow-lg">
              <RoleIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-1">
              <h1 className="text-2xl font-black text-white">{form.fullName}</h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase tracking-wider">
                {role}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold">{form.title}</p>
            <p className="text-xs text-neutral-500 font-mono mt-1">{form.email}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
            isEditing
              ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
          }`}
        >
          {isEditing ? <><FaTimes className="w-3 h-3" /> Cancel</> : <><FaEdit className="w-3 h-3" /> Edit Profile</>}
        </button>
      </motion.div>

      {/* Main Details & Edit Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Info */}
        <div className="space-y-6">
          <div className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <FaShieldAlt className="text-lime-400" /> Account Overview
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-neutral-800">
                <span className="text-neutral-500 font-bold">Email:</span>
                <span className="text-white font-mono">{form.email}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-neutral-800">
                <span className="text-neutral-500 font-bold">Role:</span>
                <span className="text-lime-400 font-bold uppercase">{role}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-neutral-800">
                <span className="text-neutral-500 font-bold">Age:</span>
                <span className="text-white font-bold">{form.age ? `${form.age} years old` : 'Not provided'}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-neutral-800">
                <span className="text-neutral-500 font-bold">Phone:</span>
                <span className="text-white font-mono">{form.phoneNumber || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Activity Metrics */}
          <div className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <FaTrophy className="text-lime-400" /> Hackathon Activity
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800">
                <div className="text-2xl font-black text-lime-400">{myRegisteredHackathons.length}</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold mt-1">Competitions</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#141419] border border-neutral-800">
                <div className="text-2xl font-black text-purple-400">{mySubmissions.length}</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold mt-1">Submissions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile or View Bio */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800 space-y-5">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Update Personal Info</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300">Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300">Age (optional)</label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300">Phone Number (optional)</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#141419] border border-neutral-800 text-xs text-white focus:border-lime-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <FaSave className="w-3.5 h-3.5" /> Save Changes
              </button>
            </form>
          ) : (
            <div className="bg-[#0c0c0f] p-6 rounded-3xl border border-neutral-800 space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">About Me</h3>
                <p className="text-xs text-neutral-300 leading-relaxed bg-[#141419] p-4 rounded-2xl border border-neutral-800">
                  {form.bio}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {form.skills.split(',').map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-lime-400/10 text-lime-400 border border-lime-400/30">
                      {sk.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
