import { motion } from 'framer-motion';
import { Briefcase, Plus, Eye, Trash2, Target, ChevronRight } from 'lucide-react';

interface JD {
  id: string;
  role: string;
  company: string;
  addedAt: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Staff';
  skills: string[];
  atsMatch: number;
}

const mockJDs: JD[] = [
  {
    id: 'j1', role: 'Staff Frontend Architect', company: 'Stripe', addedAt: '2026-08-01',
    seniority: 'Staff', skills: ['React 19', 'TypeScript', 'Micro-Frontends', 'GraphQL', 'Performance'],
    atsMatch: 94,
  },
  {
    id: 'j2', role: 'Senior React Engineer', company: 'Linear', addedAt: '2026-07-20',
    seniority: 'Senior', skills: ['React', 'TypeScript', 'State Management', 'Design Systems'],
    atsMatch: 88,
  },
  {
    id: 'j3', role: 'System Architect', company: 'Vercel', addedAt: '2026-07-10',
    seniority: 'Staff', skills: ['System Design', 'Distributed Systems', 'Node.js', 'Kubernetes'],
    atsMatch: 76,
  },
];

const SENIORITY_COLORS: Record<JD['seniority'], string> = {
  Junior: 'border-l-cyan-500    bg-cyan-500/5',
  Mid:    'border-l-indigo-500  bg-indigo-500/5',
  Senior: 'border-l-violet-500  bg-violet-500/5',
  Staff:  'border-l-amber-500   bg-amber-500/5',
};

const SENIORITY_LABEL: Record<JD['seniority'], string> = {
  Junior: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
  Mid:    'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
  Senior: 'text-violet-600 dark:text-violet-400 bg-violet-500/10',
  Staff:  'text-amber-600 dark:text-amber-400 bg-amber-500/10',
};

export function JDManagementPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">JD Library</h1>
            <p className="text-sm text-[var(--text-secondary)]">{mockJDs.length} job descriptions · AI-extracted requirements</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 btn-glow-violet transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          Add Job Description
        </button>
      </motion.div>

      {/* JD Cards */}
      <div className="space-y-3">
        {mockJDs.map((jd, i) => (
          <motion.div
            key={jd.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className={`group card-content border-l-[4px] ${SENIORITY_COLORS[jd.seniority]} p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer`}
          >
            {/* Icon */}
            <div className="rounded-xl bg-[var(--surface-raised)] p-3 shrink-0">
              <Briefcase className="h-5 w-5 text-[var(--text-secondary)]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-[var(--text-primary)]">{jd.role}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${SENIORITY_LABEL[jd.seniority]}`}>
                  {jd.seniority}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">{jd.company}</p>
              <div className="flex flex-wrap gap-1.5">
                {jd.skills.slice(0, 5).map(s => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)]">
                    {s}
                  </span>
                ))}
                {jd.skills.length > 5 && (
                  <span className="text-[10px] text-[var(--text-muted)]">+{jd.skills.length - 5} more</span>
                )}
              </div>
            </div>

            {/* ATS Match */}
            <div className="flex flex-col items-center shrink-0 gap-1">
              <div className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span className="text-[11px] font-mono font-bold text-[var(--text-primary)]">{jd.atsMatch}%</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">ATS Match</p>
            </div>

            {/* Date + Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">{jd.addedAt}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors" aria-label="View JD">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors" aria-label="Delete JD">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add new JD empty card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="card-content border-dashed p-8 flex flex-col items-center gap-3 cursor-pointer group hover:border-indigo-500/50 transition-all"
      >
        <div className="rounded-2xl bg-[var(--surface-raised)] p-4 group-hover:scale-105 transition-transform">
          <Plus className="h-6 w-6 text-[var(--text-muted)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Add Job Description</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Paste text or upload a PDF — AI extracts requirements</p>
        </div>
      </motion.div>
    </div>
  );
}
