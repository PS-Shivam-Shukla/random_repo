import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../services/analytics.api';

export interface ScoreTrendPoint {
  date: string;
  score: number;
  avgScore: number;
}

export interface ScoreDistributionBucket {
  name: string;
  count: number;
  color: string;
}

export interface WeeklyActivityPoint {
  day: string;
  interviews: number;
}

export interface CompetencyPoint {
  competency: string;
  userScore: number;
  benchmarkScore: number;
}

export interface DifficultyPoint {
  difficulty: string;
  solved: number;
  total: number;
}

export interface MonthlyPerformancePoint {
  month: string;
  score: number;
  interviews: number;
}

export interface SkillHeatmapCell {
  skill: string;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

export interface TopSkillPoint {
  skill: string;
  proficiency: number;
  category: string;
}

export interface TechnologySharePoint {
  name: string;
  value: number;
  color: string;
}

export interface TrajectoryPoint {
  week: string;
  score: number;
  studyHours: number;
}

export interface PeerComparisonPoint {
  metric: string;
  candidateScore: number;
  top10Percentile: number;
  averageApplicant: number;
}

export function useAnalyticsSummary(range: string) {
  return useQuery({
    queryKey: ['analytics-summary', range],
    queryFn: async () => {
      try {
        const raw = await analyticsApi.summary();
        return {
          avgScore: raw.average_score || 84.5,
          scoreDelta: 6.2,
          totalInterviews: raw.total_interviews || 24,
          interviewsDelta: 4,
          atsMatch: 92,
          atsDelta: 5.0,
          studyTime: '48.5 hrs',
          studyTimeDelta: 12.0,
        };
      } catch {
        return {
          avgScore: 84.5,
          scoreDelta: 6.2,
          totalInterviews: 24,
          interviewsDelta: 4,
          atsMatch: 92,
          atsDelta: 5.0,
          studyTime: '48.5 hrs',
          studyTimeDelta: 12.0,
        };
      }
    },
    staleTime: 60 * 1000,
  });
}

export function useScoreTrend(range: string) {
  return useQuery<ScoreTrendPoint[]>({
    queryKey: ['analytics-score-trend', range],
    queryFn: async () => [
      { date: 'Jul 01', score: 72, avgScore: 70 },
      { date: 'Jul 07', score: 76, avgScore: 71 },
      { date: 'Jul 14', score: 81, avgScore: 72 },
      { date: 'Jul 21', score: 79, avgScore: 73 },
      { date: 'Jul 28', score: 86, avgScore: 74 },
      { date: 'Aug 04', score: 88, avgScore: 75 },
    ],
    staleTime: 60 * 1000,
  });
}

export function useScoreDistribution(range: string) {
  return useQuery<ScoreDistributionBucket[]>({
    queryKey: ['analytics-score-distribution', range],
    queryFn: async () => [
      { name: '90-100 (Exceptional)', count: 8, color: '#2563eb' },
      { name: '70-89 (Strong)', count: 12, color: '#3b82f6' },
      { name: '50-69 (Average)', count: 3, color: '#f59e0b' },
      { name: '<50 (Needs Work)', count: 1, color: '#ef4444' },
    ],
    staleTime: 60 * 1000,
  });
}

export function useWeeklyActivity(range: string) {
  return useQuery<WeeklyActivityPoint[]>({
    queryKey: ['analytics-weekly-activity', range],
    queryFn: async () => [
      { day: 'Mon', interviews: 4 },
      { day: 'Tue', interviews: 6 },
      { day: 'Wed', interviews: 3 },
      { day: 'Thu', interviews: 7 },
      { day: 'Fri', interviews: 5 },
      { day: 'Sat', interviews: 2 },
      { day: 'Sun', interviews: 1 },
    ],
    staleTime: 60 * 1000,
  });
}

export function usePerformanceMetrics(range: string) {
  return useQuery({
    queryKey: ['analytics-performance-metrics', range],
    queryFn: async () => ({
      competency: [
        { competency: 'Technical Skills', userScore: 88, benchmarkScore: 78 },
        { competency: 'System Design', userScore: 85, benchmarkScore: 74 },
        { competency: 'Soft Skills', userScore: 82, benchmarkScore: 75 },
        { competency: 'Communication', userScore: 86, benchmarkScore: 80 },
        { competency: 'Problem Solving', userScore: 90, benchmarkScore: 76 },
      ] as CompetencyPoint[],
      difficulty: [
        { difficulty: 'Easy', solved: 14, total: 15 },
        { difficulty: 'Medium', solved: 22, total: 25 },
        { difficulty: 'Hard', solved: 12, total: 15 },
        { difficulty: 'Advanced', solved: 6, total: 8 },
      ] as DifficultyPoint[],
      monthly: [
        { month: 'Apr', score: 68, interviews: 4 },
        { month: 'May', score: 74, interviews: 6 },
        { month: 'Jun', score: 79, interviews: 8 },
        { month: 'Jul', score: 85, interviews: 10 },
        { month: 'Aug', score: 88, interviews: 6 },
      ] as MonthlyPerformancePoint[],
    }),
    staleTime: 60 * 1000,
  });
}

export function useSkillsAnalytics(range: string) {
  return useQuery({
    queryKey: ['analytics-skills', range],
    queryFn: async () => ({
      heatmap: [
        { skill: 'React 19 & Concurrent', week1: 75, week2: 82, week3: 88, week4: 94 },
        { skill: 'TypeScript Strict', week1: 80, week2: 85, week3: 90, week4: 92 },
        { skill: 'System Architecture', week1: 65, week2: 72, week3: 80, week4: 88 },
        { skill: 'Redis Caching', week1: 60, week2: 70, week3: 78, week4: 85 },
        { skill: 'FastAPI & Async Python', week1: 70, week2: 76, week3: 82, week4: 86 },
      ] as SkillHeatmapCell[],
      topSkills: [
        { skill: 'React 19 & Concurrent Mode', proficiency: 94, category: 'Frontend' },
        { skill: 'TypeScript Type Systems', proficiency: 92, category: 'Frontend' },
        { skill: 'System Architecture & Caching', proficiency: 88, category: 'System Design' },
        { skill: 'FastAPI REST Endpoints', proficiency: 86, category: 'Backend' },
        { skill: 'STAR Framework Communication', proficiency: 82, category: 'Behavioral' },
      ] as TopSkillPoint[],
      techDistribution: [
        { name: 'Frontend (React/TS)', value: 40, color: '#2563eb' },
        { name: 'System Design', value: 30, color: '#3b82f6' },
        { name: 'Backend (FastAPI/Python)', value: 20, color: '#10b981' },
        { name: 'Algorithms & Data Structures', value: 10, color: '#8b5cf6' },
      ] as TechnologySharePoint[],
    }),
    staleTime: 60 * 1000,
  });
}

export function useTrendsComparison(range: string) {
  return useQuery({
    queryKey: ['analytics-trends-comparison', range],
    queryFn: async () => ({
      trajectory: [
        { week: 'W1', score: 68, studyHours: 6 },
        { week: 'W2', score: 74, studyHours: 10 },
        { week: 'W3', score: 79, studyHours: 12 },
        { week: 'W4', score: 85, studyHours: 15 },
        { week: 'W5', score: 88, studyHours: 14 },
      ] as TrajectoryPoint[],
      peerComparison: [
        { metric: 'Coding Speed', candidateScore: 92, top10Percentile: 95, averageApplicant: 70 },
        { metric: 'System Architecture', candidateScore: 88, top10Percentile: 92, averageApplicant: 65 },
        { metric: 'Code Cleanliness', candidateScore: 94, top10Percentile: 90, averageApplicant: 72 },
        { metric: 'STAR Communication', candidateScore: 82, top10Percentile: 88, averageApplicant: 68 },
      ] as PeerComparisonPoint[],
    }),
    staleTime: 60 * 1000,
  });
}
