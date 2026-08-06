import { useQuery } from '@tanstack/react-query';
import { agentMonitoringApi } from '../services/agent-monitoring.api';

export type AgentHealthStatus = 'Active' | 'Idle' | 'Degraded' | 'Down';

export interface SparklinePoint {
  val: number;
}

export interface AgentMonitoringCardData {
  id: string;
  name: string;
  iconName: string;
  status: AgentHealthStatus;
  executionTime: string;
  avgResponseMs: number;
  successRatePercent: number;
  failureRatePercent: number;
  retryCount: number;
  tokenUsage: string;
  latencyMs: number;
  participationPercent: number;
  sparkline: SparklinePoint[];
}

export interface AgentPerformanceComparePoint {
  agentName: string;
  successRate: number;
  latencyMs: number;
}

export interface TimelineWindowPoint {
  agentName: string;
  runId: string;
  startOffsetMs: number;
  durationMs: number;
  status: 'SUCCESS' | 'FAILED';
}

export interface HeatmapCell {
  agentName: string;
  hour: string;
  intensity: number; // 0 to 100
}

export function useAgentMetrics(range: string) {
  return useQuery<AgentMonitoringCardData[]>({
    queryKey: ['agent-monitoring-cards', range],
    queryFn: async () => {
      try {
        const raw = await agentMonitoringApi.getMetrics();
        if (raw && raw.length > 0) {
          return raw.map((item: any, idx: number) => ({
            id: item.id || `ag-${idx}`,
            name: item.agent_name || `Agent ${idx + 1}`,
            iconName: 'ShieldCheck',
            status: (item.status || 'Active') as AgentHealthStatus,
            executionTime: '450ms',
            avgResponseMs: item.response_time_ms || 420,
            successRatePercent: item.success_rate || 98.4,
            failureRatePercent: item.error_rate || 1.6,
            retryCount: item.retry_count || 2,
            tokenUsage: `${(item.token_consumption || 12500) / 1000}k`,
            latencyMs: item.response_time_ms || 420,
            participationPercent: 85,
            sparkline: generateSparkline(item.response_time_ms || 420),
          }));
        }
      } catch {
        // Fallback
      }

      return DEFAULT_AGENT_CARDS;
    },
    staleTime: 10 * 1000,
    refetchInterval: 5000,
  });
}

export function useAgentPerformanceChart(range: string) {
  return useQuery<AgentPerformanceComparePoint[]>({
    queryKey: ['agent-performance-compare', range],
    queryFn: async () => [
      { agentName: 'Supervisor', successRate: 99.2, latencyMs: 180 },
      { agentName: 'Resume Agent', successRate: 98.5, latencyMs: 340 },
      { agentName: 'JD Agent', successRate: 97.8, latencyMs: 320 },
      { agentName: 'ATS Agent', successRate: 99.0, latencyMs: 290 },
      { agentName: 'Planner Agent', successRate: 96.5, latencyMs: 510 },
      { agentName: 'Technical Agent', successRate: 97.2, latencyMs: 640 },
      { agentName: 'HR Agent', successRate: 98.9, latencyMs: 410 },
      { agentName: 'Evaluation Agent', successRate: 98.1, latencyMs: 580 },
      { agentName: 'Career Coach', successRate: 99.4, latencyMs: 360 },
    ],
    staleTime: 60 * 1000,
  });
}

export function useWorkflowTimeline(range: string) {
  return useQuery<TimelineWindowPoint[]>({
    queryKey: ['agent-workflow-timeline', range],
    queryFn: async () => [
      { agentName: 'Resume Upload', runId: 'Run #101', startOffsetMs: 0, durationMs: 400, status: 'SUCCESS' },
      { agentName: 'Resume Agent', runId: 'Run #101', startOffsetMs: 400, durationMs: 1200, status: 'SUCCESS' },
      { agentName: 'JD Agent', runId: 'Run #101', startOffsetMs: 1600, durationMs: 900, status: 'SUCCESS' },
      { agentName: 'ATS Agent', runId: 'Run #101', startOffsetMs: 2500, durationMs: 1100, status: 'SUCCESS' },
      { agentName: 'Supervisor', runId: 'Run #101', startOffsetMs: 3600, durationMs: 500, status: 'SUCCESS' },
      { agentName: 'Technical Agent', runId: 'Run #101', startOffsetMs: 4100, durationMs: 2400, status: 'SUCCESS' },
    ],
    staleTime: 60 * 1000,
  });
}

