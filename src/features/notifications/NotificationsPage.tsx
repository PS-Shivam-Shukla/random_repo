import { motion } from 'framer-motion';
import { Bell, CheckCheck, Info, Cpu, Video, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

type NotifType = 'interview' | 'insight' | 'system';

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: 'interview', title: 'Interview Report Ready',        body: 'System Architect mock round — overall score 92%. View your detailed breakdown.', time: '10m ago', unread: true },
  { id: 2, type: 'insight',   title: 'Career Coach Recommendation',   body: 'Your system design score dropped 4% this week. 2 exercises recommended.', time: '1h ago',  unread: true },
  { id: 3, type: 'system',    title: 'Agent Workflow Optimized',       body: 'Question Synthesizer latency reduced by 140ms. All 9 agents are online.', time: '3h ago',  unread: false },
  { id: 4, type: 'interview', title: 'ATS Match Score Updated',        body: 'Your resume now matches 94% of Staff Frontend Engineer requirements.', time: '1d ago',  unread: false },
  { id: 5, type: 'insight',   title: 'Weekly Progress Summary',        body: 'You completed 3 mock interviews this week. Average score: 87%. Keep it up!', time: '2d ago',  unread: false },
  { id: 6, type: 'system',    title: 'New Question Bank Added',        body: '200+ new system design questions added for FAANG-style interviews.', time: '3d ago',  unread: false },
];

const TYPE_META: Record<NotifType, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  interview: { icon: Video,          color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-500/10' },
  insight:   { icon: Cpu,            color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10' },
  system:    { icon: Info,           color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
};

const TABS: Array<{ key: 'all' | NotifType; label: string }> = [
  { key: 'all',       label: 'All' },
  { key: 'interview', label: 'Interviews' },
  { key: 'insight',   label: 'AI Insights' },
  { key: 'system',    label: 'System' },
];

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | NotifType>('all');
  const [items, setItems] = useState(notifications);

  const filtered = activeTab === 'all' ? items : items.filter(n => n.type === activeTab);
  const unreadCount = items.filter(n => n.unread).length;

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const markRead = (id: number) => setItems(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Notifications</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'You\'re all caught up'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </button>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
        className="flex gap-1 border-b border-[var(--border)] pb-px"
      >
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === tab.key
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            {tab.label}
            {tab.key === 'all' && unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Notification List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="space-y-2"
      >
        {filtered.length === 0 ? (
          <div className="card-content flex flex-col items-center py-16 text-center gap-3">
            <Bell className="h-10 w-10 text-[var(--text-muted)]" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">No notifications here</p>
            <p className="text-xs text-[var(--text-muted)]">Check another tab or come back later</p>
          </div>
        ) : (
          filtered.map((n, i) => {
            const meta = TYPE_META[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                onClick={() => markRead(n.id)}
                className={cn(
                  'group card-content cursor-pointer p-4 flex items-start gap-3.5 transition-all',
                  n.unread
                    ? 'border-l-[3px] border-l-indigo-600 dark:border-l-indigo-400'
                    : 'border-l-[3px] border-l-transparent',
                )}
              >
                <div className={`rounded-xl ${meta.bg} ${meta.color} p-2.5 shrink-0 mt-0.5`}>
                  <meta.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-semibold truncate', n.unread ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                      {n.title}
                    </p>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{n.body}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--text-muted)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                {n.unread && (
                  <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" aria-label="Unread" />
                )}
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
