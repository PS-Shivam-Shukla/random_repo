import { motion } from 'framer-motion';
import {
  FileUp,
  FileText,
  Briefcase,
  Target,
  UserCheck,
  BrainCircuit,
  ShieldCheck,
  Users,
  Code2,
  Award,
  Sparkles,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { WorkflowNode } from '../../../hooks/useWorkflowStatus';

const ICON_MAP = {
  FileUp,
  FileText,
  Briefcase,
  Target,
  UserCheck,
  BrainCircuit,
  ShieldCheck,
  Users,
  Code2,
  Award,
  Sparkles,
  FileCheck,
};

interface WorkflowPipelineGraphProps {
  nodes: WorkflowNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export function WorkflowPipelineGraph({
  nodes,
  selectedNodeId,
  onSelectNode,
}: WorkflowPipelineGraphProps) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
            12-Agent Directed Acyclic Graph (DAG) Pipeline
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any agent node to inspect execution logs, prompt versions, and output payload
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" /> Pending
          </span>
        </div>
      </div>

      {/* Responsive Grid Pipeline DAG View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nodes.map((node, index) => {
          const IconComponent = (ICON_MAP as any)[node.iconName] || FileText;
          const isSelected = selectedNodeId === node.id;
          const isCompleted = node.status === 'COMPLETED';
          const isInProgress = node.status === 'IN_PROGRESS';
          const isFailed = node.status === 'FAILED';

          return (
            <div key={node.id} className="relative">
              {/* Card Container */}
              <div
                onClick={() => onSelectNode(node.id)}
                className={cn(
                  'group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 dark:border-blue-500 dark:bg-blue-950/20'
                    : isCompleted
                      ? 'border-emerald-200/80 bg-emerald-50/20 dark:border-emerald-950/50 dark:bg-emerald-950/10'
                      : isInProgress
                        ? 'border-blue-400 bg-blue-50/30 ring-2 ring-blue-500/20 dark:border-blue-600 dark:bg-blue-950/20'
                        : isFailed
                          ? 'border-rose-300 bg-rose-50/30 dark:border-rose-950/50 dark:bg-rose-950/10'
                          : 'border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'rounded-xl p-2.5 transition-transform group-hover:scale-105',
                        isCompleted
                          ? 'bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                          : isInProgress
                            ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
                            : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500',
                      )}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
                        Node #{index + 1}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                        {node.name}
                      </h4>
                    </div>
                  </div>

                  {/* Status Indicator Icon */}
                  <div>
                    {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                    {isInProgress && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600" />
                      </span>
                    )}
                    {isFailed && <AlertCircle className="h-4 w-4 text-rose-600" />}
                    {!isCompleted && !isInProgress && !isFailed && (
                      <Clock className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-700" />
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
                  <span>{node.category}</span>
                  <span>{node.durationMs ? `${node.durationMs}ms` : 'Pending'}</span>
                </div>
              </div>

              {/* Framer Motion Traveling Pulse Connector (Hidden on Mobile) */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  {isInProgress && (
                    <motion.span
                      className="block h-2 w-2 rounded-full bg-blue-600 shadow-md"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
