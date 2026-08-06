import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/auth.api';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterErrorResponse {
  type: 'email_exists' | 'validation_error' | 'server_error';
  message: string;
  fieldErrors?: Record<string, string>;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      try {
        const nameParts = payload.fullName.trim().split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || '';

        const res = await authApi.register({
          email: payload.email,
          password: payload.password,
          first_name: firstName,
          last_name: lastName,
          full_name: payload.fullName,
        });

        // Store tokens if backend returns them immediately
        if (res.access_token && typeof window !== 'undefined') {
          window.localStorage.setItem('access_token', res.access_token);
          window.localStorage.setItem('user', JSON.stringify(res.user));
        }

        return {
          requiresEmailVerification: true,
          user: res.user,
        };
      } catch (err: any) {
        const errorMsg = err instanceof Error ? err.message : String(err);

        if (errorMsg.includes('409') || errorMsg.toLowerCase().includes('already exists')) {
          const errRes: RegisterErrorResponse = {
            type: 'email_exists',
            message: 'An account with this email already exists.',
          };
          throw errRes;
        }

        if (errorMsg.includes('422')) {
          const errRes: RegisterErrorResponse = {
            type: 'validation_error',
            message: 'Please fix the validation errors below.',
            fieldErrors: {
              email: 'Invalid email registration payload.',
            },
          };
          throw errRes;
        }

        const errRes: RegisterErrorResponse = {
          type: 'server_error',
          message: errorMsg || 'Failed to complete registration. Please try again.',
        };
        throw errRes;
      }
    },
  });
}
