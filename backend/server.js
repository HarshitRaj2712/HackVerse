import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store initialized with default data
let hackathons = [
  {
    id: 'hk_1',
    title: 'AI Innovators Global Hackathon 2026',
    tagline: 'Build next-gen autonomous agents & generative AI solutions to shape the future.',
    description: 'Join thousands of builders worldwide to craft revolutionary AI applications using cutting-edge LLMs, multi-agent frameworks, and vector databases.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    organizer: 'SummerPEP AI Labs',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
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
      'All code submitted must be original or open-source libraries.',
      'Submissions must include a functional GitHub repository and a 3-minute video demo.'
    ]
  },
  {
    id: 'hk_2',
    title: 'Web3 & Decentralized Future Summit',
    tagline: 'Deploy smart contracts, zero-knowledge proofs, and decentralized infra.',
    description: 'Empowering open finance, privacy tech, and decentralized identity for the web of tomorrow.',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=150&q=80',
    organizer: 'BlockNexus Foundation',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
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
    rules: [
      'Smart contract code must be published on testnet.',
      'Open to global participants.'
    ]
  },
  {
    id: 'hk_3',
    title: 'GreenTech & Sustainable Climate Codeathon',
    tagline: 'Software & IoT solutions tackling renewable energy, carbon tracking, and ecology.',
    description: 'Use technology to accelerate decarbonization, ecological restoration, and environmental transparency.',
    banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&q=80',
    organizer: 'EcoTech Guild',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
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
    tagline: 'Collaborative AI agent network that writes, fact-checks, and synthesizes complex research papers.',
    description: 'AuraMind leverages distributed LLM agents using ReAct loops and vector databases to synthesize research papers, conduct citations validation, and produce Markdown digests in real-time.',
    demoVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    githubRepo: 'https://github.com/summerpep/auramind',
    liveUrl: 'https://auramind.demo.app',
    teamName: 'NeuralCrafters',
    members: ['Alex Chen', 'Sophia Martinez', 'Marcus Vance'],
    techStack: ['React', 'Node.js', 'Python', 'LangChain', 'Pinecone'],
    submittedAt: '2026-07-20T14:30:00Z',
    status: 'evaluated',
    averageScore: 92.5,
    scores: [
      {
        judgeId: 'usr_3',
        judgeName: 'Dr. Elena Rostova',
        innovation: 24,
        technical: 24,
        design: 18,
        impact: 18,
        presentation: 9,
        comments: 'Outstanding architecture and robust multi-agent execution loop!'
      }
    ]
  },
  {
    id: 'sub_2',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Innovators Global Hackathon 2026',
    title: 'PulseVision - Real-time Edge AI Health Diagnostic Tool',
    tagline: 'Computer vision pipeline for early thermal & optical anomaly detection on edge devices.',
    description: 'PulseVision brings lightweight TensorFlow Lite models to embedded hardware for non-invasive monitoring.',
    demoVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    githubRepo: 'https://github.com/summerpep/pulsevision',
    liveUrl: 'https://pulsevision.io',
    teamName: 'EdgeMasters',
    members: ['Alex Chen', 'Liam O\'Connor'],
    techStack: ['WebAssembly', 'TensorFlow.js', 'React', 'Tailwind'],
    submittedAt: '2026-07-22T09:15:00Z',
    status: 'pending',
    averageScore: 0,
    scores: []
  }
];

let teamPosts = [
  {
    id: 'tm_1',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Innovators Global Hackathon 2026',
    teamName: 'CyberSynergy',
    lookingFor: ['Frontend Architect (React / Tailwind)', 'ML Engineer (PyTorch)'],
    membersCount: 2,
    maxMembers: 4,
    description: 'We are building a smart contract auditor powered by fine-tuned LLMs. Need a talented UI developer to craft an interactive dashboard!',
    createdBy: 'Alex Chen',
    contactEmail: 'alex@summerpep.io',
    skills: ['React', 'Python', 'FastAPI', 'PyTorch'],
    createdAt: '2026-07-18'
  },
  {
    id: 'tm_2',
    hackathonId: 'hk_2',
    hackathonTitle: 'Web3 & Decentralized Future Summit',
    teamName: 'ZeroKnowledge Collective',
    lookingFor: ['Solidity Developer', 'UI/UX Designer'],
    membersCount: 1,
    maxMembers: 3,
    description: 'Building zk-rollup privacy bridge for decentralized identity verification. Join us to win the Grand Prize!',
    createdBy: 'Sophia Martinez',
    contactEmail: 'sophia@blocknexus.io',
    skills: ['Solidity', 'Circom', 'TypeScript', 'Ethers.js'],
    createdAt: '2026-07-21'
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SummerPEP Backend Server is healthy & running!' });
});

// Hackathons API
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
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    timeline: [
      { phase: 'Registration Opens', date: 'Today', completed: true },
      { phase: 'Hacking Active', date: req.body.endDate || 'Next Month', completed: false, active: true },
      { phase: 'Judging Phase', date: 'TBA', completed: false },
      { phase: 'Winners Announced', date: 'TBA', completed: false }
    ],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    ...req.body
  };
  hackathons.unshift(newHackathon);
  res.status(201).json({ success: true, data: newHackathon });
});

// Submissions API
app.get('/api/submissions', (req, res) => {
  let filtered = submissions;
  if (req.query.hackathonId) {
    filtered = filtered.filter(s => s.hackathonId === req.query.hackathonId);
  }
  res.json({ success: true, data: filtered });
});

app.post('/api/submissions', (req, res) => {
  const newSub = {
    id: `sub_${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    scores: [],
    averageScore: 0,
    ...req.body
  };
  submissions.unshift(newSub);

  // Update hackathon count
  const hk = hackathons.find(h => h.id === req.body.hackathonId);
  if (hk) hk.submissionsCount += 1;

  res.status(201).json({ success: true, data: newSub });
});

// Team Posts API
app.get('/api/teams', (req, res) => {
  res.json({ success: true, data: teamPosts });
});

app.post('/api/teams', (req, res) => {
  const newPost = {
    id: `tm_${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    ...req.body
  };
  teamPosts.unshift(newPost);
  res.status(201).json({ success: true, data: newPost });
});

app.listen(PORT, () => {
  console.log(`SummerPEP Backend Server running on http://localhost:${PORT}`);
});
