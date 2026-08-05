import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialHackathons, initialTeamPosts, initialNotifications } from '../data/mockData';
import toast from 'react-hot-toast';
import { api } from '../services/api';

const HackathonContext = createContext();

export const HackathonProvider = ({ children }) => {
  const [hackathons, setHackathons] = useState(() => {
    const saved = localStorage.getItem('summerpep_hackathons');
    return saved ? JSON.parse(saved) : initialHackathons;
  });

  // Submissions state starts empty (or loaded from backend/localStorage) - no dummy data forced
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const [teamPosts, setTeamPosts] = useState(() => {
    const saved = localStorage.getItem('summerpep_teams');
    return saved ? JSON.parse(saved) : initialTeamPosts;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('summerpep_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Fetch real submissions from backend MongoDB API on mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await api.get('/submissions');
      if (res.data.success) {
        setSubmissions(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch submissions from server, using local state.');
      const saved = localStorage.getItem('summerpep_submissions');
      if (saved) setSubmissions(JSON.parse(saved));
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('summerpep_hackathons', JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem('summerpep_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('summerpep_teams', JSON.stringify(teamPosts));
  }, [teamPosts]);

  useEffect(() => {
    localStorage.setItem('summerpep_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const createHackathon = (newHackathonData) => {
    const newHackathon = {
      id: `hk_${Date.now()}`,
      participantsCount: 0,
      teamsCount: 0,
      submissionsCount: 0,
      status: 'Live',
      banner: newHackathonData.banner || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      judges: ['usr_3', 'usr_4'],
      timeline: [
        { phase: 'Registration Opens', date: 'Today', completed: true },
        { phase: 'Hacking Active', date: newHackathonData.endDate || 'Next Month', completed: false, active: true },
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
      rules: [
        'Teams can consist of 1 to 4 members.',
        'Must include public open-source repository and video demonstration.'
      ],
      ...newHackathonData
    };

    setHackathons(prev => [newHackathon, ...prev]);
    toast.success('Hackathon created & published successfully!');
    return newHackathon.id;
  };

  const registerForHackathon = (hackathonId, user) => {
    setHackathons(prev => prev.map(h => {
      if (h.id === hackathonId) {
        return { ...h, participantsCount: h.participantsCount + 1 };
      }
      return h;
    }));

    const newNotif = {
      id: `notif_${Date.now()}`,
      userId: user.id || user._id,
      title: 'Registration Confirmed!',
      message: `You are officially registered for the hackathon. Happy hacking!`,
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success('Successfully registered for Hackathon!');
  };

  // Submit project (POST to backend API + update local state)
  const submitProject = async (submissionData, token) => {
    try {
      const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await api.post('/submissions', submissionData, headers);
      if (res.data.success) {
        const savedSub = res.data.data;
        setSubmissions(prev => [savedSub, ...prev]);

        // Increment hackathon submission count
        setHackathons(prev => prev.map(h => {
          if (h.id === submissionData.hackathonId) {
            return { ...h, submissionsCount: (h.submissionsCount || 0) + 1 };
          }
          return h;
        }));

        toast.success('Project submitted successfully! It is now listed for review.');
        return savedSub;
      }
    } catch (err) {
      console.warn('Backend submission error, saving locally:', err);
      // Fallback local save if offline
      const newSub = {
        id: `sub_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        scores: [],
        averageScore: 0,
        ...submissionData
      };
      setSubmissions(prev => [newSub, ...prev]);
      toast.success('Project submitted successfully!');
      return newSub;
    }
  };

  // Submit judge score
  const submitJudgeScore = async (submissionId, scoreData, judgeUser, token) => {
    try {
      const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await api.post(`/submissions/${submissionId}/evaluate`, scoreData, headers);
      if (res.data.success) {
        const updatedSub = res.data.data;
        setSubmissions(prev => prev.map(s => (s._id === submissionId || s.id === submissionId) ? updatedSub : s));
        toast.success('Evaluation submitted successfully!');
        return;
      }
    } catch (err) {
      console.warn('Evaluation API error, updating local state:', err);
    }

    // Local fallback
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId || sub._id === submissionId) {
        const existingIndex = sub.scores?.findIndex(s => s.judgeId === (judgeUser.id || judgeUser._id)) ?? -1;
        let updatedScores = sub.scores ? [...sub.scores] : [];

        const totalScore = (Number(scoreData.innovationScore || 0) + Number(scoreData.technicalScore || 0) + Number(scoreData.impactScore || 0) + Number(scoreData.presentationScore || 0));

        const scoreObj = {
          judgeId: judgeUser.id || judgeUser._id,
          judgeName: judgeUser.fullName || judgeUser.name,
          totalScore,
          ...scoreData
        };

        if (existingIndex >= 0) {
          updatedScores[existingIndex] = scoreObj;
        } else {
          updatedScores.push(scoreObj);
        }

        const avg = Math.round((updatedScores.reduce((acc, c) => acc + (c.totalScore || 0), 0) / updatedScores.length) * 10) / 10;

        return {
          ...sub,
          scores: updatedScores,
          averageScore: avg,
          status: 'evaluated'
        };
      }
      return sub;
    }));

    toast.success('Evaluation submitted successfully!');
  };

  const createTeamPost = (postData) => {
    const newPost = {
      id: `tm_${Date.now()}`,
      ...postData
    };
    setTeamPosts(prev => [newPost, ...prev]);
    toast.success('Team request posted to Team Finder!');
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const updateHackathonStatus = (hackathonId, newStatus) => {
    setHackathons(prev => prev.map(h => h.id === hackathonId ? { ...h, status: newStatus } : h));
    toast.success(`Hackathon status updated to "${newStatus}"`);
  };

  const deleteHackathon = (hackathonId) => {
    setHackathons(prev => prev.filter(h => h.id !== hackathonId));
  };

  return (
    <HackathonContext.Provider value={{
      hackathons,
      submissions,
      loadingSubmissions,
      teamPosts,
      notifications,
      fetchSubmissions,
      createHackathon,
      registerForHackathon,
      submitProject,
      submitJudgeScore,
      createTeamPost,
      markNotificationRead,
      updateHackathonStatus,
      deleteHackathon,
    }}>
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathons = () => {
  const context = useContext(HackathonContext);
  if (!context) throw new Error('useHackathons must be used within a HackathonProvider');
  return context;
};
