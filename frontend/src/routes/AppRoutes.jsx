import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { ExploreHackathons } from '../pages/Hackathons/ExploreHackathons';
import { HackathonDetails } from '../pages/Hackathons/HackathonDetails';
import { TeamFinder } from '../pages/Hackathons/TeamFinder';
import { Leaderboard } from '../pages/Hackathons/Leaderboard';
import { ParticipantDashboard } from '../pages/Participant/ParticipantDashboard';
import { SubmitProject } from '../pages/Participant/SubmitProject';
import { OrganizerDashboard } from '../pages/Organizer/OrganizerDashboard';
import { CreateHackathon } from '../pages/Organizer/CreateHackathon';
import { JudgeDashboard } from '../pages/Judge/JudgeDashboard';
import { EvaluationStudio } from '../pages/Judge/EvaluationStudio';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import { LoginPage } from '../pages/Auth/LoginPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hackathons" element={<ExploreHackathons />} />
      <Route path="/hackathons/:id" element={<HackathonDetails />} />
      <Route path="/team-finder" element={<TeamFinder />} />
      <Route path="/leaderboards" element={<Leaderboard />} />
      <Route path="/leaderboards/:hackathonId" element={<Leaderboard />} />

      {/* Participant */}
      <Route path="/participant" element={<ParticipantDashboard />} />
      <Route path="/participant/submit/:hackathonId" element={<SubmitProject />} />

      {/* Organizer */}
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/organizer/create" element={<CreateHackathon />} />

      {/* Judge */}
      <Route path="/judge" element={<JudgeDashboard />} />
      <Route path="/judge/evaluate/:submissionId" element={<EvaluationStudio />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
