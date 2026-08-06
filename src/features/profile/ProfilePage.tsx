import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Award, Clock, Star, BarChart3, Target } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../components/ui/Avatar';

const badges = [
  { id: 1, label: 'First Interview',    emoji: '🎯', color: 'bg-blue-500/10 border-blue-500/20' },
  { id: 2, label: 'Perfect Score',      emoji: '⭐', color: 'bg-amber-500/10 border-amber-500/20' },
  { id: 3, label: '7-Day Streak',       emoji: '🔥', color: 'bg-rose-500/10 border-rose-500/20' },
  { id: 4, label: 'Top Performer',      emoji: '🏆', color: 'bg-violet-500/10 border-violet-500/20' },
  { id: 5, label: 'System Design Pro',  emoji: '🏗️', color: 'bg-cyan-500/10 border-cyan-500/20' },
  { id: 6, label: 'Behavioral Master',  emoji: '🤝', color: 'bg-emerald-500/10 border-emerald-500/20' },
];

const timeline = [
  { role: 'Staff Frontend Architect', company: 'Stripe Simulation',  score: 92, date: 'Aug 2026' },
  { role: 'System Architect',          company: 'Linear AI Sim',       score: 88, date: 'Jul 2026' },
  { role: 'Senior React Engineer',     company: 'Vercel Labs Sim',     score: 84, date: 'Jun 2026' },
  { role: 'Frontend Lead',             company: 'Notion Simulation',   score: 79, date: 'May 2026' },
];

export function ProfilePage() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card-hero overflow-hidden"
      >
        {/* Gradient banner */}
        <div className="h-32 bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3), transparent 50%)' }}
          />
        </div>
        {/* Profile info */}
        <div className="bg-[var(--surface)] border border-[var(--border)] border-t-0 rounded-b-2xl px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-[var(--surface)] ring-offset-0 shadow-lg">
                <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold">AJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="pb-1 flex-1">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Alex Johnson</h1>
              <p className="text-sm text-[var(--text-secondary)]">Senior Frontend Engineer</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <MapPin className="h-3.5 w-3.5" /> San Francisco, CA
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Calendar className="h-3.5 w-3.5" /> Member since Jan 2026
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Senior Staff Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Sessions',  value: '24',   icon: BarChart3, color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Best Score',      value: '94%',  icon: Star,      color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-500/10' },
          { label: 'Avg Score',       value: '86%',  icon: Target,    color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Study Hours',     value: '48h',  icon: Clock,     color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((s) => (
          <div key={s.label} className="card-content p-4 space-y-2">
            <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{s.label}</p>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-content p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">Achievements</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div key={badge.id}
                className={`rounded-xl border p-3 text-center space-y-1.5 ${badge.color} hover:scale-105 transition-transform cursor-default`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className="text-[10px] font-semibold text-[var(--text-secondary)] leading-tight">{badge.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="card-content p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-500" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">Interview Timeline</h2>
          </div>
          <div className="relative space-y-0">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border)]" />
            {timeline.map((t, idx) => (
              <div key={idx} className="relative pl-8 pb-5 last:pb-0">
                <div className={`absolute left-0 top-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  t.score >= 90 ? 'bg-emerald-600' : t.score >= 80 ? 'bg-blue-600' : 'bg-amber-500'
                }`}>
                  {idx + 1}
                </div>
                <p className="text-xs font-bold text-[var(--text-primary)]">{t.role}</p>
                <p className="text-[11px] text-[var(--text-muted)]">{t.company}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    t.score >= 90 ? 'bg-emerald-500/10 text-emerald-600' :
                    t.score >= 80 ? 'bg-blue-500/10 text-blue-600' :
                    'bg-amber-500/10 text-amber-600'
                  }`}>{t.score}%</span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