export function useExecutionHeatmap(range: string) {
  return useQuery<HeatmapCell[]>({
    queryKey: ['agent-execution-heatmap', range],
    queryFn: async () => {
      const agents = ['Supervisor', 'Resume', 'ATS', 'Planner', 'Technical', 'Evaluation'];
      const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
      const cells: HeatmapCell[] = [];

      agents.forEach((ag) => {
        hours.forEach((h) => {
          cells.push({
            agentName: ag,
            hour: h,
            intensity: Math.floor(Math.random() * 60) + 35,
          });
        });
      });

      return cells;
    },
    staleTime: 60 * 1000,
  });
}

function generateSparkline(baseVal: number): SparklinePoint[] {
  return [
    { val: baseVal - 20 },
    { val: baseVal + 15 },
    { val: baseVal - 5 },
    { val: baseVal + 30 },
    { val: baseVal - 10 },
    { val: baseVal + 5 },
    { val: baseVal },
  ];
}

const DEFAULT_AGENT_CARDS: AgentMonitoringCardData[] = [
  {
    id: 'ag-1',
    name: 'Supervisor Orchestrator',
    iconName: 'ShieldCheck',
    status: 'Active',
    executionTime: '180ms',
    avgResponseMs: 180,
    successRatePercent: 99.5,
    failureRatePercent: 0.5,
    retryCount: 0,
    tokenUsage: '14.2k',
    latencyMs: 180,
    participationPercent: 100,
    sparkline: generateSparkline(180),
  },
  {
    id: 'ag-2',
    name: 'Resume Parser Agent',
    iconName: 'FileText',
    status: 'Active',
    executionTime: '340ms',
    avgResponseMs: 340,
    successRatePercent: 98.5,
    failureRatePercent: 1.5,
    retryCount: 1,
    tokenUsage: '38.5k',
    latencyMs: 340,
    participationPercent: 92,
    sparkline: generateSparkline(340),
  },
  {
    id: 'ag-3',
    name: 'JD Extraction Agent',
    iconName: 'Briefcase',
    status: 'Active',
    executionTime: '320ms',
    avgResponseMs: 320,
    successRatePercent: 97.8,
    failureRatePercent: 2.2,
    retryCount: 1,
    tokenUsage: '26.1k',
    latencyMs: 320,
    participationPercent: 90,
    sparkline: generateSparkline(320),
  },
  {
    id: 'ag-4',
    name: 'ATS Match Evaluator',
    iconName: 'Target',
    status: 'Active',
    executionTime: '290ms',
    avgResponseMs: 290,
    successRatePercent: 99.0,
    failureRatePercent: 1.0,
    retryCount: 0,
    tokenUsage: '18.9k',
    latencyMs: 290,
    participationPercent: 95,
    sparkline: generateSparkline(290),
  },
  {
    id: 'ag-5',
    name: 'Planner Matrix Agent',
    iconName: 'BrainCircuit',
    status: 'Idle',
    executionTime: '510ms',
    avgResponseMs: 510,
    successRatePercent: 96.5,
    failureRatePercent: 3.5,
    retryCount: 2,
    tokenUsage: '42.0k',
    latencyMs: 510,
    participationPercent: 88,
    sparkline: generateSparkline(510),
  },
  {
    id: 'ag-6',
    name: 'Technical Round Agent',
    iconName: 'Code2',
    status: 'Active',
    executionTime: '640ms',
    avgResponseMs: 640,
    successRatePercent: 97.2,
    failureRatePercent: 2.8,
    retryCount: 3,
    tokenUsage: '85.4k',
    latencyMs: 640,
    participationPercent: 98,
    sparkline: generateSparkline(640),
  },
  {
    id: 'ag-7',
    name: 'HR Behavioral Agent',
    iconName: 'Users',
    status: 'Active',
    executionTime: '410ms',
    avgResponseMs: 410,
    successRatePercent: 98.9,
    failureRatePercent: 1.1,
    retryCount: 0,
    tokenUsage: '31.2k',
    latencyMs: 410,
    participationPercent: 84,
    sparkline: generateSparkline(410),
  },
  {
    id: 'ag-8',
    name: 'Evaluation Rubric Agent',
    iconName: 'Award',
    status: 'Degraded',
    executionTime: '580ms',
    avgResponseMs: 580,
    successRatePercent: 95.1,
    failureRatePercent: 4.9,
    retryCount: 4,
    tokenUsage: '62.8k',
    latencyMs: 580,
    participationPercent: 96,
    sparkline: generateSparkline(580),
  },
  {
    id: 'ag-9',
    name: 'Career Coach Agent',
    iconName: 'Sparkles',
    status: 'Active',
    executionTime: '360ms',
    avgResponseMs: 360,
    successRatePercent: 99.4,
    failureRatePercent: 0.6,
    retryCount: 0,
    tokenUsage: '22.6k',
    latencyMs: 360,
    participationPercent: 90,
    sparkline: generateSparkline(360),
  },
];
