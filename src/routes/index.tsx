import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { SkeletonCard, SkeletonResume } from '../components/skeletons/SkeletonLoaders';

// Lazy-loaded System Pages
const LoginPage = lazy(() => import('../pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage })));
const ServerErrorPage = lazy(() => import('../pages/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage })));
const OfflinePage = lazy(() => import('../pages/OfflinePage').then((m) => ({ default: m.OfflinePage })));
const MaintenancePage = lazy(() => import('../pages/MaintenancePage').then((m) => ({ default: m.MaintenancePage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Lazy-loaded SaaS Portal Dashboards
const ExecutiveDashboardPage = lazy(() =>
  import('../features/dashboard/pages/ExecutiveDashboardPage').then((m) => ({ default: m.ExecutiveDashboardPage }))
);
const CareerDashboardPage = lazy(() =>
  import('../features/career/pages/CareerDashboardPage').then((m) => ({ default: m.CareerDashboardPage }))
);
const RecruiterWorkspacePage = lazy(() =>
  import('../features/recruiter/pages/RecruiterWorkspacePage').then((m) => ({ default: m.RecruiterWorkspacePage }))
);
const AdminDashboardPage = lazy(() =>
  import('../features/admin/pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);

// Lazy-loaded Resume Feature Pages
const ResumeDashboardPage = lazy(() =>
  import('../features/resume/pages/ResumeDashboardPage').then((m) => ({ default: m.ResumeDashboardPage }))
);
const ResumeLibraryPage = lazy(() =>
  import('../features/resume/pages/ResumeLibraryPage').then((m) => ({ default: m.ResumeLibraryPage }))
);
const ResumeUploadPage = lazy(() =>
  import('../features/resume/pages/ResumeUploadPage').then((m) => ({ default: m.ResumeUploadPage }))
);
const ResumeDetailsPage = lazy(() =>
  import('../features/resume/pages/ResumeDetailsPage').then((m) => ({ default: m.ResumeDetailsPage }))
);
const ResumeAnalysisPage = lazy(() =>
  import('../features/resume/pages/ResumeAnalysisPage').then((m) => ({ default: m.ResumeAnalysisPage }))
);

// Pipeline Steps: Job Description, Matching Engine & Supervisor Pre-flight
const JDUploadPage = lazy(() =>
  import('../features/jd/pages/JDUploadPage').then((m) => ({ default: m.JDUploadPage }))
);
const JDDetailsPage = lazy(() =>
  import('../features/jd/pages/JDDetailsPage').then((m) => ({ default: m.JDDetailsPage }))
);
const MatchingEnginePage = lazy(() =>
  import('../features/matching/pages/MatchingEnginePage').then((m) => ({ default: m.MatchingEnginePage }))
);
const SupervisorPreflightPage = lazy(() =>
  import('../features/supervisor/pages/SupervisorPreflightPage').then((m) => ({ default: m.SupervisorPreflightPage }))
);

// Lazy-loaded Interview Feature Pages
const InterviewLobbyPage = lazy(() =>
  import('../features/interview/pages/InterviewLobbyPage').then((m) => ({ default: m.InterviewLobbyPage }))
);
const LiveInterviewPage = lazy(() =>
  import('../features/interview/pages/LiveInterviewPage').then((m) => ({ default: m.LiveInterviewPage }))
);
const VoiceInterviewPage = lazy(() =>
  import('../features/interview/pages/VoiceInterviewPage').then((m) => ({ default: m.VoiceInterviewPage }))
);
const TranscriptViewerPage = lazy(() =>
  import('../features/interview/pages/TranscriptViewerPage').then((m) => ({ default: m.TranscriptViewerPage }))
);
const InterviewFinishedPage = lazy(() =>
  import('../features/interview/pages/InterviewFinishedPage').then((m) => ({ default: m.InterviewFinishedPage }))
);
const InterviewAnalyticsPage = lazy(() =>
  import('../features/interview/pages/InterviewAnalyticsPage').then((m) => ({ default: m.InterviewAnalyticsPage }))
);

import { AdminRoute } from './AdminRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RecruiterRoute } from './RecruiterRoute';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8"><SkeletonCard /></div>}>
        <Routes>
          {/* Public Authentication Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<PageTransitionWrapper><LoginPage /></PageTransitionWrapper>} />
            <Route path="/register" element={<PageTransitionWrapper><RegisterPage /></PageTransitionWrapper>} />
          </Route>

          {/* System Error Pages */}
          <Route path="/403" element={<PageTransitionWrapper><UnauthorizedPage /></PageTransitionWrapper>} />
          <Route path="/500" element={<PageTransitionWrapper><ServerErrorPage /></PageTransitionWrapper>} />
          <Route path="/offline" element={<PageTransitionWrapper><OfflinePage /></PageTransitionWrapper>} />
          <Route path="/maintenance" element={<PageTransitionWrapper><MaintenancePage /></PageTransitionWrapper>} />

          {/* Protected Application Shell */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<PageTransitionWrapper><ExecutiveDashboardPage /></PageTransitionWrapper>} />

              {/* Step 1: Resume Intelligence Feature Routes */}
              <Route path="/resumes" element={<PageTransitionWrapper><ResumeDashboardPage /></PageTransitionWrapper>} />
              <Route path="/resumes/library" element={<PageTransitionWrapper><ResumeLibraryPage /></PageTransitionWrapper>} />
              <Route path="/resumes/upload" element={<PageTransitionWrapper><ResumeUploadPage /></PageTransitionWrapper>} />
              <Route path="/resumes/:id" element={<Suspense fallback={<SkeletonResume />}><PageTransitionWrapper><ResumeDetailsPage /></PageTransitionWrapper></Suspense>} />
              <Route path="/resumes/:id/analysis" element={<PageTransitionWrapper><ResumeAnalysisPage /></PageTransitionWrapper>} />

              {/* Step 2: Job Description Intelligence Feature Routes */}
              <Route path="/job-descriptions/upload" element={<PageTransitionWrapper><JDUploadPage /></PageTransitionWrapper>} />
              <Route path="/job-descriptions/:id" element={<PageTransitionWrapper><JDDetailsPage /></PageTransitionWrapper>} />

              {/* Step 3: Resume ↔ JD Matching Engine */}
              <Route path="/matching/:resumeId/:jdId" element={<PageTransitionWrapper><MatchingEnginePage /></PageTransitionWrapper>} />

              {/* Step 4: Multi-Agent Supervisor Pre-Flight Check */}
              <Route path="/supervisor/:resumeId/:jdId" element={<PageTransitionWrapper><SupervisorPreflightPage /></PageTransitionWrapper>} />

              {/* Legacy /setup redirect -> Step 1 of Pipeline */}
              <Route path="/interviews/setup" element={<Navigate to="/resumes/upload" replace />} />

              {/* Step 5: AI Interview Feature Routes */}
              <Route path="/interviews" element={<PageTransitionWrapper><InterviewLobbyPage /></PageTransitionWrapper>} />
              <Route path="/interviews/:id/session" element={<PageTransitionWrapper><LiveInterviewPage /></PageTransitionWrapper>} />
              <Route path="/interviews/:id/voice" element={<PageTransitionWrapper><VoiceInterviewPage /></PageTransitionWrapper>} />
              <Route path="/interviews/:id/transcript" element={<PageTransitionWrapper><TranscriptViewerPage /></PageTransitionWrapper>} />
              <Route path="/interviews/:id/finished" element={<PageTransitionWrapper><InterviewFinishedPage /></PageTransitionWrapper>} />
              <Route path="/interviews/:id/analytics" element={<PageTransitionWrapper><InterviewAnalyticsPage /></PageTransitionWrapper>} />

              {/* Career Intelligence Routes */}
              <Route path="/career" element={<PageTransitionWrapper><CareerDashboardPage /></PageTransitionWrapper>} />
              <Route path="/memory" element={<PageTransitionWrapper><CareerDashboardPage /></PageTransitionWrapper>} />

              {/* Recruiter Workspace Routes */}
              <Route element={<RecruiterRoute />}>
                <Route path="/recruiter" element={<PageTransitionWrapper><RecruiterWorkspacePage /></PageTransitionWrapper>} />
                <Route path="/reports" element={<PageTransitionWrapper><DashboardPage /></PageTransitionWrapper>} />
              </Route>

              {/* Admin Governance Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<PageTransitionWrapper><AdminDashboardPage /></PageTransitionWrapper>} />
              </Route>

              {/* User Settings */}
              <Route path="/settings" element={<PageTransitionWrapper><SettingsPage /></PageTransitionWrapper>} />
            </Route>
          </Route>

          <Route path="*" element={<PageTransitionWrapper><NotFoundPage /></PageTransitionWrapper>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
