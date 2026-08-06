import { apiClient } from '../api/client';
import type { Report, PaginatedResponse, ReportFilters } from '../types/api';

export const reportsApi = {
  listReports: async (
    filters?: ReportFilters,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResponse<Report>> => {
    return reportsApi.getReports(filters, page, perPage);
  },

  getReports: async (
    filters?: ReportFilters,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResponse<Report>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(filters && Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value != null)
      )),
    });
    
    const response = await apiClient.get<PaginatedResponse<Report>>(
      `/reports?${params.toString()}`
    );
    return response.data;
  },

  getReportById: async (id: string): Promise<Report> => {
    const response = await apiClient.get<Report>(`/reports/${id}`);
    return response.data;
  },

  getReport: async (id: string): Promise<Report> => {
    const response = await apiClient.get<Report>(`/reports/${id}`);
    return response.data;
  },

  getReportByInterviewId: async (interviewId: string): Promise<Report> => {
    const response = await apiClient.get<Report>(`/reports/${interviewId}`);
    return response.data;
  },

  generateReport: async (interviewId: string): Promise<Report> => {
    const response = await apiClient.post<Report>(`/reports/${interviewId}/generate`);
    return response.data;
  },

  updateReport: async (id: string, reportData: Partial<Report>): Promise<Report> => {
    const response = await apiClient.patch<Report>(`/reports/${id}`, reportData);
    return response.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(`/reports/${id}`);
  },

  exportReport: async (id: string, format: 'pdf' | 'docx' = 'pdf'): Promise<Blob> => {
    const response = await apiClient.get<Blob>(`/reports/${id}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },
};