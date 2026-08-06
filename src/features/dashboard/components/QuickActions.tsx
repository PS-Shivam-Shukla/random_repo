import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload, Briefcase, Zap, ChevronRight } from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Start Mock Interview',
      desc: 'AI-guided session with real-time feedback',
      icon: PlusCircle,
      path: '/new-interview',
      primary: true,
      color: 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/25',
    },
    {
      title: 'Manage Resumes',
      desc: 'Upload & parse PDF for ATS scoring',
      icon: Upload,
      path: '/resumes',
      primary: false,
      color: 'bg-[var(--surface-raised)] hover:bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]',
    },
    {
      title: 'Job Descriptions',
      desc: 'Target roles & requirement matching',
      icon: Briefcase,
      path: '/job-descriptions',
      primary: false,
      color: 'bg-[var(--surface-raised)] hover:bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]',
    },
  ];

  return (
    <div className="card-content p-6 h-full flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Quick Actions</h2>
            <p className="text-[11px] text-[var(--text-muted)]">Launch session or edit library</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 flex-1 flex flex-col justify-center">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={() => navigate(act.path)}
            className={`group w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between gap-3 ${act.color}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <act.icon className={`h-4 w-4 shrink-0 ${act.primary ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-indigo-500'}`} />
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${act.primary ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                  {act.title}
                </p>
                <p className={`text-[10px] truncate ${act.primary ? 'text-indigo-100' : 'text-[var(--text-muted)]'}`}>
                  {act.desc}
                </p>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${act.primary ? 'text-white/70' : 'text-[var(--text-muted)]'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}