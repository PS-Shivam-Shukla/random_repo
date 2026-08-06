import { apiClient } from '../api/client';
import type { JobDescription, JobDescriptionCreateRequest } from '../types/domain';

export const jobDescriptionsApi = {
  create: async (payload: JobDescriptionCreateRequest): Promise<JobDescription> => {
    const response = await apiClient.post<JobDescription>('/job-descriptions/', payload);
    return response.data;
  },

  get: async (id: string): Promise<JobDescription> => {
    const response = await apiClient.get<JobDescription>(`/job-descriptions/${id}`);
    return response.data;
  },
};
