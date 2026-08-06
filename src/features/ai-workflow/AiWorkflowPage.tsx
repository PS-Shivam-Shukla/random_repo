import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SkeletonBlock } from '../../components/shared/SkeletonBlock';
import { ErrorState } from '../../components/shared/ErrorState';

import { WorkflowHeader } from './components/WorkflowHeader';
import { ActiveAgentSummary } from './components/ActiveAgentSummary';
import { WorkflowPipelineGraph } from './components/WorkflowPipelineGraph';
import { AgentDetailSidePanel } from './components/AgentDetailSidePanel';

import { useWorkflowStatus } from '../../hooks/useWorkflowStatus';

export function AiWorkflowPage() {
  const [searchParams] = useSearchParams();
  const runId = searchParams.get('runId') || 'run-live-101';

  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { data: workflow, isLoading, isError, refetch } = useWorkflowStatus(runId, isLiveMode);

  const activeNode = workflow?.nodes.find((n) => n.id === workflow.activeNodeId);
  const selectedNode = workflow?.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Mode Switcher */}
      <WorkflowHeader
        isLiveMode={isLiveMode}
        onToggleLiveMode={(isLive) => setIsLiveMode(isLive)}
        runStatus={workflow?.status || 'RUNNING'}
      />

      {isLoading ? (
        <div className="space-y-4">
          <SkeletonBlock count={1} className="h-44 rounded-2xl" />
          <SkeletonBlock count={1} className="h-96 rounded-2xl" />
        </div>
      ) : isError || !workflow ? (
        <ErrorState
          message="Failed to connect to LangGraph multi-agent execution pipeline."
          onRetry={refetch}
        />
      ) : (
        <div className="space-y-6">
          {/* Active Agent Summary & Live Log Stream */}
          <ActiveAgentSummary
            activeNode={activeNode}
            elapsedSeconds={workflow.elapsedSeconds}
            logs={workflow.logs}
            isLiveMode={isLiveMode}
          />

          {/* 12-Node Sequential Directed Acyclic Graph */}
          <WorkflowPipelineGraph
            nodes={workflow.nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
          />
        </div>
      )}

      {/* Agent Detail Side Panel */}
      <AgentDetailSidePanel
        node={selectedNode}
        onClose={() => setSelectedNodeId(null)}
      />
    </div>
  );
}
