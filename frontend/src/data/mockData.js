export const initialUsers = [
  {
    id: 'usr_1',
    name: 'Alex Chen',
    email: 'alex.chen@hackverse.io',
    role: 'participant',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    title: 'Full Stack & AI Engineer',
    skills: ['React', 'Python', 'PyTorch', 'Node.js', 'TailwindCSS'],
    bio: 'Passionate about building AI-driven developer tools and decentralized platforms.',
    registeredHackathons: ['hk_1', 'hk_2'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'usr_2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techforge.org',
    role: 'organizer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    title: 'Head of Global Developer Relations',
    company: 'TechForge Global',
    bio: 'Organizing world-class developer hackathons with $500k+ in awarded prizes.',
    organizedHackathons: ['hk_1', 'hk_4'],
  },
  {
    id: 'usr_3',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@ai-lab.edu',
    role: 'judge',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    title: 'Principal AI Researcher & Partner at NexusVentures',
    expertise: ['Generative AI', 'Computer Vision', 'Scalable Systems', 'UX Design'],
    bio: '15+ years in Machine Learning and VC angel investor evaluating cutting-edge innovations.',
    assignedHackathons: ['hk_1', 'hk_3'],
  },
  {
    id: 'usr_4',
    name: 'Elena Rostova',
    email: 'elena.r@web3nexus.io',
    role: 'judge',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    title: 'VP of Engineering at CloudScale',
    expertise: ['Distributed Systems', 'Cloud Infrastructure', 'Web3', 'Product Strategy'],
    bio: 'Tech enthusiast and active hackathon mentor passionate about scalable architectures.',
    assignedHackathons: ['hk_1', 'hk_2'],
  },
  {
    id: 'usr_5',
    name: 'Marcus Vance',
    email: 'admin@summerpep.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    title: 'SummerPEP Platform Administrator',
    bio: 'Managing global hackathon infrastructure, security, and partnership compliance.',
  }
];

export const initialHackathons = [
  {
    id: 'hk_1',
    title: 'AI Horizon Global Summit 2026',
    tagline: 'Build next-generation autonomous AI agents, multimodal apps, and edge intelligence.',
    organizerId: 'usr_2',
    organizerName: 'TechForge Global',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    category: 'AI/ML',
    mode: 'Online',
    status: 'Live', // Upcoming, Live, Judging, Ended
    startDate: '2026-07-20',
    endDate: '2026-08-10',
    submissionDeadline: '2026-08-08T23:59:00',
    prizePool: '$75,000',
    participantsCount: 1420,
    teamsCount: 380,
    submissionsCount: 94,
    location: 'Global (Virtual)',
    description: `AI Horizon 2026 invites developers, researchers, and creators worldwide to pioneer new boundaries in AI. Whether you are crafting specialized LLM autonomous agents, multimodal generative tools, or lightweight models running on edge devices, this is your playground.

Work individually or in teams of up to 4. Win cash prizes, cloud compute credits, seed funding opportunities, and direct interviews with top tech firms.`,
    tracks: [
      { id: 'trk_1', name: 'Autonomous Agents & Workflows', prize: '$30,000', description: 'Multi-agent systems solving complex multi-step reasoning tasks.' },
      { id: 'trk_2', name: 'Multimodal Generative Media', prize: '$25,000', description: 'Next-gen video, audio, and 3D generation tools.' },
      { id: 'trk_3', name: 'Edge AI & On-Device ML', prize: '$20,000', description: 'Optimized models for mobile, IoT, and privacy-first local hardware.' }
    ],
    timeline: [
      { phase: 'Registration Opens', date: 'Jul 01, 2026', completed: true },
      { phase: 'Hacking Begins & Kickoff Stream', date: 'Jul 20, 2026', completed: true },
      { phase: 'Submission Deadline', date: 'Aug 08, 2026', completed: false, active: true },
      { phase: 'Judge Evaluation Period', date: 'Aug 09 - Aug 11, 2026', completed: false },
      { phase: 'Grand Finale & Live Ceremony', date: 'Aug 12, 2026', completed: false }
    ],
    judges: ['usr_3', 'usr_4'],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25, description: 'How novel and unique is the concept?' },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25, description: 'Code quality, model fine-tuning, architecture complexity.' },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20, description: 'Usability, visual appeal, and smooth interaction flow.' },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20, description: 'Real-world problem solving capability and market potential.' },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10, description: 'Clarity of pitch, demo video, and documentation.' }
    ],
    rules: [
      'Teams can consist of 1 to 4 participants.',
      'All code must be written during the hackathon timeframe or open-sourced pre-existing libraries declared.',
      'Submissions must include a public GitHub repository and a 2-3 minute video demonstration.',
      'Use of AI APIs (OpenAI, Anthropic, Gemini, Hugging Face) is encouraged.'
    ]
  },
  {
    id: 'hk_2',
    title: 'Web3 & Decentralized Future Hackathon',
    tagline: 'Architect high-throughput dApps, zero-knowledge proofs, and cross-chain protocols.',
    organizerId: 'usr_2',
    organizerName: 'Web3 Builders Guild',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=150&q=80',
    category: 'Web3',
    mode: 'Hybrid',
    status: 'Live',
    startDate: '2026-07-15',
    endDate: '2026-08-05',
    submissionDeadline: '2026-08-04T23:59:00',
    prizePool: '$100,000',
    participantsCount: 890,
    teamsCount: 210,
    submissionsCount: 45,
    location: 'San Francisco, CA & Online',
    tracks: [
      { id: 'trk_4', name: 'Zero-Knowledge Privacy', prize: '$40,000', description: 'ZK-SNARK apps for identity and verifiable computing.' },
      { id: 'trk_5', name: 'DeFi 2.0 & Real World Assets', prize: '$35,000', description: 'Tokenized financial primitives and automated market makers.' },
      { id: 'trk_6', name: 'DePIN & Decentralized Compute', prize: '$25,000', description: 'Infrastructure hardware networks and storage systems.' }
    ],
    timeline: [
      { phase: 'Team Formation', date: 'Jul 10, 2026', completed: true },
      { phase: 'Hacking Period', date: 'Jul 15 - Aug 04', completed: true, active: true },
      { phase: 'Judging Phase', date: 'Aug 05, 2026', completed: false }
    ],
    judges: ['usr_4'],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: [
      'Smart contracts must be deployed to testnet or mainnet.',
      'Open source repository required with MIT or Apache License.'
    ]
  },
  {
    id: 'hk_3',
    title: 'HealthTech & BioInnovation Challenge',
    tagline: 'Transforming patient diagnostics, telemedicine, and medical imaging with smart software.',
    organizerId: 'usr_2',
    organizerName: 'BioHealth Foundation',
    banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&q=80',
    category: 'Health',
    mode: 'Online',
    status: 'Upcoming',
    startDate: '2026-08-15',
    endDate: '2026-08-30',
    submissionDeadline: '2026-08-29T23:59:00',
    prizePool: '$50,000',
    participantsCount: 650,
    teamsCount: 140,
    submissionsCount: 0,
    location: 'Global (Virtual)',
    tracks: [
      { id: 'trk_7', name: 'AI Medical Imaging Diagnostics', prize: '$25,000', description: 'Automated detection in X-rays, MRI, and pathology slides.' },
      { id: 'trk_8', name: 'Patient Remote Monitoring', prize: '$25,000', description: 'Wearable data integration and real-time triage alerts.' }
    ],
    timeline: [
      { phase: 'Registrations Open', date: 'Jul 25, 2026', completed: true, active: true },
      { phase: 'Hacking Starts', date: 'Aug 15, 2026', completed: false }
    ],
    judges: ['usr_3'],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: [
      'Data privacy guidelines (HIPAA/GDPR compliance) must be considered for patient data handling.'
    ]
  },
  {
    id: 'hk_4',
    title: 'CleanEnergy & Climate Hack 2026',
    tagline: 'Building software for carbon accounting, grid optimization, and renewable tracking.',
    organizerId: 'usr_2',
    organizerName: 'EcoTech Alliance',
    banner: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=150&q=80',
    category: 'Sustainability',
    mode: 'Online',
    status: 'Ended',
    startDate: '2026-06-01',
    endDate: '2026-06-25',
    submissionDeadline: '2026-06-24T23:59:00',
    prizePool: '$40,000',
    participantsCount: 1100,
    teamsCount: 290,
    submissionsCount: 82,
    location: 'Global (Virtual)',
    tracks: [
      { id: 'trk_9', name: 'Smart Microgrid Management', prize: '$20,000', description: 'Load balancing algorithms for solar and wind networks.' },
      { id: 'trk_10', name: 'Supply Chain Carbon Tracking', prize: '$20,000', description: 'Verifiable emissions measurement for logistics.' }
    ],
    timeline: [
      { phase: 'Hacking Concluded', date: 'Jun 24, 2026', completed: true },
      { phase: 'Winners Announced', date: 'Jun 26, 2026', completed: true }
    ],
    judges: ['usr_3', 'usr_4'],
    rubricCriteria: [
      { id: 'crit_1', name: 'Innovation & Originality', maxScore: 25 },
      { id: 'crit_2', name: 'Technical Execution & Depth', maxScore: 25 },
      { id: 'crit_3', name: 'UI / UX & Design Polish', maxScore: 20 },
      { id: 'crit_4', name: 'Practical Impact & Utility', maxScore: 20 },
      { id: 'crit_5', name: 'Presentation & Demo Video', maxScore: 10 }
    ],
    rules: []
  }
];

