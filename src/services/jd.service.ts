import { apiClient } from '../api/client';

export interface JobDescriptionCreatePayload {
  raw_text: string;
  target_role: string;
  company_name?: string;
  industry?: string;
}

export interface JobDescriptionResponse {
  id: string;
  user_id: string;
  raw_text: string;
  target_role: string;
  company_name: string | null;
  industry: string | null;
  required_skills: string[];
  seniority_level: string;
  created_at: string;
}

export const jdService = {
  async createJobDescription(payload: JobDescriptionCreatePayload): Promise<JobDescriptionResponse> {
    const response = await apiClient.post<JobDescriptionResponse>('/job-descriptions/', payload);
    return response.data;
  },

  async getJobDescription(id: string): Promise<JobDescriptionResponse> {
    const response = await apiClient.get<JobDescriptionResponse>(`/job-descriptions/${id}`);
    return response.data;
  },
};
