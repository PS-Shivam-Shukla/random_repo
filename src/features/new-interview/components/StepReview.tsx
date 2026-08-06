import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';
import { useStartInterview } from '../../../hooks/useNewInterview';
import { ThinkingDots } from '../../../components/shared/ThinkingDots';

export function StepReview() {
  const navigate = useNavigate();
  const {
    resumeFileName,
    parsedResume,
    jdText,
    config,
    resumeId,
    jdId,
    setCurrentStep,
  } = useNewInterviewWizard();

  const startInterview = useStartInterview();

  const handleStartInterview = () => {
    const activeResumeId = resumeId || 'demo-resume-123';
    const activeJdId = jdId || 'demo-jd-123';

    const navigateToSession = (interviewId: string) => {
      const existingHistory = JSON.parse(
        window.localStorage.getItem('interview_history_ids') ?? '[]',
      ) as string[];

      window.localStorage.setItem(
        'interview_history_ids',
        JSON.stringify([interviewId, ...existingHistory.filter((id) => id !== interviewId)]),
      );

      navigate(`/interview-session?interviewId=${interviewId}`);
    };

    startInterview.mutate(
      {
        resumeId: activeResumeId,
        jdId: activeJdId,
        role: config.role || 'Python Developer',
        experience_level: config.experienceLevel || 'Senior',
        skills: config.selectedSkills || [],
        rounds: config.rounds || [],
        difficulty: config.difficulty || 'Standard',
      },
      {
        onSuccess: (response) => {
          navigateToSession(response.id || `session-${Date.now()}`);
        },
        onError: () => {
          // Fallback if backend API endpoint is unreachable or timing out
          navigateToSession(`session-${Date.now()}`);
        },
      },
    );
  };

  const isPreparing = startInterview.isPending;

  return (
    <div className="card-content p-6 sm:p-8 space-y-6">
      {/* Hero Mission Briefing */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-6 text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Mission Briefing Prepared</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 ai-pulse-ring" />
            <span>9 Agents Online</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
            {config.role || 'Senior Backend Engineer'}
          </h2>
          <p className="text-xs text-indigo-200/80 mt-1">
            Simulating {config.experienceLevel || 'Senior'} Level • {config.difficulty || 'Standard'} Rigor • {config.duration || '45'} Minutes
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {config.rounds.map((r) => (
            <span key={r} className="rounded-lg bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-1 text-[11px] font-bold text-indigo-200 font-mono">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Resume Card */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Candidate Resume</span>
            <button type="button" onClick={() => setCurrentStep(0)} className="text-xs font-bold text-indigo-500 hover:underline">Edit</button>
          </div>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">{resumeFileName || 'Alex_Johnson_Resume.pdf'}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{parsedResume?.skills?.length || 5} skills extracted</p>
        </div>

        {/* JD Card */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Target Role Requirements</span>
            <button type="button" onClick={() => setCurrentStep(1)} className="text-xs font-bold text-indigo-500 hover:underline">Edit</button>
          </div>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">{config.role || 'Senior Backend Engineer'}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{jdText ? 'Validated text' : '94% ATS Match'}</p>
        </div>

        {/* Config Card */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Configuration</span>
            <button type="button" onClick={() => setCurrentStep(2)} className="text-xs font-bold text-indigo-500 hover:underline">Edit</button>
          </div>
          <p className="text-xs font-bold text-[var(--text-primary)]">{config.experienceLevel || 'Senior'} • {config.difficulty || 'Standard'}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{config.selectedSkills?.length || 5} key competencies</p>
        </div>
      </div>

      {/* Launch Action */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Shield className="h-4 w-4 text-emerald-500" />
          <span>Real-time speech evaluation & telemetry enabled</span>
        </div>

        <button
          type="button"
          onClick={handleStartInterview}
          disabled={isPreparing}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-xs font-extrabold text-white shadow-xl shadow-indigo-600/30 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isPreparing ? (
            <>
              <span>Initializing Arena</span>
              <ThinkingDots color="bg-white" />
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 fill-white/20" />
              <span>Enter Live Interview Arena</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
