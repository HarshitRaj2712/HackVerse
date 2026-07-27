import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaRocket, FaEye, FaEyeSlash, FaLock, FaEnvelope,
  FaUser, FaPhone, FaCalendar, FaUserGraduate, FaCrown, FaGavel, FaUserShield
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ROLES = [
  { value: 'participant', label: 'Participant', desc: 'Build & compete', icon: FaUserGraduate },
  { value: 'organizer',  label: 'Organizer',   desc: 'Host events',    icon: FaCrown },
  { value: 'judge',      label: 'Judge',        desc: 'Evaluate work',  icon: FaGavel },
  { value: 'admin',      label: 'Administrator',desc: 'Manage platform',icon: FaUserShield },
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'participant',
    age: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRoleSelect = (role) =>
    setForm(prev => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const payload = {
      fullName:    form.fullName.trim(),
      email:       form.email.trim(),
      password:    form.password,
      role:        form.role,
      age:         form.age ? Number(form.age) : null,
      phoneNumber: form.phoneNumber.trim() || '',
    };

    const result = await signup(payload);
    if (result?.success) {
      navigate('/login', {
        state: {
          registeredEmail: form.email.trim(),
          successMessage: 'Account created successfully! Please sign in with your credentials.',
        },
      });
    } else {
      setError(result?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-[#030304]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <Link to="/" className="inline-flex w-12 h-12 rounded-full bg-lime-400 items-center justify-center shadow-[0_0_25px_rgba(163,230,53,0.4)] mx-auto">
            <FaRocket className="w-5 h-5 text-black" />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Create Account</h1>
          <p className="text-sm text-neutral-400">Join SummerPEP HackVerse and start hacking!</p>
        </div>

        <div className="bg-[#0c0c0f] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  id="signup-fullname"
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors">
                    {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors">
                    {showConfirm ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Select Your Role</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(({ value, label, desc, icon: Icon }) => {
                  const active = form.role === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      id={`role-${value}`}
                      onClick={() => handleRoleSelect(value)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        active
                          ? 'bg-lime-400/10 border-lime-400/60 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.15)]'
                          : 'bg-[#141419] border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${active ? 'bg-lime-400/15' : 'bg-neutral-900'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold">{label}</div>
                        <div className={`text-[10px] font-semibold ${active ? 'text-lime-400/70' : 'text-neutral-600'}`}>{desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  Age <span className="text-neutral-600 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <div className="relative">
                  <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    id="signup-age"
                    type="number"
                    name="age"
                    min="13"
                    max="100"
                    placeholder="e.g. 22"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  Phone <span className="text-neutral-600 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    id="signup-phone"
                    type="tel"
                    name="phoneNumber"
                    placeholder="+1 555 0123"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(163,230,53,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-[11px] text-neutral-600 font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <p className="text-center text-xs text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-lime-400 font-extrabold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-neutral-600">
          <Link to="/" className="hover:text-neutral-400 transition-colors">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
};
