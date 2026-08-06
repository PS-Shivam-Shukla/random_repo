import { apiClient } from '../api/client';
import type { DashboardSummary, AnalyticsOverview } from '../types/api';

export const dashboardApi = {
  // Dashboard summary
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get<DashboardSummary>('/analytics/summary');
    return response.data;
  },

  // Quick analytics for dashboard
  getAnalyticsOverview: async (timeRange: string = '30d'): Promise<AnalyticsOverview> => {
    const response = await apiClient.get<AnalyticsOverview>(`/analytics/trends?time_range=${timeRange}`);
    return response.data;
  },
};