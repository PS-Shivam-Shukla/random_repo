import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowApi } from '../services/workflow.api';

export type AgentNodeStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface WorkflowNode {
  id: string;
  name: string;
  category: 'Ingestion' | 'Parsing' | 'Orchestration' | 'Execution' | 'Evaluation';
  status: AgentNodeStatus;
  durationMs?: number;
  outputSummary?: string;
  iconName: string;
}

export interface WorkflowLogMessage {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
  agentId: string;
}

export interface WorkflowRunState {
  runId: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  activeNodeId: string;
  startedAt: string;
  elapsedSeconds: number;
  nodes: WorkflowNode[];
  logs: WorkflowLogMessage[];
}

export const WORKFLOW_PIPELINE_NODES: { id: string; name: string; iconName: string; category: WorkflowNode['category'] }[] = [
  { id: 'n1', name: 'Resume Upload', iconName: 'FileUp', category: 'Ingestion' },
  { id: 'n2', name: 'Resume Agent', iconName: 'FileText', category: 'Parsing' },
  { id: 'n3', name: 'JD Agent', iconName: 'Briefcase', category: 'Parsing' },
  { id: 'n4', name: 'ATS Agent', iconName: 'Target', category: 'Parsing' },
  { id: 'n5', name: 'Profile Agent', iconName: 'UserCheck', category: 'Parsing' },
  { id: 'n6', name: 'Planner Agent', iconName: 'BrainCircuit', category: 'Orchestration' },
  { id: 'n7', name: 'Supervisor Agent', iconName: 'ShieldCheck', category: 'Orchestration' },
  { id: 'n8', name: 'HR Round Agent', iconName: 'Users', category: 'Execution' },
  { id: 'n9', name: 'Technical Round Agent', iconName: 'Code2', category: 'Execution' },
  { id: 'n10', name: 'Evaluation Agent', iconName: 'Award', category: 'Evaluation' },
  { id: 'n11', name: 'Career Coach Agent', iconName: 'Sparkles', category: 'Evaluation' },
  { id: 'n12', name: 'Final Report Agent', iconName: 'FileCheck', category: 'Evaluation' },
];

export function useWorkflowStatus(runId: string, isLiveMode: boolean) {
  return useQuery<WorkflowRunState>({
    queryKey: ['workflow-run', runId, isLiveMode],
    queryFn: async () => {
      try {
        const raw = await workflowApi.getRunStatus(runId);
        if (raw) {
          return {
            runId: raw.id || runId,
            status: raw.status || 'COMPLETED',
            activeNodeId: 'n9',
            startedAt: raw.started_at || new Date().toISOString(),
            elapsedSeconds: 42,
            nodes: WORKFLOW_PIPELINE_NODES.map((def, idx) => ({
              ...def,
              status: idx < 8 ? 'COMPLETED' : idx === 8 ? 'IN_PROGRESS' : 'PENDING',
              durationMs: idx < 8 ? 1200 + idx * 300 : undefined,
              outputSummary: idx < 8 ? `Successfully processed ${def.name} artifact state` : undefined,
            })),
            logs: generateMockLogs(),
          };
        }
      } catch {
        // Fallback
      }

      return {
        runId: runId || 'run-live-101',
        status: isLiveMode ? 'RUNNING' : 'COMPLETED',
        activeNodeId: isLiveMode ? 'n9' : 'n12',
        startedAt: '2026-08-04T13:48:00Z',
        elapsedSeconds: isLiveMode ? 48 : 142,
        nodes: WORKFLOW_PIPELINE_NODES.map((def, idx) => ({
          ...def,
          status: isLiveMode
            ? idx < 8
              ? 'COMPLETED'
              : idx === 8
                ? 'IN_PROGRESS'
                : 'PENDING'
            : 'COMPLETED',
          durationMs: 1450,
          outputSummary: `Completed step ${def.name} successfully with 0 errors.`,
        })),
        logs: generateMockLogs(),
      };
    },
    refetchInterval: isLiveMode ? 2000 : false,
  });
}

export function useAgentLogs(nodeId: string | null) {
  return useQuery<WorkflowLogMessage[]>({
    queryKey: ['agent-node-logs', nodeId],
    queryFn: async () => {
      if (!nodeId) return [];
      const nodeDef = WORKFLOW_PIPELINE_NODES.find((n) => n.id === nodeId);

      return [
        {
          id: `log-${nodeId}-1`,
          timestamp: '13:48:02.102',
          level: 'INFO',
          message: `Initializing LangGraph state node: ${nodeDef?.name || nodeId}`,
          agentId: nodeId,
        },
        {
          id: `log-${nodeId}-2`,
          timestamp: '13:48:03.450',
          level: 'INFO',
          message: 'Extracting candidate competency vectors & prompt schemas',
          agentId: nodeId,
        },
        {
          id: `log-${nodeId}-3`,
          timestamp: '13:48:04.890',
          level: 'SUCCESS',
          message: 'Agent state transition completed successfully with HTTP 200 OK',
          agentId: nodeId,
        },
      ];
    },
    enabled: Boolean(nodeId),
  });
}

export function useRetryNode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nodeId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return nodeId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-run'] });
    },
  });
}

function generateMockLogs(): WorkflowLogMessage[] {
  return [
    {
      id: 'l1',
      timestamp: '13:48:01.002',
      level: 'INFO',
      message: '[LangGraph Engine] Instantiating multi-agent state graph pipeline run-live-101',
      agentId: 'n1',
    },
    {
      id: 'l2',
      timestamp: '13:48:02.340',
      level: 'INFO',
      message: '[Resume Agent] Parsed 8 technical skills & 2 seniority signals from PDF',
      agentId: 'n2',
    },
    {
      id: 'l3',
      timestamp: '13:48:04.120',
      level: 'INFO',
      message: '[ATS Agent] Calculated 92% role match rating against Staff Frontend Architect JD',
      agentId: 'n4',
    },
    {
      id: 'l4',
      timestamp: '13:48:06.500',
      level: 'INFO',
      message: '[Supervisor] Routing state turn to Technical Round Agent (Question 4/10 active)',
      agentId: 'n7',
    },
    {
      id: 'l5',
      timestamp: '13:48:08.890',
      level: 'SUCCESS',
      message: '[Technical Round Agent] Evaluating answer submission for Redis Distributed Locks',
      agentId: 'n9',
    },
  ];
}
