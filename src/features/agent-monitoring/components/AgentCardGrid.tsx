import {
  ShieldCheck,
  FileText,
  Briefcase,
  Target,
  BrainCircuit,
  Code2,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import type { AgentMonitoringCardData } from '../../../hooks/useAgentMonitoring';
import { cn } from '../../../lib/utils';

const ICON_MAP = {
  ShieldCheck,
  FileText,
  Briefcase,
  Target,
  BrainCircuit,
  Code2,
  Users,
  Award,
  Sparkles,
};

interface AgentCardGridProps {
  agents: AgentMonitoringCardData[];
}

export function AgentCardGrid({ agents }: AgentCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => {
        const IconComponent = (ICON_MAP as any)[agent.iconName] || ShieldCheck;

        const statusStyle =
          agent.status === 'Active'
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
            : agent.status === 'Idle'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
              : agent.status === 'Degraded'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300';

        return (
          <Card
            key={agent.id}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 flex flex-col justify-between"
          >
            <CardContent className="p-0 space-y-4">
              {/* Header: Icon, Agent Name, Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-blue-600/10 p-2.5 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1 font-display">
                      {agent.name}
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-400">Agent #{agent.id}</p>
                  </div>
                </div>

                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1.5 shrink-0',
                    statusStyle,
                  )}
                >
                  {agent.status === 'Active' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  {agent.status}
                </span>
              </div>

              {/* Metrics Grid (4 Stat Pairs) */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
                <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                  <span className="text-[10px] text-neutral-400 font-mono block">Avg Response</span>
                  <span className="font-bold font-mono text-neutral-900 dark:text-white">
                    {agent.avgResponseMs}ms
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                  <span className="text-[10px] text-neutral-400 font-mono block">Success Rate</span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {agent.successRatePercent}%
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                  <span className="text-[10px] text-neutral-400 font-mono block">Token Usage</span>
                  <span className="font-bold font-mono text-neutral-900 dark:text-white">
                    {agent.tokenUsage}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                  <span className="text-[10px] text-neutral-400 font-mono block">Retry Count</span>
                  <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
                    {agent.retryCount} retries
                  </span>
                </div>
              </div>

              {/* Mini Recharts Sparkline (Response Time Trend) */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Response Trend</span>
                <div className="h-8 w-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={agent.sparkline}>
                      <Line
                        type="monotone"
                        dataKey="val"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
