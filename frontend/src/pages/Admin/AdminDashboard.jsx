import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathons } from '../../context/HackathonContext';
import {
  FaUserShield, FaUsers, FaTrophy, FaPaperPlane, FaTrash,
  FaBan, FaCheck, FaGavel, FaCrown, FaUserGraduate,
  FaChartBar, FaEdit, FaSearch, FaServer
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { api } from '../../services/api';

export const AdminDashboard = () => {
  const { currentUser, token } = useAuth();
  const { hackathons, submissions, updateHackathonStatus } = useHackathons();

  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users', authHeaders);
      setUsers(res.data.data);
    } catch {
      toast.error('Could not load users from server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/admin/analytics', authHeaders);
      setAnalytics(res.data.data);
    } catch {
      console.warn('Analytics unavailable');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Permanently delete user "${userName}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${userId}`, authHeaders);
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success(`User "${userName}" deleted.`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  const handleToggleBlock = async (userId, currentlyBlocked) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/block`, { isBlocked: !currentlyBlocked }, authHeaders);
      setUsers(prev => prev.map(u => u._id === userId ? res.data.data : u));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed.');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.put(`/admin/users/${userId}`, { role: newRole }, authHeaders);
      setUsers(prev => prev.map(u => u._id === userId ? res.data.data : u));
      toast.success(`Role updated to "${newRole}".`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role.');
    }
  };

  const roleIcon = (role) => {
    if (role === 'admin') return <FaUserShield className="w-3 h-3" />;
    if (role === 'organizer') return <FaCrown className="w-3 h-3" />;
    if (role === 'judge') return <FaGavel className="w-3 h-3" />;
    return <FaUserGraduate className="w-3 h-3" />;
  };

  const roleColor = (role) => {
    if (role === 'admin') return 'text-lime-400 bg-lime-400/10 border-lime-400/30';
    if (role === 'organizer') return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    if (role === 'judge') return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const tabs = ['users', 'hackathons', 'submissions'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0c0f] p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.4)]">
            <FaUserShield className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{currentUser?.fullName || currentUser?.name}</h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase tracking-wider">
                Administrator
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold">Full platform control — manage users, hackathons & analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/30 text-xs text-lime-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>Platform Operational</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: analytics?.totalUsers ?? users.length, icon: FaUsers, color: 'text-lime-400' },
          { label: 'Hackathons', value: hackathons.length, icon: FaTrophy, color: 'text-purple-400' },
          { label: 'Submissions', value: submissions.length, icon: FaPaperPlane, color: 'text-blue-400' },
          { label: 'Blocked Users', value: analytics?.blockedUsers ?? 0, icon: FaBan, color: 'text-red-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#0c0c0f] p-5 rounded-3xl border border-neutral-800 flex flex-col gap-1">
            <Icon className={`w-5 h-5 ${color} mb-1`} />
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Permission Summary */}
      <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 p-6">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <FaServer className="text-lime-400 w-4 h-4" /> Administrator Permissions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            'View All Users', 'Edit Users', 'Delete Users', 'Block / Unblock Users',
            'View All Hackathons', 'Delete Hackathons', 'View All Teams', 'View All Submissions',
            'Platform Analytics', 'Manage Judges', 'Manage Organizers', 'Full Platform Control',
          ].map(perm => (
            <div key={perm} className="flex items-center gap-2 text-xs text-neutral-300 font-semibold">
              <FaCheck className="w-3 h-3 text-lime-400 shrink-0" />
              {perm}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-[#0c0c0f] p-1.5 rounded-full border border-neutral-800 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold capitalize transition-all ${
              activeTab === tab ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="p-5 border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaUsers className="text-lime-400" /> All Platform Users
              <span className="text-neutral-500 font-normal text-sm">({filteredUsers.length})</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 rounded-full bg-[#141419] border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:border-lime-400/60 focus:outline-none w-full sm:w-52"
                />
              </div>
              <select
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
                className="px-3 py-2 rounded-full bg-[#141419] border border-neutral-800 text-xs text-white focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
                <option value="judge">Judge</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-neutral-500 text-sm">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-neutral-500 text-sm">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-widest text-[10px]">
                    <th className="px-5 py-3 text-left">User</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Role</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Change Role</th>
                    <th className="px-5 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredUsers.map(user => (
                    <tr key={user._id} className={`hover:bg-neutral-800/20 transition-colors ${user.isBlocked ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-700"
                          />
                          <span className="font-bold text-white">{user.fullName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-neutral-400 font-mono">{user.email}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-extrabold uppercase tracking-widest text-[10px] ${roleColor(user.role)}`}>
                          {roleIcon(user.role)} {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${user.isBlocked ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-lime-400/10 text-lime-400 border border-lime-400/30'}`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {user._id !== currentUser?.id && (
                          <select
                            value={user.role}
                            onChange={e => handleRoleChange(user._id, e.target.value)}
                            className="px-2 py-1 rounded-xl bg-[#141419] border border-neutral-800 text-xs text-white focus:outline-none cursor-pointer"
                          >
                            <option value="participant">Participant</option>
                            <option value="organizer">Organizer</option>
                            <option value="judge">Judge</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {user._id !== currentUser?.id && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                              title={user.isBlocked ? 'Unblock' : 'Block'}
                              className={`p-1.5 rounded-lg border transition-all ${user.isBlocked ? 'bg-lime-400/10 border-lime-400/30 text-lime-400 hover:bg-lime-400/20' : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'}`}
                            >
                              {user.isBlocked ? <FaCheck className="w-3 h-3" /> : <FaBan className="w-3 h-3" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id, user.fullName)}
                              title="Delete User"
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Hackathons Tab */}
      {activeTab === 'hackathons' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="p-5 border-b border-neutral-800">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaTrophy className="text-lime-400" /> All Hackathons ({hackathons.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-800/60">
            {hackathons.map(h => (
              <div key={h.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-neutral-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={h.banner} alt={h.title} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm">{h.title}</div>
                    <div className="text-xs text-neutral-500">{h.participantsCount} participants · {h.submissionsCount} submissions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${h.status === 'Live' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'bg-neutral-800 text-neutral-400 border border-neutral-700'}`}>
                    {h.status}
                  </span>
                  <select
                    value={h.status}
                    onChange={e => updateHackathonStatus(h.id, e.target.value)}
                    className="px-2 py-1 rounded-xl bg-[#141419] border border-neutral-800 text-xs text-white focus:outline-none"
                  >
                    <option value="Live">Live</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Judging">Judging</option>
                    <option value="Concluded">Concluded</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="bg-[#0c0c0f] rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="p-5 border-b border-neutral-800">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FaPaperPlane className="text-lime-400" /> All Submissions ({submissions.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-800/60">
            {submissions.map(sub => (
              <div key={sub.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-neutral-800/20 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">{sub.title}</div>
                  <div className="text-xs text-neutral-500">{sub.teamName} · {sub.hackathonTitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${sub.status === 'evaluated' ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' : 'bg-neutral-800 text-neutral-400 border border-neutral-700'}`}>
                    {sub.status}
                  </span>
                  <span className="text-xs text-neutral-400 font-bold">{sub.averageScore > 0 ? `Score: ${sub.averageScore}` : 'Pending'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
