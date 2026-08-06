import { motion } from 'framer-motion';
import { Brain, Target, Flame, TrendingUp, BookOpen, ChevronRight, Sparkles, MessageSquare } from 'lucide-react';
import { ThinkingDots } from '../../components/shared/ThinkingDots';

const priorities = [
  {
    rank: 1,
    skill: 'System Design',
    score: 58,
    color: 'rose',
    actions: ['Practice Architecture Q', 'Watch Design Patterns Video'],
  },
  {
    rank: 2,
    skill: 'Behavioral (STAR)',
    score: 71,
    color: 'amber',
    actions: ['STAR Method Exercise', 'Review Past Answers'],
  },
  {
    rank: 3,
    skill: 'React Architecture',
    score: 79,
    color: 'blue',
    actions: ['Component Design Challenge', 'State Management Mock Q'],
  },
];

const colorMap: Record<string, string> = {
  rose:  'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  blue:  'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const barColorMap: Record<string, string> = {
  rose:  'bg-rose-500',
  amber: 'bg-amber-500',
  blue:  'bg-blue-500',
};

export function CareerCoachPage() {
  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Career Coach
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Powered by 9 specialized AI agents · Updated 2 minutes ago
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Interview Readiness', value: '72%',    icon: Target,    color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-500/10' },
          { label: 'Weekly Goals',         value: '3 of 5', icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Learning Streak',      value: '7 days', icon: Flame,     color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={stat.label} className="card-content p-5 flex items-center gap-4"
            style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}
          >
            <div className={`rounded-xl ${stat.bg} ${stat.color} p-2.5`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
              <p className="text-xl font-extrabold tracking-tight text-[var(--text-primary)]">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Today's Focus Priorities */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="card-content p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">Today's Focus Areas</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-500 dark:text-violet-400">
            <span>Career Coach AI analyzing</span>
            <ThinkingDots color="bg-violet-400" />
          </div>
        </div>

        <div className="space-y-3">
          {priorities.map((p, i) => (
            <div key={p.skill}
              className={`rounded-xl border p-4 ${colorMap[p.color]} transition-all hover:scale-[1.005]`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold opacity-60">P{p.rank}</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{p.skill}</span>
                    <span className="text-[11px] font-semibold">— Score: {p.score}%</span>
                  </div>
                  {/* Score bar */}
                  <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10">
                    <motion.div
                      className={`h-full rounded-full ${barColorMap[p.color]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${p.score}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.actions.map((action) => (
                      <button key={action}
                        className="flex items-center gap-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
                      >
                        {action}
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Learning Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="card-content p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-500" />
          <h2 className="text-base font-bold text-[var(--text-primary)]">4-Week Learning Roadmap</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => {
            const done = i < 1;
            const current = i === 1;
            return (
              <div key={week}
                className={`shrink-0 rounded-xl border p-4 w-44 space-y-2 transition-all ${
                  current
                    ? 'border-indigo-500/50 bg-indigo-500/5'
                    : done
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-[var(--border)] bg-[var(--surface-raised)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[var(--text-muted)]">{week}</span>
                  {done && <span className="text-[10px] font-bold text-emerald-600">DONE ✓</span>}
                  {current && <span className="text-[10px] font-bold text-indigo-500">ACTIVE</span>}
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {['System Design Basics', 'Caching & Queues', 'Behavioral STAR', 'Mock Interviews'][i]}
                </p>
                <div className="h-1 rounded-full bg-[var(--border)]">
                  <div
                    className={`h-full rounded-full ${done ? 'bg-emerald-500' : current ? 'bg-indigo-500' : 'bg-transparent'}`}
                    style={{ width: done ? '100%' : current ? '45%' : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* AI Chat (collapsed by default) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="card-content p-5"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-500">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">Ask Your AI Coach</p>
            <p className="text-xs text-[var(--text-muted)]">Get personalized advice on any interview topic</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="e.g. How do I improve my system design answers?"
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 btn-glow-violet transition-all">
            Ask
          </button>
        </div>
      </motion.div>
    </div>
  );
}
