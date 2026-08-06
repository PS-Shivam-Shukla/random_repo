import { apiClient } from '../api/client';

export const genericApiService = {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },

  async post<T>(url: string, body?: any): Promise<T> {
    const response = await apiClient.post<T>(url, body);
    return response.data;
  },

  async put<T>(url: string, body?: any): Promise<T> {
    const response = await apiClient.put<T>(url, body);
    return response.data;
  },

  async delete<T>(url: string): Promise<T> {
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};
