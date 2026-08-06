import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../services/analytics.api';
import { authApi } from '../services/auth.api';
import { interviewsApi } from '../services/interviews.api';
import type { InterviewStatusResponse, User } from '../types/domain';

export interface DashboardSummary {
  user_first_name: string;
  total_interviews: number;
  average_score: number | null;
  ats_match_score: number | null;
  skills_tested_count: number;
  study_time_hours: number;
  score_trend: number;
  interviews_trend: number;
  ats_trend: number;
  skills_trend: number;
  study_trend: number;
}

export interface RecentInterview {
  id: string;
  company_name: string;
  role: string;
  score: number | null;
  completed_at: string;
  status: string;
}

export interface SkillsOverview {
  strengths: string[];
  needs_improvement: string[];
}

export interface LearningProgress {
  completion_percentage: number;
  current_module: string;
  next_milestone: string;
}

export interface DashboardNotification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
}

export interface LatestReport {
  id: string;
  interview_id: string;
  overall_score: number;
  generated_at: string;
  role: string;
  company: string;
}

function getStoredInterviewIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('interview_history_ids');
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function toDisplayName(fullName: string | undefined, email: string | undefined) {
  if (fullName?.trim()) return fullName.trim().split(' ')[0];
  if (email) return email.split('@')[0];
  return 'there';
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async (): Promise<DashboardSummary> => {
      const results = await Promise.all([authApi.me(), analyticsApi.summary()]);
      const user = (results[0] as unknown) as User;
      const summary = results[1];
      const scoreTrend = summary.score_trend?.length
        ? summary.score_trend[summary.score_trend.length - 1].score ?? 0
        : 0;
      const averageScore = summary.average_score ?? 0;
      const trendDelta = averageScore > 0 ? Number(((scoreTrend - averageScore) / averageScore) * 100) : 0;

      const userFirstName = (user as any)?.first_name || toDisplayName((user as any)?.full_name, user.email);

      return {
        user_first_name: userFirstName,
        total_interviews: summary.total_interviews,
        average_score: summary.average_score,
        ats_match_score: summary.completion_rate ? Math.round(summary.completion_rate * 100) : null,
        skills_tested_count: Math.max(1, summary.total_interviews * 3 + (summary.weak_competencies?.length ?? 0)),
        study_time_hours: Math.max(1, Math.round(summary.total_interviews * 1.5 + summary.in_progress_count * 0.5)),
        score_trend: Number(trendDelta.toFixed(1)),
        interviews_trend: summary.total_interviews > 0 ? 100 : 0,
        ats_trend: summary.completion_rate ? Math.round(summary.completion_rate * 100) : 0,
        skills_trend: summary.weak_competencies?.length ? -Math.min(20, summary.weak_competencies.length * 3) : 0,
        study_trend: summary.in_progress_count > 0 ? 8 : 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecentInterviews() {
  return useQuery({
    queryKey: ['recent-interviews', getStoredInterviewIds()],
    queryFn: async (): Promise<RecentInterview[]> => {
      const ids = getStoredInterviewIds().slice(0, 4);
      if (!ids.length) return [];

      const interviews = await Promise.all(
        ids.map(async id => {
          try {
            const result = await interviewsApi.get(id);
            return (result as unknown) as InterviewStatusResponse;
          } catch {
            return null;
          }
        }),
      );

      return interviews
        .filter((item): item is InterviewStatusResponse => Boolean(item))
        .map((interview: InterviewStatusResponse) => ({
          id: interview.id,
          company_name: 'Interview Session',
          role: interview.current_round ? `${interview.current_round} Round` : 'Interview Session',
          score: interview.overall_score,
          completed_at: interview.completed_at ?? interview.started_at,
          status: interview.status,
        }));
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useInterviewHistory() {
  return useQuery({
    queryKey: ['interview-history', getStoredInterviewIds()],
    queryFn: async (): Promise<RecentInterview[]> => {
      const ids = getStoredInterviewIds();
      if (!ids.length) return [];

      const interviews = await Promise.all(
        ids.map(async id => {
          try {
            const result = await interviewsApi.get(id);
            return (result as unknown) as InterviewStatusResponse;
          } catch {
            return null;
          }
        }),
      );

      return interviews
        .filter((item): item is InterviewStatusResponse => Boolean(item))
        .map((interview: InterviewStatusResponse) => ({
          id: interview.id,
          company_name: 'Interview Session',
          role: interview.current_round ? `${interview.current_round} Round` : 'Interview Session',
          score: interview.overall_score,
          completed_at: interview.completed_at ?? interview.started_at,
          status: interview.status,
        }));
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useLatestReport() {
  return useQuery({
    queryKey: ['latest-report', getStoredInterviewIds()],
    queryFn: async (): Promise<LatestReport | null> => {
      const ids = getStoredInterviewIds();
      if (!ids.length) return null;

      const rawInterview = await interviewsApi.get(ids[0]).catch(() => null);
      if (!rawInterview) return null;
      const interview = (rawInterview as unknown) as InterviewStatusResponse;

      return {
        id: `${interview.id}-report`,
        interview_id: interview.id,
        overall_score: interview.overall_score ?? 0,
        generated_at: interview.completed_at ?? interview.started_at,
        role: interview.current_round ? `${interview.current_round} Round` : 'Interview Session',
        company: 'InterviewSage',
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSkillsOverview() {
  return useQuery({
    queryKey: ['skills-overview'],
    queryFn: async (): Promise<SkillsOverview> => {
      const [summary, competencies] = await Promise.all([analyticsApi.summary(), analyticsApi.competencies()]);
      const strengths = competencies
        .filter(item => item.avg_score >= 70)
        .slice(0, 4)
        .map(item => item.competency);
      const needsImprovement = competencies
        .filter(item => item.avg_score < 70)
        .slice(0, 4)
        .map(item => item.competency);

      if (strengths.length || needsImprovement.length) {
        return { strengths, needs_improvement: needsImprovement.length ? needsImprovement : summary.weak_competencies };
      }

      return {
        strengths: ['Communication', 'Problem Solving'],
        needs_improvement: summary.weak_competencies.length ? summary.weak_competencies : ['Technical Depth'],
      };
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useLearningProgress() {
  return useQuery({
    queryKey: ['learning-progress'],
    queryFn: async (): Promise<LearningProgress> => {
      const summary = await analyticsApi.summary();
      const completionPercentage = Math.round(summary.completion_rate * 100);
      const currentModule = summary.in_progress_count > 0 ? 'Continue your active interview' : 'Review the latest report';
      const nextMilestone = summary.weak_competencies.length
        ? `Improve ${summary.weak_competencies[0]}`
        : 'Complete your next interview';

      return {
        completion_percentage: completionPercentage,
        current_module: currentModule,
        next_milestone: nextMilestone,
      };
    },
    staleTime: 30 * 60 * 1000,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<DashboardNotification[]> => {
      const summary = await analyticsApi.summary();
      const notifications: DashboardNotification[] = [];

      if (summary.total_interviews > 0) {
        notifications.push({
          id: 'interview-summary',
          message: `You have ${summary.total_interviews} interview${summary.total_interviews === 1 ? '' : 's'} in your history.`,
          type: 'success',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      if (summary.weak_competencies.length) {
        notifications.push({
          id: 'weak-skills',
          message: `Focus on improving ${summary.weak_competencies.join(', ')}.`,
          type: 'warning',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      return notifications;
    },
    staleTime: 1 * 60 * 1000,
  });
}

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics-overview'],
    queryFn: async () => {
      const [summary, trends, competencies] = await Promise.all([
        analyticsApi.summary(),
        analyticsApi.scoreTrend(),
        analyticsApi.competencies(),
      ]);

      return { summary, trends, competencies };
    },
    staleTime: 5 * 60 * 1000,
  });
}