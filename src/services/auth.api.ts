import { apiClient } from '../api/client';
import type { User, AuthTokens, LoginRequest, RegisterRequest } from '../types/api';

export const authApi = {
  // Authentication
  login: async (credentials: LoginRequest): Promise<AuthTokens> => {
    const response = await apiClient.post<AuthTokens>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthTokens> => {
    const response = await apiClient.post<AuthTokens>('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('interviewsage_access_token');
    localStorage.removeItem('access_token');
  },

  me: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};