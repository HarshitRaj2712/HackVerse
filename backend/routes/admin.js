import express from 'express';
import { User } from '../models/User.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// ──────────────────────────────────────────────────────────────────────────────
// ADMIN-ONLY ROUTES
// ──────────────────────────────────────────────────────────────────────────────

// GET /api/admin/users — View all users
router.get('/users', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users, total: users.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users/:id — View single user
router.get('/users/:id', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/users/:id — Edit user (role, block status, etc.)
router.put('/users/:id', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { role, isBlocked, fullName, email } = req.body;
    const update = {};
    if (role) update.role = role;
    if (typeof isBlocked === 'boolean') update.isBlocked = isBlocked;
    if (fullName) update.fullName = fullName;
    if (email) update.email = email;

    const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, data: updated, message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/users/:id — Delete user
router.delete('/users/:id', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    }
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/users/:id/block — Block or unblock user
router.patch('/users/:id/block', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const { isBlocked } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked },
      { new: true }
    ).select('-password');
    if (!updated) return res.status(404).json({ success: false, message: 'User not found.' });
    const action = isBlocked ? 'blocked' : 'unblocked';
    res.json({ success: true, data: updated, message: `User ${action} successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/analytics — Platform analytics
router.get('/analytics', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const total = await User.countDocuments();
    const byRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    const blocked = await User.countDocuments({ isBlocked: true });
    const recent = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');

    res.json({
      success: true,
      data: {
        totalUsers: total,
        blockedUsers: blocked,
        usersByRole: byRole,
        recentSignups: recent,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// ORGANIZER ROUTES (protected)
// ──────────────────────────────────────────────────────────────────────────────

// GET /api/admin/organizers — Admin view of all organizers
router.get('/organizers', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const organizers = await User.find({ role: 'organizer' }).select('-password');
    res.json({ success: true, data: organizers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/judges — Admin view of all judges
router.get('/judges', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const judges = await User.find({ role: 'judge' }).select('-password');
    res.json({ success: true, data: judges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
