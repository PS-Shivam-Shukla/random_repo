import apiClient from './apiClient';

export interface LearningTopic {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  key_takeaways: string[];
}

export const learningHubApi = {
  getTopics: async (): Promise<LearningTopic[]> => {
    const response = await apiClient.get<LearningTopic[]>('/learning-hub/topics');
    return response.data;
  },
};
