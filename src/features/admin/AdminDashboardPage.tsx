import { motion } from 'framer-motion';
import { Shield, Users, BarChart3, Activity, Cpu, TrendingUp } from 'lucide-react';
import { ThinkingDots } from '../../components/shared/ThinkingDots';

const platformStats = [
  { label: 'Total Users',         value: '1,248', icon: Users,     color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-500/10',   trend: '+12%' },
  { label: 'Interviews This Week', value: '342',   icon: BarChart3, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', trend: '+28%' },
  { label: 'Avg Platform Score',  value: '82%',   icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', trend: '+4%' },
  { label: 'Active Agent Sessions', value: '9',   icon: Cpu,       color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-500/10',  trend: 'Live' },
];

const recentUsers = [
  { name: 'Alex Johnson', email: 'alex@company.ai', role: 'Candidate', sessions: 24, lastActive: '2m ago',  status: 'online' },
  { name: 'Sarah Chen',   email: 'sarah@corp.io',   role: 'Candidate', sessions: 18, lastActive: '1h ago',  status: 'online' },
  { name: 'Marcus Reid',  email: 'marcus@tech.co',  role: 'Admin',     sessions: 3,  lastActive: '3h ago',  status: 'idle' },
  { name: 'Priya Nair',   email: 'priya@ai.dev',    role: 'Candidate', sessions: 31, lastActive: '1d ago',  status: 'offline' },
  { name: 'James Park',   email: 'james@saas.com',  role: 'Candidate', sessions: 7,  lastActive: '2d ago',  status: 'offline' },
];

const statusDot: Record<string, string> = {
  online:  'bg-emerald-500',
  idle:    'bg-amber-500',
  offline: 'bg-[var(--text-muted)]',
};

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Admin Dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)]">Platform-wide observability · Admin access only</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 ai-pulse-ring" />
          <span className="text-[11px] font-semibold font-mono text-emerald-600 dark:text-emerald-400">All Systems Operational</span>
        </div>
      </motion.div>

      {/* Platform Stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {platformStats.map((s) => (
          <div key={s.label} className="card-content p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl ${s.bg} ${s.color} p-2.5`}>
                <s.icon className="h-4 w-4" />
              </div>
              <span className={`text-[11px] font-bold font-mono ${s.trend === 'Live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-muted)]'}`}>
                {s.trend}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{s.label}</p>
              <p className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">{s.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Users Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
        className="card-content overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[var(--text-muted)]" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">Platform Users</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-500">
            <span>Agent analyzing activity</span>
            <ThinkingDots color="bg-violet-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['User', 'Role', 'Sessions', 'Last Active', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.email}
                  className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-raised)] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                      <p className="text-[11px] font-mono text-[var(--text-muted)]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      user.role === 'Admin'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-semibold text-[var(--text-primary)]">{user.sessions}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">{user.lastActive}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${statusDot[user.status]}`} />
                      <span className="text-[11px] font-medium capitalize text-[var(--text-secondary)]">{user.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Platform health notice */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}
        className="card-content border-l-4 border-l-emerald-500 p-4 flex items-center gap-3"
      >
        <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">All 9 AI Agents Online</p>
          <p className="text-xs text-[var(--text-muted)]">Average latency: 240ms · No errors in the last 24 hours</p>
        </div>
      </motion.div>
    </div>
  );
}
