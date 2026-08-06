import { UserRole } from '../types/auth.types';

export const PERMISSIONS = {
  MANAGE_USERS: ['ADMIN'],
  VIEW_ANALYTICS: ['ADMIN', 'RECRUITER'],
  CREATE_INTERVIEW: ['ADMIN', 'RECRUITER', 'CANDIDATE'],
  ACCESS_REPLAY: ['ADMIN', 'RECRUITER', 'CANDIDATE'],
  MANAGE_SETTINGS: ['ADMIN'],
} as const;

export function canAccessPermission(role: UserRole | undefined, allowedRoles: readonly UserRole[]): boolean {
  if (!role) return false;
  return allowedRoles.includes(role) || role === 'ADMIN';
}
