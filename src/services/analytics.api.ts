import apiClient from './apiClient';
import type {
  AnalyticsSummary,
  TrendPoint,
  CompetencyAggregate,
  InterviewReport,
} from '../types/domain';

export const analyticsApi = {
  summary: () =>
    apiClient.get<{ summary: AnalyticsSummary }>('/analytics/summary').then(r => r.data.summary),

  scoreTrend: () =>
    apiClient.get<{ trends: TrendPoint[] }>('/analytics/trends').then(r => r.data.trends),

  competencies: () =>
    apiClient.get<{ competencies: CompetencyAggregate[] }>('/analytics/competencies').then(r => r.data.competencies),

  getReport: (interview_id: string) =>
    apiClient.get<InterviewReport>(`/reports/${interview_id}`).then(r => r.data),
};
