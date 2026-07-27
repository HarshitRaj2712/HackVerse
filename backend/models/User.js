import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['participant', 'organizer', 'judge', 'admin', 'Administrator', 'Organizer', 'Participant', 'Judge'],
    default: 'participant',
  },
  age: {
    type: Number,
    required: false,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: '',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
