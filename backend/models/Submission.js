import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  judgeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  judgeName: {
    type: String,
    default: 'Official Judge',
  },
  innovationScore: { type: Number, default: 0 },
  technicalScore: { type: Number, default: 0 },
  impactScore: { type: Number, default: 0 },
  presentationScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
  evaluatedAt: { type: Date, default: Date.now },
});

const submissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    hackathonId: {
      type: String,
      required: [true, 'Hackathon ID is required'],
    },
    hackathonTitle: {
      type: String,
      default: 'SummerPEP HackVerse 2026',
    },
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    members: {
      type: [String],
      default: [],
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submitterName: {
      type: String,
      default: '',
    },
    repoUrl: {
      type: String,
      required: [true, 'GitHub repository URL is required'],
      trim: true,
    },
    demoUrl: {
      type: String,
      default: '',
      trim: true,
    },
    videoUrl: {
      type: String,
      default: '',
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
    status: {
      type: String,
      enum: ['submitted', 'evaluated'],
      default: 'submitted',
    },
    scores: [scoreSchema],
    averageScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Submission = mongoose.model('Submission', submissionSchema);
