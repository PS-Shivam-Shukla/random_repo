/**
 * Application Constants
 */
export const APP_CONSTANTS = {
  NAME: 'InterviewSage AI',
  SLOGAN: 'Enterprise Multi-Agent AI Interview & Career Intelligence Platform',
  VERSION: '1.0.0',
  ROLES: {
    ADMIN: 'ADMIN',
    RECRUITER: 'RECRUITER',
    CANDIDATE: 'CANDIDATE',
    SUPERVISOR: 'SUPERVISOR',
  },
  DEFAULT_PAGE_SIZE: 10,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  ALLOWED_RESUME_TYPES: ['.pdf', '.docx', '.txt'],
} as const;
