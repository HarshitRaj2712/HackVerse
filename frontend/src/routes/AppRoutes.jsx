import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { Home } from '../pages/Home/Home';
import { ExploreHackathons } from '../pages/Hackathons/ExploreHackathons';
import { HackathonDetails } from '../pages/Hackathons/HackathonDetails';
import { TeamFinder } from '../pages/Hackathons/TeamFinder';
import { Leaderboard } from '../pages/Hackathons/Leaderboard';

// Auth Pages
import { LoginPage } from '../pages/Auth/LoginPage';
import { SignupPage } from '../pages/Auth/SignupPage';

// Role-Specific Pages
import { ParticipantDashboard } from '../pages/Participant/ParticipantDashboard';
import { SubmitProject } from '../pages/Participant/SubmitProject';
import { OrganizerDashboard } from '../pages/Organizer/OrganizerDashboard';
import { CreateHackathon } from '../pages/Organizer/CreateHackathon';
import { JudgeDashboard } from '../pages/Judge/JudgeDashboard';
import { EvaluationStudio } from '../pages/Judge/EvaluationStudio';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public Routes ──────────────────────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/hackathons" element={<ExploreHackathons />} />
      <Route path="/hackathons/:id" element={<HackathonDetails />} />
      <Route path="/team-finder" element={<TeamFinder />} />
      <Route path="/leaderboards" element={<Leaderboard />} />
      <Route path="/leaderboards/:hackathonId" element={<Leaderboard />} />

      {/* ── Auth Routes ────────────────────────────────────────────────── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ── Participant Routes ─────────────────────────────────────────── */}
      <Route path="/participant" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <ParticipantDashboard />
        </ProtectedRoute>
      } />
      <Route path="/participant/submit/:hackathonId" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <SubmitProject />
        </ProtectedRoute>
      } />

      {/* ── Organizer Routes ───────────────────────────────────────────── */}
      <Route path="/organizer" element={
        <ProtectedRoute allowedRoles={['organizer']}>
          <OrganizerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/organizer/create" element={
        <ProtectedRoute allowedRoles={['organizer']}>
          <CreateHackathon />
        </ProtectedRoute>
      } />

      {/* ── Judge Routes ───────────────────────────────────────────────── */}
      <Route path="/judge" element={
        <ProtectedRoute allowedRoles={['judge']}>
          <JudgeDashboard />
        </ProtectedRoute>
      } />
      <Route path="/judge/evaluate/:submissionId" element={
        <ProtectedRoute allowedRoles={['judge']}>
          <EvaluationStudio />
        </ProtectedRoute>
      } />

      {/* ── Admin Routes ───────────────────────────────────────────────── */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* ── Fallback ───────────────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