export const initialSubmissions = [
  {
    id: 'sub_1',
    hackathonId: 'hk_1',
    title: 'AuraMind AI - Autonomous Task Assistant',
    tagline: 'An intelligent multi-agent framework that plans, executes browser automation, and drafts reports autonomously.',
    teamName: 'Neural Ninjas',
    members: ['Alex Chen', 'Priya Sharma', 'David Kim'],
    trackId: 'trk_1',
    trackName: 'Autonomous Agents & Workflows',
    githubUrl: 'https://github.com/alexchen/auramind-ai',
    demoUrl: 'https://auramind.demo.app',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pitchDeckUrl: 'https://slideshare.net/deck/auramind',
    techStack: ['Python', 'FastAPI', 'LangChain', 'React', 'TailwindCSS', 'PostgreSQL'],
    description: `AuraMind AI uses a graph-based multi-agent architecture where specialized nodes execute browser interactions, extract structured JSON data, synthesize findings into formatted PDF reports, and alert human operators via Slack when user approval is required.`,
    submittedAt: '2026-07-26T14:30:00Z',
    status: 'evaluated', // pending, evaluated, winner
    award: '1st Place Winner ($30,000)',
    scores: [
      { judgeId: 'usr_3', judgeName: 'Dr. Aris Thorne', innovation: 24, technical: 25, design: 18, impact: 20, presentation: 10, feedback: 'Phenomenal agent orchestration with robust fail-safes. The human-in-the-loop approval mechanism is production ready!' },
      { judgeId: 'usr_4', judgeName: 'Elena Rostova', innovation: 23, technical: 24, design: 19, impact: 19, presentation: 9, feedback: 'Sleek dashboard interface paired with impressive zero-shot task planning.' }
    ],
    averageScore: 95.5
  },
  {
    id: 'sub_2',
    hackathonId: 'hk_1',
    title: 'VisionCraft - Real-Time 3D World Gen',
    tagline: 'Transform text prompts and 2D sketches into textured 3D glTF meshes inside WebGL in real time.',
    teamName: 'PixelAlchemy',
    members: ['Elena Vance', 'Leo Zhang'],
    trackId: 'trk_2',
    trackName: 'Multimodal Generative Media',
    githubUrl: 'https://github.com/pixelalchemy/visioncraft',
    demoUrl: 'https://visioncraft.io',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pitchDeckUrl: '',
    techStack: ['Three.js', 'PyTorch', 'WebGPU', 'React', 'FastAPI'],
    description: `VisionCraft bridges diffusion-based depth estimation with instant 3D mesh rendering directly in the user browser using WebGPU shader pipelines.`,
    submittedAt: '2026-07-26T18:12:00Z',
    status: 'evaluated',
    award: 'Runner Up ($15,000)',
    scores: [
      { judgeId: 'usr_3', judgeName: 'Dr. Aris Thorne', innovation: 22, technical: 23, design: 20, impact: 17, presentation: 9, feedback: 'Incredible WebGPU performance optimization! Mesh generation is smooth.' },
      { judgeId: 'usr_4', judgeName: 'Elena Rostova', innovation: 24, technical: 22, design: 18, impact: 18, presentation: 8, feedback: 'Great creative workflow tool for indie game developers.' }
    ],
    averageScore: 90.5
  },
  {
    id: 'sub_3',
    hackathonId: 'hk_1',
    title: 'NanoVoice AI - Ultra-low Latency On-Device Speech',
    tagline: 'Quantized 15M parameter speech synthesis model executing under 20ms on iOS & Android hardware.',
    teamName: 'EdgeWave Lab',
    members: ['Marcus Brody', 'Sophia Patel'],
    trackId: 'trk_3',
    trackName: 'Edge AI & On-Device ML',
    githubUrl: 'https://github.com/edgewave/nanovoice',
    demoUrl: 'https://nanovoice.ai',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pitchDeckUrl: '',
    techStack: ['C++', 'ONNX Runtime', 'CoreML', 'React Native'],
    description: `NanoVoice allows off-grid private voice synthesis without transmitting audio bytes to remote cloud API servers.`,
    submittedAt: '2026-07-27T01:05:00Z',
    status: 'pending',
    scores: [],
    averageScore: 0
  },
  {
    id: 'sub_4',
    hackathonId: 'hk_2',
    title: 'ZeroVault - Anonymous ZK Identity Attestation',
    tagline: 'Prove identity compliance (KYC, credit rating) without revealing raw personal identification.',
    teamName: 'Crypton',
    members: ['Alex Chen', 'Sven Lindqvist'],
    trackId: 'trk_4',
    trackName: 'Zero-Knowledge Privacy',
    githubUrl: 'https://github.com/alexchen/zerovault',
    demoUrl: 'https://zerovault.network',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pitchDeckUrl: '',
    techStack: ['Circom', 'SnarkJS', 'Solidity', 'Ethers.js', 'React'],
    description: `ZeroVault empowers users to generate lightweight zero-knowledge proofs directly in browser extension storage to satisfy dApp accreditation checks.`,
    submittedAt: '2026-07-25T11:00:00Z',
    status: 'evaluated',
    award: 'Best ZK Application ($20,000)',
    scores: [
      { judgeId: 'usr_4', judgeName: 'Elena Rostova', innovation: 25, technical: 24, design: 17, impact: 20, presentation: 8, feedback: 'Clean Circom circuit definitions and smooth mobile wallet signature integration.' }
    ],
    averageScore: 94.0
  }
];

