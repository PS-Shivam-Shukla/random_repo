import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../services/settings.api';

export interface UserProfileData {
  fullName: string;
  email: string;
  role: string;
  company: string;
  avatarUrl: string;
  memberSince: string;
  accountStatus: 'ACTIVE' | 'PENDING' | 'PRO';
}

export interface UserPreferencesData {
  theme: 'light' | 'dark' | 'system';
  language: string;
  defaultDuration: string;
  defaultDifficulty: string;
}

export interface NotificationSettingsData {
  emailNotifications: boolean;
  interviewReminders: boolean;
  weeklySummary: boolean;
  productUpdates: boolean;
}

export interface ModelSettingsData {
  provider: string;
  promptVersion: string;
  temperature: number;
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string;
}

export function useProfile() {
  return useQuery<UserProfileData>({
    queryKey: ['settings-profile'],
    queryFn: async () => {
      try {
        const raw = await settingsApi.getSettings();
        if (raw) {
          return {
            fullName: (raw as any).name || 'Shivam Shukla',
            email: (raw as any).email || 'shivam@interviewsage.ai',
            role: 'Staff Frontend Architect',
            company: 'InterviewSage AI',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            memberSince: 'August 2026',
            accountStatus: 'PRO',
          };
        }
      } catch {
        // Fallback
      }

      return {
        fullName: 'Shivam Shukla',
        email: 'shivam@interviewsage.ai',
        role: 'Staff Frontend Architect',
        company: 'InterviewSage AI',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        memberSince: 'August 2026',
        accountStatus: 'PRO',
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<UserProfileData>) => {
      try {
        await settingsApi.updateSettings(data as any);
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-profile'] });
    },
  });
}

export function usePreferences() {
  return useQuery<UserPreferencesData>({
    queryKey: ['settings-preferences'],
    queryFn: async () => ({
      theme: 'system',
      language: 'English (US)',
      defaultDuration: '45',
      defaultDifficulty: 'Hard',
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<UserPreferencesData>) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-preferences'] });
    },
  });
}

export function useNotificationSettings() {
  return useQuery<NotificationSettingsData>({
    queryKey: ['settings-notifications'],
    queryFn: async () => ({
      emailNotifications: true,
      interviewReminders: true,
      weeklySummary: true,
      productUpdates: false,
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateNotifications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<NotificationSettingsData>) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-notifications'] });
    },
  });
}

export function useModelSettings() {
  return useQuery<ModelSettingsData>({
    queryKey: ['settings-models'],
    queryFn: async () => ({
      provider: 'OpenAI GPT-4o (Recommended)',
      promptVersion: 'v2.4 (Latest Stable)',
      temperature: 0.7,
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateModels() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ModelSettingsData>) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-models'] });
    },
  });
}

export function useSecuritySettings() {
  return useQuery<{ sessions: ActiveSession[]; is2faEnabled: boolean }>({
    queryKey: ['settings-security'],
    queryFn: async () => ({
      is2faEnabled: true,
      sessions: [
        {
          id: 'sess-1',
          device: 'Chrome on Windows 11',
          location: 'San Francisco, US (Current Device)',
          lastActive: 'Active Now',
          current: true,
        },
        {
          id: 'sess-2',
          device: 'Safari on macOS Sonoma',
          location: 'New York, US',
          lastActive: '2 days ago',
          current: false,
        },
      ],
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true };
    },
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return sessionId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-security'] });
    },
  });
}

export function useApiKeys() {
  return useQuery<ApiKeyItem[]>({
    queryKey: ['settings-api-keys'],
    queryFn: async () => [
      {
        id: 'key-1',
        name: 'Production Agent API Key',
        maskedKey: 'sage_live_••••••••••••94a2',
        createdAt: 'Jul 15, 2026',
        lastUsedAt: '2 hours ago',
      },
      {
        id: 'key-2',
        name: 'CI/CD Pipeline Integration',
        maskedKey: 'sage_live_••••••••••••381c',
        createdAt: 'Jul 28, 2026',
        lastUsedAt: 'Yesterday',
      },
    ],
    staleTime: 5 * 60 * 1000,
  });
}

export function useGenerateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (keyName: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const rawKey = `sage_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
      return {
        id: `key-${Date.now()}`,
        name: keyName,
        rawKey,
        maskedKey: `sage_live_••••••••••••${rawKey.slice(-4)}`,
        createdAt: 'Just now',
        lastUsedAt: 'Never',
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-api-keys'] });
    },
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (keyId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return keyId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-api-keys'] });
    },
  });
}
