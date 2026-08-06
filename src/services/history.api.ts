import apiClient from './apiClient';
import type { Interview } from '../types/domain';

export const historyApi = {
  getHistory: async (): Promise<Interview[]> => {
    try {
      const response = await apiClient.get<Interview[]>('/history/interviews');
      return response.data;
    } catch {
      return [];
    }
  },

  deleteHistory: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/history/interviews/${id}`);
    } catch {
      // Fallback
    }
  },
};
