import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialHackathons, initialSubmissions, initialTeamPosts, initialNotifications } from '../data/mockData';
import toast from 'react-hot-toast';

const HackathonContext = createContext();

export const HackathonProvider = ({ children }) => {
  const [hackathons, setHackathons] = useState(() => {
    const saved = localStorage.getItem('summerpep_hackathons');
    return saved ? JSON.parse(saved) : initialHackathons;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('summerpep_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [teamPosts, setTeamPosts] = useState(() => {
    const saved = localStorage.getItem('summerpep_teams');
    return saved ? JSON.parse(saved) : initialTeamPosts;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('summerpep_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

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

    // Add notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      userId: user.id,
      title: 'Registration Confirmed!',
      message: `You are officially registered for the hackathon. Happy hacking!`,
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success('Successfully registered for Hackathon!');
  };

  const submitProject = (submissionData) => {
    const newSub = {
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      scores: [],
      averageScore: 0,
      ...submissionData
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Increment submission count on hackathon
    setHackathons(prev => prev.map(h => {
      if (h.id === submissionData.hackathonId) {
        return { ...h, submissionsCount: h.submissionsCount + 1 };
      }
      return h;
    }));

    toast.success('Project submitted successfully! Judges will review your project.');
    return newSub;
  };

  const submitJudgeScore = (submissionId, scoreData, judgeUser) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        // Check if judge already scored
        const existingIndex = sub.scores.findIndex(s => s.judgeId === judgeUser.id);
        let updatedScores = [...sub.scores];

        const scoreObj = {
          judgeId: judgeUser.id,
          judgeName: judgeUser.name,
          ...scoreData
        };

        if (existingIndex >= 0) {
          updatedScores[existingIndex] = scoreObj;
        } else {
          updatedScores.push(scoreObj);
        }

        // Calculate average score out of 100
        const totalSum = updatedScores.reduce((acc, curr) => {
          const s = (curr.innovation || 0) + (curr.technical || 0) + (curr.design || 0) + (curr.impact || 0) + (curr.presentation || 0);
          return acc + s;
        }, 0);

        const avg = Math.round((totalSum / updatedScores.length) * 10) / 10;

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

  return (
    <HackathonContext.Provider value={{
      hackathons,
      submissions,
      teamPosts,
      notifications,
      createHackathon,
      registerForHackathon,
      submitProject,
      submitJudgeScore,
      createTeamPost,
      markNotificationRead,
      updateHackathonStatus
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
