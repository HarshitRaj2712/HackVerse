import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SummerPEP Backend Server is healthy & running!',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ─── In-memory Data Store ─────────────────────────────────────────────────────
let hackathons = [
  {
    id: 'hk_1',
    title: 'AI Innovators Global Hackathon 2026',
    tagline: 'Build next-gen autonomous agents & generative AI solutions to shape the future.',
    description: 'Join thousands of builders worldwide to craft revolutionary AI applications.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    organizer: 'SummerPEP AI Labs',
    status: 'Live',
    mode: 'Online',
    prizePool: '$50,000',
    participantsCount: 1420,
    teamsCount: 310,
    submissionsCount: 84,
    tags: ['Artificial Intelligence', 'Agentic AI', 'LLM', 'Python'],
    startDate: '2026-07-01',
    endDate: '2026-08-15',
    timeline: [
      { phase: 'Registration Opens', date: 'Jul 1, 2026', completed: true },
      { phase: 'Submission Window', date: 'Jul 15 - Aug 15', completed: false, active: true },
      { phase: 'Peer & Jury Review', date: 'Aug 16 - Aug 20', completed: false },
      { phase: 'Grand Finale & Prizes', date: 'Aug 22, 2026', completed: false }
    ],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: [
      'Teams must consist of 1 to 4 members.',
      'All code submitted must be original.',
      'Submissions must include a functional GitHub repo and a 3-minute video demo.'
    ]
  },
  {
    id: 'hk_2',
    title: 'Web3 & Decentralized Future Summit',
    tagline: 'Deploy smart contracts, zero-knowledge proofs, and decentralized infra.',
    description: 'Empowering open finance, privacy tech, and decentralized identity.',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=150&q=80',
    organizer: 'BlockNexus Foundation',
    status: 'Live',
    mode: 'Hybrid',
    prizePool: '$35,000',
    participantsCount: 890,
    teamsCount: 195,
    submissionsCount: 42,
    tags: ['Web3', 'Blockchain', 'Solidity', 'Zero-Knowledge'],
    startDate: '2026-07-10',
    endDate: '2026-08-25',
    timeline: [
      { phase: 'Registration Opens', date: 'Jul 10, 2026', completed: true },
      { phase: 'Hacking Phase', date: 'Jul 15 - Aug 25', completed: false, active: true },
      { phase: 'Judging Phase', date: 'Aug 26 - Aug 29', completed: false },
      { phase: 'Winner Ceremony', date: 'Aug 30, 2026', completed: false }
    ],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: ['Smart contract code must be published on testnet.', 'Open to global participants.']
  },
  {
    id: 'hk_3',
    title: 'GreenTech & Sustainable Climate Codeathon',
    tagline: 'Software & IoT solutions tackling renewable energy and carbon tracking.',
    description: 'Use technology to accelerate decarbonization and ecological restoration.',
    banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&q=80',
    organizer: 'EcoTech Guild',
    status: 'Upcoming',
    mode: 'Online',
    prizePool: '$25,000',
    participantsCount: 520,
    teamsCount: 110,
    submissionsCount: 0,
    tags: ['GreenTech', 'IoT', 'Data Science', 'Climate'],
    startDate: '2026-09-01',
    endDate: '2026-09-20',
    timeline: [
      { phase: 'Pre-registration', date: 'Open Now', completed: true, active: true },
      { phase: 'Hacking Begins', date: 'Sep 1, 2026', completed: false },
      { phase: 'Submissions Due', date: 'Sep 20, 2026', completed: false }
    ],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: ['Projects must focus on measurable sustainability goals.']
  }
];

let submissions = [
  {
    id: 'sub_1',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Innovators Global Hackathon 2026',
    title: 'AuraMind - Autonomous Multi-Agent Research Assistant',
    tagline: 'Collaborative AI agent network that synthesizes complex research papers.',
    demoVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    githubRepo: 'https://github.com/summerpep/auramind',
    liveUrl: 'https://auramind.demo.app',
    teamName: 'NeuralCrafters',
    members: ['Alex Chen', 'Sophia Martinez'],
    techStack: ['React', 'Node.js', 'Python', 'LangChain', 'Pinecone'],
    submittedAt: '2026-07-20T14:30:00Z',
    status: 'evaluated',
    averageScore: 92.5,
    scores: [{ judgeId: 'usr_3', judgeName: 'Dr. Aris Thorne', innovation: 24, technical: 24, design: 18, impact: 18, presentation: 9, comments: 'Outstanding!' }]
  }
];

let teamPosts = [
  {
    id: 'tm_1',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Innovators Global Hackathon 2026',
    teamName: 'CyberSynergy',
    lookingFor: ['Frontend Architect (React)', 'ML Engineer (PyTorch)'],
    membersCount: 2,
    maxMembers: 4,
    description: 'We are building a smart contract auditor powered by fine-tuned LLMs.',
    createdBy: 'Alex Chen',
    contactEmail: 'alex@summerpep.io',
    skills: ['React', 'Python', 'FastAPI'],
    createdAt: '2026-07-18'
  }
];

// ─── Hackathons API ──────────────────────────────────────────────────────────
app.get('/api/hackathons', (req, res) => {
  res.json({ success: true, data: hackathons });
});

app.get('/api/hackathons/:id', (req, res) => {
  const item = hackathons.find(h => h.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Hackathon not found' });
  res.json({ success: true, data: item });
});

app.post('/api/hackathons', (req, res) => {
  const newHackathon = {
    id: `hk_${Date.now()}`,
    participantsCount: 0,
    teamsCount: 0,
    submissionsCount: 0,
    status: 'Live',
    banner: req.body.banner || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ...req.body
  };
  hackathons.unshift(newHackathon);
  res.status(201).json({ success: true, data: newHackathon });
});

// ─── Submissions API ─────────────────────────────────────────────────────────
app.get('/api/submissions', (req, res) => {
  let filtered = submissions;
  if (req.query.hackathonId) filtered = filtered.filter(s => s.hackathonId === req.query.hackathonId);
  res.json({ success: true, data: filtered });
});

app.post('/api/submissions', (req, res) => {
  const newSub = { id: `sub_${Date.now()}`, submittedAt: new Date().toISOString(), status: 'pending', scores: [], averageScore: 0, ...req.body };
  submissions.unshift(newSub);
  const hk = hackathons.find(h => h.id === req.body.hackathonId);
  if (hk) hk.submissionsCount += 1;
  res.status(201).json({ success: true, data: newSub });
});

// ─── Teams API ───────────────────────────────────────────────────────────────
app.get('/api/teams', (req, res) => {
  res.json({ success: true, data: teamPosts });
});

app.post('/api/teams', (req, res) => {
  const newPost = { id: `tm_${Date.now()}`, createdAt: new Date().toISOString().split('T')[0], ...req.body };
  teamPosts.unshift(newPost);
  res.status(201).json({ success: true, data: newPost });
});

app.listen(PORT, () => {
  console.log(`🚀 SummerPEP Backend running on http://localhost:${PORT}`);
});
