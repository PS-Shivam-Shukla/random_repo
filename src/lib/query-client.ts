import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/services/api-client'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        // Retry once for server errors
        return failureCount < 1
      },
      retryDelay: 1000,
    },
  },
})

// Query key factory for consistent cache management
export const queryKeys = {
  all: ['api'] as const,
  
  // Auth
  auth: () => [...queryKeys.all, 'auth'] as const,
  currentUser: () => [...queryKeys.auth(), 'current-user'] as const,
  
  // Dashboard
  dashboard: () => [...queryKeys.all, 'dashboard'] as const,
  dashboardSummary: () => [...queryKeys.dashboard(), 'summary'] as const,
  
  // Interviews
  interviews: () => [...queryKeys.all, 'interviews'] as const,
  interviewList: (filters?: Record<string, any>) => 
    [...queryKeys.interviews(), 'list', filters] as const,
  interview: (id: string) => [...queryKeys.interviews(), 'detail', id] as const,
  interviewQuestions: (id: string) => [...queryKeys.interview(id), 'questions'] as const,
  
  // Reports
  reports: () => [...queryKeys.all, 'reports'] as const,
  reportList: (filters?: Record<string, any>) => 
    [...queryKeys.reports(), 'list', filters] as const,
  report: (id: string) => [...queryKeys.reports(), 'detail', id] as const,
  
  // Analytics
  analytics: () => [...queryKeys.all, 'analytics'] as const,
  analyticsOverview: () => [...queryKeys.analytics(), 'overview'] as const,
  analyticsPerformance: (timeRange?: string) => 
    [...queryKeys.analytics(), 'performance', timeRange] as const,
  
  // Job Descriptions
  jobDescriptions: () => [...queryKeys.all, 'job-descriptions'] as const,
  jobDescriptionList: (filters?: Record<string, any>) => 
    [...queryKeys.jobDescriptions(), 'list', filters] as const,
  jobDescription: (id: string) => [...queryKeys.jobDescriptions(), 'detail', id] as const,
  
  // Resumes
  resumes: () => [...queryKeys.all, 'resumes'] as const,
  resumeList: (filters?: Record<string, any>) => 
    [...queryKeys.resumes(), 'list', filters] as const,
  resume: (id: string) => [...queryKeys.resumes(), 'detail', id] as const,
  
  // Users (Admin)
  users: () => [...queryKeys.all, 'users'] as const,
  userList: (filters?: Record<string, any>) => 
    [...queryKeys.users(), 'list', filters] as const,
  user: (id: string) => [...queryKeys.users(), 'detail', id] as const,
}