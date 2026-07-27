import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaRocket, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: location.state?.registeredEmail || '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(location.state?.successMessage || '');

  useEffect(() => {
    if (location.state?.successMessage) {
      setNotification(location.state.successMessage);
    }
  }, [location.state]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result?.success) {
      const role = result.user.role;
      if (role === 'organizer') navigate('/organizer');
      else if (role === 'judge') navigate('/judge');
      else if (role === 'admin') navigate('/admin');
      else navigate('/participant');
    } else {
      setError(result?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-[#030304]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <Link to="/" className="inline-flex w-12 h-12 rounded-full bg-lime-400 items-center justify-center shadow-[0_0_25px_rgba(163,230,53,0.4)] mx-auto">
            <FaRocket className="w-5 h-5 text-black" />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-sm text-neutral-400">Sign in to your SummerPEP HackVerse account.</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0c0c0f] border border-neutral-800 rounded-3xl p-8 space-y-5 shadow-2xl">
          {notification && (
            <div className="px-4 py-3 rounded-2xl bg-lime-400/10 border border-lime-400/40 text-lime-400 text-xs font-bold text-center flex items-center justify-center gap-2">
              <FaCheckCircle className="w-4 h-4 shrink-0 text-lime-400" />
              <span>{notification}</span>
            </div>
          )}

          {error && (
            <div className="px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-2xl bg-[#141419] border border-neutral-800 focus:border-lime-400/60 focus:outline-none text-sm text-white placeholder-neutral-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(163,230,53,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-[11px] text-neutral-600 font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-neutral-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-lime-400 font-extrabold hover:underline">
              Create one here
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6 text-xs text-neutral-600">
          <Link to="/" className="hover:text-neutral-400 transition-colors">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
};
