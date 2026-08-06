import apiClient from './apiClient';
import type { AgentLog, AgentMetric } from '../types/domain';

export interface AgentMonitoringResponse {
  metrics: AgentMetric[];
  recent_logs: AgentLog[];
}

export const agentMonitoringApi = {
  getMonitoringData: async (): Promise<AgentMonitoringResponse> => {
    try {
      const response = await apiClient.get<AgentMonitoringResponse>('/agent-monitoring/metrics');
      return response.data;
    } catch {
      return { metrics: [], recent_logs: [] };
    }
  },

  getMetrics: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get<any>('/admin/agent-metrics');
      return response.data?.metrics || response.data || [];
    } catch {
      try {
        const response = await apiClient.get<any>('/agent-monitoring/metrics');
        return response.data?.metrics || response.data || [];
      } catch {
        return [];
      }
    }
  },
};
