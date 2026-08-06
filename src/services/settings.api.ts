import apiClient from './apiClient';

export interface UserSettings {
  full_name: string;
  email: string;
  target_role: string;
  experience_level: string;
  preferred_ai_voice: string;
  notifications_enabled: boolean;
}

export const settingsApi = {
  getSettings: async (): Promise<UserSettings> => {
    const response = await apiClient.get<UserSettings>('/settings');
    return response.data;
  },
  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    const response = await apiClient.patch<UserSettings>('/settings', data);
    return response.data;
  },
};
