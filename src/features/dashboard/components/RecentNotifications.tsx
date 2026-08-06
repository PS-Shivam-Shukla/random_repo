import { motion } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';
import { useNotifications } from '../../../hooks/useDashboard';

export function RecentNotifications() {
  const navigate = useNavigate();
  const { data: notifications, isLoading, isError, refetch } = useNotifications();

  if (isLoading) {
    return (
      <div className="card-content p-6 space-y-3">
        <SkeletonBlock count={3} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card-content p-6">
        <ErrorState message="Failed to load notifications" onRetry={refetch} className="py-4" />
      </div>
    );
  }

  const items = notifications?.length
    ? notifications.slice(0, 3)
    : [
        {
          id: 'n1',
          message: 'System Architect evaluation complete (Score: 92%). Report ready.',
          type: 'success',
          timestamp: '15m ago',
        },
        {
          id: 'n2',
          message: 'Question Synthesizer agent updated to latest prompt version v2.4.',
          type: 'info',
          timestamp: '2h ago',
        },
        {
          id: 'n3',
          message: 'Recommended practice: Focus on Distributed Caching concurrency.',
          type: 'warning',
          timestamp: '1d ago',
        },
      ];

  return (
    <div className="card-content p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
            <Bell className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[var(--text-primary)] font-display">
            Notifications
          </h2>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-colors"
        >
          <span>Inbox</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((n, index) => {
          const Icon = n.type === 'success' ? CheckCircle2 : n.type === 'warning' ? AlertCircle : Sparkles;
          const color = n.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : n.type === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400';

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => navigate('/notifications')}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${color}`} />
              <div className="flex-1 space-y-0.5 min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug truncate">
                  {n.message}
                </p>
                <p className="text-[10px] font-mono text-[var(--text-muted)]">
                  {n.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}