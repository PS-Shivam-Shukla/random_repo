import { useQuery } from '@tanstack/react-query';
import { learningHubApi } from '../services/learning-hub.api';

export interface RecommendedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  progressPercent: number;
  durationMinutes: number;
  iconName: string;
}

export interface WeakTopic {
  id: string;
  name: string;
  count: number;
  category: string;
}

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  estimatedTime: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Conceptual' | 'Coding' | 'System Design' | 'Behavioral';
  estimatedMins: number;
}

export interface AIRecommendation {
  id: string;
  topic: string;
  reason: string;
  suggestedAction: string;
  priority: 'High' | 'Medium';
}

export function useRecommendedCourses() {
  return useQuery<RecommendedCourse[]>({
    queryKey: ['learning-courses'],
    queryFn: async () => {
      try {
        const raw = await learningHubApi.getTopics();
        if (raw && raw.length > 0) {
          return raw.map((t: any, idx: number) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            category: t.category,
            progressPercent: idx === 0 ? 65 : idx === 1 ? 30 : 0,
            durationMinutes: 45,
            iconName: 'BookOpen',
          }));
        }
      } catch {
        // Fallback
      }

      return [
        {
          id: 'c1',
          title: 'Mastering Redis Distributed Locks',
          description: 'Optimistic concurrency control, Redlock algorithm, and zero-downtime cache invalidation.',
          category: 'Backend Architecture',
          progressPercent: 75,
          durationMinutes: 45,
          iconName: 'Server',
        },
        {
          id: 'c2',
          title: 'React 19 Concurrent Rendering & SSE',
          description: 'Fibre reconciliation, Server Actions, progressive hydration, and event streaming.',
          category: 'Frontend Engineering',
          progressPercent: 40,
          durationMinutes: 60,
          iconName: 'Code2',
        },
        {
          id: 'c3',
          title: 'STAR Framework for Scope Management',
          description: 'How to structure high-impact architectural responses for Staff-level interviews.',
          category: 'Behavioral & Leadership',
          progressPercent: 15,
          durationMinutes: 30,
          iconName: 'Sparkles',
        },
      ];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useWeakTopics() {
  return useQuery<WeakTopic[]>({
    queryKey: ['learning-weak-topics'],
    queryFn: async () => [
      { id: 'wt1', name: 'Redis Distributed Locks', count: 3, category: 'Backend' },
      { id: 'wt2', name: 'Graph Cycle Detection', count: 2, category: 'Algorithms' },
      { id: 'wt3', name: 'React 19 Fiber Reconciliation', count: 2, category: 'Frontend' },
      { id: 'wt4', name: 'STAR Quantified Metrics', count: 1, category: 'Behavioral' },
    ],
    staleTime: 5 * 60 * 1000,
  });
}

export function useLearningPath() {
  return useQuery<LearningPathStep[]>({
    queryKey: ['learning-path'],
    queryFn: async () => [
      {
        stepNumber: 1,
        title: 'Distributed System Caching & Stampedes',
        description: 'Understand cache stampede protection and optimistic lock invalidation.',
        status: 'Completed',
        estimatedTime: '45 mins',
      },
      {
        stepNumber: 2,
        title: 'React 19 Concurrent Fiber Reconciliation',
        description: 'Deep dive into concurrent mode interrupts, Suspense boundaries, and RSC.',
        status: 'In Progress',
        estimatedTime: '60 mins',
      },
      {
        stepNumber: 3,
        title: 'High-Throughput Message Queues (Kafka)',
        description: 'Eventual consistency, partition rebalancing, and idempotent consumers.',
        status: 'Locked',
        estimatedTime: '50 mins',
      },
      {
        stepNumber: 4,
        title: 'Staff Architect Behavioral Negotiation',
        description: 'Leading technical alignment across product managers and executive team.',
        status: 'Locked',
        estimatedTime: '35 mins',
      },
    ],
    staleTime: 5 * 60 * 1000,
  });
}

export function useWeeklyGoal() {
  return useQuery({
    queryKey: ['learning-weekly-goal'],
    queryFn: async () => ({
      completedTopics: 4,
      targetTopics: 6,
      percent: 67,
      encouragingText: 'You are on a 4-day learning streak! Complete 2 more topics to hit your weekly goal.',
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePracticeQuestions(selectedTopicFilter?: string) {
  return useQuery<PracticeQuestion[]>({
    queryKey: ['learning-practice-questions', selectedTopicFilter],
    queryFn: async () => {
      const all: PracticeQuestion[] = [
        {
          id: 'pq1',
          title: 'Design a Distributed Rate Limiter using Token Bucket in Redis',
          topic: 'Redis Distributed Locks',
          difficulty: 'Hard',
          type: 'System Design',
          estimatedMins: 15,
        },
        {
          id: 'pq2',
          title: 'Detect Cyclic Dependencies in Microservice RPC Endpoints',
          topic: 'Graph Cycle Detection',
          difficulty: 'Hard',
          type: 'Coding',
          estimatedMins: 20,
        },
        {
          id: 'pq3',
          title: 'Explain React 19 Server Actions Streaming vs Traditional Hydration',
          topic: 'React 19 Fiber Reconciliation',
          difficulty: 'Medium',
          type: 'Conceptual',
          estimatedMins: 10,
        },
        {
          id: 'pq4',
          title: 'Structure a STAR Response for a Project scope-creep delay',
          topic: 'STAR Quantified Metrics',
          difficulty: 'Medium',
          type: 'Behavioral',
          estimatedMins: 12,
        },
      ];

      if (!selectedTopicFilter) return all;
      return all.filter((q) => q.topic.toLowerCase().includes(selectedTopicFilter.toLowerCase()));
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAIRecommendations() {
  return useQuery<AIRecommendation[]>({
    queryKey: ['learning-ai-recommendations'],
    queryFn: async () => [
      {
        id: 'air1',
        topic: 'Redis Distributed Caching',
        reason: 'Based on your last interview report, you missed optimistic locking edge cases.',
        suggestedAction: 'Practice Question #1: Distributed Rate Limiter',
        priority: 'High',
      },
      {
        id: 'air2',
        topic: 'Behavioral Metrics',
        reason: 'Adding exact % numbers to your STAR story will boost your score to Top 10%.',
        suggestedAction: 'Review Behavioral STAR Practice Guide',
        priority: 'Medium',
      },
    ],
    staleTime: 5 * 60 * 1000,
  });
}
