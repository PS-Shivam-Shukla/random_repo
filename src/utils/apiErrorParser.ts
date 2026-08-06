import { AxiosError } from 'axios';
import { ApiError } from '../types/api.types';

/**
 * Parses API error response into a clean user-facing error message string.
 */
export function parseApiError(error: unknown): string {
  if (!error) return 'An unexpected error occurred.';

  if (typeof error === 'string') return error;

  const axiosError = error as AxiosError<ApiError>;

  if (axiosError.response) {
    const data = axiosError.response.data;

    if (data) {
      if (typeof data.detail === 'string') {
        return data.detail;
      }
      if (Array.isArray(data.detail)) {
        return data.detail.map((err) => err.msg || JSON.stringify(err)).join(', ');
      }
      if (data.message) {
        return data.message;
      }
    }

    switch (axiosError.response.status) {
      case 400:
        return 'Invalid request details provided.';
      case 401:
        return 'Session expired or unauthorized. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Requested resource was not found.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return `Server returned error status ${axiosError.response.status}.`;
    }
  }

  if (axiosError.request) {
    return 'Network connection error. Unable to reach InterviewSage AI server.';
  }

  return axiosError.message || 'An unexpected error occurred.';
}
