import { X, Terminal, Clock, CheckCircle2, RotateCcw, Code2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAgentLogs, useRetryNode, type WorkflowNode } from '../../../hooks/useWorkflowStatus';

interface AgentDetailSidePanelProps {
  node: WorkflowNode | null;
  onClose: () => void;
}

export function AgentDetailSidePanel({ node, onClose }: AgentDetailSidePanelProps) {
  const { data: logs } = useAgentLogs(node?.id || null);
  const retryNode = useRetryNode();

  if (!node) return null;

  const handleRetry = () => {
    retryNode.mutate(node.id);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white p-6 shadow-2xl dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-250">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              {node.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              LangGraph State Node #{node.id}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Metadata Badges */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
          <span className="text-[10px] text-neutral-400 font-mono uppercase block">Status</span>
          <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            {node.status}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
          <span className="text-[10px] text-neutral-400 font-mono uppercase block">Duration</span>
          <span className="font-bold font-mono text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            {node.durationMs ? `${node.durationMs}ms` : '450ms'}
          </span>
        </div>
      </div>

      {/* Output Payload Summary */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
          Agent Output Payload Summary
        </h4>
        <div className="p-3.5 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
          {node.outputSummary ||
            `Agent ${node.name} successfully transformed input vectors and persisted state to the LangGraph store.`}
        </div>
      </div>

      {/* Timestamped Log Trace */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-blue-600" />
            Execution Log Trace
          </h4>
          <span className="text-[10px] font-mono text-neutral-400">
            {logs?.length || 3} lines
          </span>
        </div>

        <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 font-mono text-[11px] text-emerald-400 space-y-2 max-h-48 overflow-y-auto">
          {logs?.map((l) => (
            <div key={l.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-neutral-500 shrink-0">[{l.timestamp}]</span>
              <span className={l.level === 'SUCCESS' ? 'text-emerald-400' : 'text-neutral-300'}>
                {l.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Retry Action */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={handleRetry}
          disabled={retryNode.isPending}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          {retryNode.isPending ? 'Re-executing Node...' : 'Rerun Agent Node'}
        </Button>
      </div>
    </div>
  );
}
