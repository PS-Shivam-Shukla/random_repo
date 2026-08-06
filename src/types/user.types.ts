import { UserRole } from './auth.types';

export interface UserDetail {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  experience_years?: number;
  skills?: string[];
  created_at: string;
  updated_at: string;
}
