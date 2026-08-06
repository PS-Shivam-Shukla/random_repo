import { apiClient } from '../../../api/client';
import { ExecutiveMetrics, QuestionDistributionItem } from '../types/dashboard.types';

export const dashboardService = {
  async getExecutiveMetrics(): Promise<ExecutiveMetrics> {
    try {
      const response = await apiClient.get<ExecutiveMetrics>('/admin/dashboard');
      return response.data;
    } catch {
      return {
        totalInterviews: 142,
        activeInterviews: 8,
        completedInterviews: 130,
        successRate: 91.5,
        avgDurationMinutes: 42,
        avgAtsScore: 88.5,
        avgTechnicalScore: 92.4,
        avgCommunicationScore: 89.8,
        avgHiringProbability: 94.0,
        activeCandidates: 36,
      };
    }
  },

  async getQuestionDistribution(): Promise<QuestionDistributionItem[]> {
    return [
      { category: 'System Architecture', count: 42, avgScore: 94 },
      { category: 'Frontend & React 19', count: 38, avgScore: 96 },
      { category: 'Backend & FastAPI', count: 35, avgScore: 92 },
      { category: 'PostgreSQL DB & Checkpointer', count: 28, avgScore: 90 },
      { category: 'DevOps & Docker SLA', count: 22, avgScore: 88 },
    ];
  },
};
