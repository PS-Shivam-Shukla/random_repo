import { useState } from 'react';
import { SkeletonBlock } from '../../components/shared/SkeletonBlock';
import { ErrorState } from '../../components/shared/ErrorState';
import { MonitoringHeader } from './components/MonitoringHeader';
import { AgentCardGrid } from './components/AgentCardGrid';
import { AgentPerformanceChart } from './components/AgentPerformanceChart';
import { WorkflowTimelineChart } from './components/WorkflowTimelineChart';
import { AgentHeatmapChart } from './components/AgentHeatmapChart';

import { useAgentMetrics } from '../../hooks/useAgentMonitoring';

export function AgentMonitoringPage() {
  const [selectedRange, setSelectedRange] = useState('24h');
  const { data: agents, isLoading, isError, refetch } = useAgentMetrics(selectedRange);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Range Dropdown */}
      <MonitoringHeader
        selectedRange={selectedRange}
        onRangeChange={(range) => setSelectedRange(range)}
      />

      {/* 9-Agent Observability Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonBlock count={1} className="h-56 rounded-2xl" />
          <SkeletonBlock count={1} className="h-56 rounded-2xl" />
          <SkeletonBlock count={1} className="h-56 rounded-2xl" />
        </div>
      ) : isError || !agents ? (
        <ErrorState
          message="Failed to connect to cluster telemetry stream."
          onRetry={refetch}
        />
      ) : (
        <div className="space-y-6">
          <AgentCardGrid agents={agents} />

          {/* Stacked Observability Chart Panels */}
          <div className="space-y-6 pt-2">
            <AgentPerformanceChart range={selectedRange} />

            <WorkflowTimelineChart range={selectedRange} />

            <AgentHeatmapChart range={selectedRange} />
          </div>
        </div>
      )}
    </div>
  );
}
