import { motion } from 'framer-motion';
import { UserCheck, Upload, Trash2, Eye, Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Resume {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  atsScore: number;
  seniority: string;
  skills: string[];
}

const mockResumes: Resume[] = [
  {
    id: 'r1', name: 'Alex_Johnson_Resume_2026.pdf', size: '245 KB', uploadedAt: '2026-08-01',
    atsScore: 94, seniority: 'SENIOR',
    skills: ['React 19', 'TypeScript', 'FastAPI', 'System Design', 'GraphQL'],
  },
  {
    id: 'r2', name: 'Alex_Johnson_Resume_v2.pdf', size: '231 KB', uploadedAt: '2026-07-15',
    atsScore: 87, seniority: 'SENIOR',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
];

function atsColor(score: number) {
  if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10';
  if (score >= 75) return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
  return 'text-amber-600 dark:text-amber-400 bg-amber-500/10';
}

export function ResumeManagementPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Resume Library</h1>
            <p className="text-sm text-[var(--text-secondary)]">{mockResumes.length} resumes · AI-parsed & ATS scored</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 btn-glow-violet transition-all shadow-sm">
          <Upload className="h-4 w-4" />
          Upload Resume
        </button>
      </motion.div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockResumes.map((resume, i) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            onClick={() => setSelected(selected === resume.id ? null : resume.id)}
            className={`card-content p-5 cursor-pointer space-y-4 transition-all ${
              selected === resume.id ? 'ring-2 ring-indigo-500/50' : ''
            }`}
          >
            {/* File icon + name */}
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400 shrink-0">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{resume.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{resume.size}</span>
                  <span className="text-[var(--border)]">·</span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{resume.uploadedAt}</span>
                </div>
              </div>
            </div>

            {/* ATS Score */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-medium">ATS Score</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${atsColor(resume.atsScore)}`}>
                {resume.atsScore}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]">
              <div
                className={`h-full rounded-full ${resume.atsScore >= 90 ? 'bg-emerald-500' : resume.atsScore >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`}
                style={{ width: `${resume.atsScore}%` }}
              />
            </div>

            {/* Seniority + Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {resume.seniority}
                </span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {resume.skills.slice(0, 4).map(s => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)]">
                    {s}
                  </span>
                ))}
                {resume.skills.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md text-[var(--text-muted)]">
                    +{resume.skills.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
              {[
                { icon: Eye,      label: 'View' },
                { icon: Download, label: 'Download' },
              ].map(({ icon: Icon, label }) => (
                <button key={label}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
              <button
                className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}

        {/* Upload empty state card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          className="card-content p-5 border-dashed flex flex-col items-center justify-center gap-3 min-h-[200px] cursor-pointer group hover:border-indigo-500/50 transition-all"
        >
          <div className="rounded-2xl bg-[var(--surface-raised)] p-4 group-hover:scale-105 transition-transform">
            <Upload className="h-6 w-6 text-[var(--text-muted)]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Add Resume</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">PDF or DOCX · Max 10MB</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