export const initialTeamPosts = [
  {
    id: 'tm_1',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Horizon Global Summit 2026',
    teamName: 'Agentic Force',
    creatorName: 'Carlos Rodriguez',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    lookingFor: ['Frontend / UI Designer', 'PyTorch / ML Specialist'],
    ideaDescription: 'Building a collaborative AI coding assistant that auto-generates unit tests and pulls mock APIs for backend routes.',
    currentMembersCount: 2,
    maxMembers: 4,
    contactInfo: 'Discord: @carlos_ai / Email: carlos@agenticforce.dev'
  },
  {
    id: 'tm_2',
    hackathonId: 'hk_1',
    hackathonTitle: 'AI Horizon Global Summit 2026',
    teamName: 'Edge Visionaries',
    creatorName: 'Amara Okafor',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    lookingFor: ['C++ / CoreML Developer', 'Video Pitch Specialist'],
    ideaDescription: 'Real-time gesture recognition model optimized for low-power Smart Glasses.',
    currentMembersCount: 3,
    maxMembers: 4,
    contactInfo: 'Email: amara@edgevision.org'
  },
  {
    id: 'tm_3',
    hackathonId: 'hk_2',
    hackathonTitle: 'Web3 & Decentralized Future Hackathon',
    teamName: 'ZeroState Protocol',
    creatorName: 'Viktor Vance',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    lookingFor: ['Solidity Developer', 'React / Ethers.js Developer'],
    ideaDescription: 'Decentralized carbon credit marketplace with instant ZK provenance validation.',
    currentMembersCount: 1,
    maxMembers: 4,
    contactInfo: 'Telegram: @viktor_zerostate'
  }
];

export const initialNotifications = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    title: 'Project Evaluated!',
    message: 'Your submission "AuraMind AI" has been evaluated by Dr. Aris Thorne with a score of 96/100.',
    date: '10 minutes ago',
    read: false
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    title: 'Hackathon Live',
    message: 'AI Horizon Global Summit 2026 has entered the final submission phase.',
    date: '2 hours ago',
    read: true
  },
  {
    id: 'notif_3',
    userId: 'usr_3',
    title: 'New Project Assigned for Review',
    message: 'Submission "NanoVoice AI" was assigned to your judging queue.',
    date: '1 hour ago',
    read: false
  }
];
