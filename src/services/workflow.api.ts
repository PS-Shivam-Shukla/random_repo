import apiClient from './apiClient';

export interface WorkflowNodeApi {
  id: string;
  name: string;
  type: string;
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  description: string;
}

export const workflowApi = {
  getWorkflowStatus: async (): Promise<WorkflowNodeApi[]> => {
    try {
      const response = await apiClient.get<WorkflowNodeApi[]>('/workflow/nodes');
      return response.data;
    } catch {
      return [];
    }
  },

  getRunStatus: async (runId: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/workflow/runs/${runId}`);
      return response.data;
    } catch {
      return null;
    }
  },
};
