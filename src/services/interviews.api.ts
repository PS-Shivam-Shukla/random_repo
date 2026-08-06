import { apiClient } from '../api/client';
import type {
  Interview,
  InterviewQuestion,
  InterviewAnswer,
  PaginatedResponse,
  InterviewFilters,
} from '../types/api';

export const interviewsApi = {
  // Interview CRUD
  getInterviews: async (
    filters?: InterviewFilters,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResponse<Interview>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(filters && Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value != null)
      )),
    });
    
    const response = await apiClient.get<PaginatedResponse<Interview>>(
      `/interviews?${params.toString()}`
    );
    return response.data;
  },

  get: async (id: string): Promise<Interview> => {
    const response = await apiClient.get<Interview>(`/interviews/${id}`);
    return response.data;
  },

  getInterview: async (id: string): Promise<Interview> => {
    const response = await apiClient.get<Interview>(`/interviews/${id}`);
    return response.data;
  },

  getInterviewPlan: async (id: string): Promise<{ interview_id: string; plan: Record<string, any> }> => {
    const response = await apiClient.get<{ interview_id: string; plan: Record<string, any> }>(`/interviews/${id}/plan`);
    return response.data;
  },

  approveBlueprint: async (id: string, overrides?: Record<string, any>): Promise<any> => {
    const response = await apiClient.post(`/interviews/${id}/approve-blueprint`, { approved: true, overrides: overrides || {} });
    return response.data;
  },

  create: async (
    interviewData: Record<string, any>
  ): Promise<Interview> => {
    const response = await apiClient.post<Interview>('/interviews/', interviewData);
    return response.data;
  },

  createInterview: async (
    interviewData: Omit<Interview, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Interview> => {
    const response = await apiClient.post<Interview>('/interviews/', interviewData);
    return response.data;
  },

  updateInterview: async (
    id: string,
    interviewData: Partial<Interview>
  ): Promise<Interview> => {
    const response = await apiClient.patch<Interview>(`/interviews/${id}`, interviewData);
    return response.data;
  },

  deleteInterview: async (id: string): Promise<void> => {
    await apiClient.delete(`/interviews/${id}`);
  },

  // Interview status updates
  startInterview: async (id: string): Promise<Interview> => {
    const response = await apiClient.post<Interview>(`/interviews/${id}/start`);
    return response.data;
  },

  completeInterview: async (id: string): Promise<Interview> => {
    const response = await apiClient.post<Interview>(`/interviews/${id}/complete`);
    return response.data;
  },

  cancelInterview: async (id: string, reason?: string): Promise<Interview> => {
    const response = await apiClient.post<Interview>(`/interviews/${id}/cancel`, { reason });
    return response.data;
  },

  // Questions management
  getInterviewQuestions: async (interviewId: string): Promise<InterviewQuestion[]> => {
    const response = await apiClient.get<InterviewQuestion[]>(`/interviews/${interviewId}/questions`);
    return response.data;
  },

  generateQuestions: async (
    interviewId: string,
    jobDescriptionId?: string,
    questionCount: number = 10
  ): Promise<InterviewQuestion[]> => {
    const response = await apiClient.post<InterviewQuestion[]>(
      `/interviews/${interviewId}/generate-questions`,
      { job_description_id: jobDescriptionId, question_count: questionCount }
    );
    return response.data;
  },

  addCustomQuestion: async (
    interviewId: string,
    questionData: Omit<InterviewQuestion, 'id' | 'interview_id' | 'created_at'>
  ): Promise<InterviewQuestion> => {
    const response = await apiClient.post<InterviewQuestion>(
      `/interviews/${interviewId}/questions`,
      questionData
    );
    return response.data;
  },

  updateQuestion: async (
    interviewId: string,
    questionId: string,
    questionData: Partial<InterviewQuestion>
  ): Promise<InterviewQuestion> => {
    const response = await apiClient.patch<InterviewQuestion>(
      `/interviews/${interviewId}/questions/${questionId}`,
      questionData
    );
    return response.data;
  },

  deleteQuestion: async (interviewId: string, questionId: string): Promise<void> => {
    await apiClient.delete(`/interviews/${interviewId}/questions/${questionId}`);
  },

  // Answers management
  getInterviewAnswers: async (interviewId: string): Promise<InterviewAnswer[]> => {
    const response = await apiClient.get<InterviewAnswer[]>(`/interviews/${interviewId}/answers`);
    return response.data;
  },

  submitAnswer: async (
    interviewId: string,
    answerData: { question_id?: string; question_text?: string; answer_text?: string; answer?: string }
  ): Promise<InterviewAnswer> => {
    const response = await apiClient.post<InterviewAnswer>(
      `/interviews/${interviewId}/answers`,
      {
        answer: answerData.answer_text || answerData.answer || 'Answer provided',
        question_id: answerData.question_id,
        question_text: answerData.question_text,
      }
    );
    return response.data;
  },

  updateAnswer: async (
    interviewId: string,
    answerId: string,
    answerData: Partial<InterviewAnswer>
  ): Promise<InterviewAnswer> => {
    const response = await apiClient.patch<InterviewAnswer>(
      `/interviews/${interviewId}/answers/${answerId}`,
      answerData
    );
    return response.data;
  },

  // AI evaluation
  evaluateAnswer: async (
    interviewId: string,
    answerId: string
  ): Promise<{ score: number; feedback: string }> => {
    const response = await apiClient.post<{ score: number; feedback: string }>(`/interviews/${interviewId}/answers/${answerId}/evaluate`);
    return response.data;
  },
};