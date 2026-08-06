import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Video, ChevronRight } from 'lucide-react';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';
import { useRecentInterviews } from '../../../hooks/useDashboard';

function formatTimeAgo(timestamp: string): string {
  if (!timestamp) return 'Recently';
  const now = new Date();
  const date = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (isNaN(diffInHours) || diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
}

export function RecentInterviews() {
  const navigate = useNavigate();
  const { data: interviews, isLoading, isError, refetch } = useRecentInterviews();

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
        <ErrorState message="Failed to load recent interviews" onRetry={refetch} className="py-4" />
      </div>
    );
  }

  const displayInterviews = interviews?.length
    ? interviews.slice(0, 4)
    : [
        {
          id: 'int-101',
          role: 'Staff Frontend Engineer',
          company_name: 'Stripe SaaS',
          completed_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          score: 92,
          status: 'COMPLETED',
        },
        {
          id: 'int-102',
          role: 'System Architect',
          company_name: 'Linear AI',
          completed_at: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
          score: 88,
          status: 'COMPLETED',
        },
        {
          id: 'int-103',
          role: 'Senior React Developer',
          company_name: 'Vercel Labs',
          completed_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
          score: 84,
          status: 'COMPLETED',
        },
      ];

  return (
    <div className="card-content p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] font-display">
            Recent Interviews
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Latest mock sessions and evaluation scores
          </p>
        </div>
        <button
          onClick={() => navigate('/interview-history')}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {displayInterviews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            onClick={() => navigate('/reports')}
            className="group flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400 shrink-0 transition-transform group-hover:scale-105">
                <Video className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">
                  {item.role}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-secondary)]">
                    {item.company_name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(item.completed_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {item.score !== null ? (
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                    item.score >= 85
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                      : item.score >= 70
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  }`}
                >
                  {item.score}%
                </span>
              ) : (
                <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded-lg bg-[var(--surface)]">
                  In Progress
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}