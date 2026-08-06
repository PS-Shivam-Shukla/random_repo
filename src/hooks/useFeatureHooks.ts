import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsApi } from '../services/reports.api';
import { analyticsApi } from '../services/analytics.api';
import { learningHubApi } from '../services/learning-hub.api';
import { historyApi } from '../services/history.api';
import { workflowApi } from '../services/workflow.api';
import { agentMonitoringApi } from '../services/agent-monitoring.api';
import { settingsApi, UserSettings } from '../services/settings.api';

// Reports Hook
export function useInterviewReports() {
  return useQuery({
    queryKey: ['interview-reports'],
    queryFn: () => reportsApi.listReports(),
    staleTime: 5 * 60 * 1000,
  });
}

// Analytics Hook
export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics-data'],
    queryFn: async () => {
      const [summary, trends, competencies] = await Promise.all([
        analyticsApi.summary(),
        analyticsApi.scoreTrend(),
        analyticsApi.competencies(),
      ]);
      return { summary, trends, competencies };
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Learning Hub Hook
export function useLearningHubData() {
  return useQuery({
    queryKey: ['learning-hub-topics'],
    queryFn: () => learningHubApi.getTopics(),
    staleTime: 10 * 60 * 1000,
  });
}

// History Hook
export function useInterviewHistoryList() {
  return useQuery({
    queryKey: ['interview-history-list'],
    queryFn: () => historyApi.getHistory(),
    staleTime: 2 * 60 * 1000,
  });
}

// AI Workflow Hook
export function useAiWorkflowNodes() {
  return useQuery({
    queryKey: ['ai-workflow-nodes'],
    queryFn: () => workflowApi.getWorkflowStatus(),
    staleTime: 30 * 1000,
  });
}

// Agent Monitoring Hook
export function useAgentMonitoringMetrics() {
  return useQuery({
    queryKey: ['agent-monitoring-data'],
    queryFn: () => agentMonitoringApi.getMonitoringData(),
    staleTime: 15 * 1000,
  });
}

// Settings Hook
export function useUserSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user-settings'],
    queryFn: () => settingsApi.getSettings(),
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (newSettings: Partial<UserSettings>) => settingsApi.updateSettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
    },
  });

  return {
    ...query,
    updateSettings: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
