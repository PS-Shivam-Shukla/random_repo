/**
 * Application Routes Paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  INTERVIEWS: '/interviews',
  INTERVIEW_SESSION: '/interviews/:id/session',
  VOICE_INTERVIEW: '/interviews/:id/voice',
  REPORTS: '/reports',
  REPORT_DETAIL: '/reports/:id',
  CAREER_INTELLIGENCE: '/career',
  BENCHMARKS: '/career/benchmarks',
  ROADMAP: '/career/roadmap',
  CANDIDATE_MEMORY: '/memory',
  RECRUITER_DASHBOARD: '/recruiter',
  ADMIN_DASHBOARD: '/admin',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  UNAUTHORIZED: '/403',
  SERVER_ERROR: '/500',
  OFFLINE: '/offline',
  MAINTENANCE: '/maintenance',
  NOT_FOUND: '*',
} as const;
