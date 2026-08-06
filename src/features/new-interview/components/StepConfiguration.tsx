import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Settings2, X, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';

const configSchema = z.object({
  role: z.string().min(1, 'Target job role is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  difficulty: z.string().min(1, 'Interview difficulty is required'),
  interviewType: z.string().min(1, 'Interview type is required'),
  duration: z.string().min(1, 'Duration is required'),
  rounds: z.array(z.string()).min(1, 'Select at least one interview round'),
  selectedSkills: z.array(z.string()).min(1, 'Select or add at least one technical skill'),
});

type ConfigFormValues = z.infer<typeof configSchema>;

const LEVEL_TILES = [
  { key: 'Junior', label: 'Junior (0-2y)', desc: 'Fundamental CS & syntax' },
  { key: 'Mid',    label: 'Mid-Level (3-5y)', desc: 'Production patterns & code design' },
  { key: 'Senior', label: 'Senior (5-8y)', desc: 'Architecture & trade-offs' },
  { key: 'Staff',  label: 'Staff/Principal (8y+)', desc: 'System scale & org impact' },
];

const DIFFICULTY_TILES = [
  { key: 'Standard',   label: 'Standard', desc: 'Typical FAANG-style difficulty' },
  { key: 'Challenging', label: 'Challenging', desc: 'Edge cases & deep tradeoffs' },
  { key: 'Hardcore',   label: 'Hardcore (FAANG+)', desc: 'Uncompromising rigor' },
];

const ROUND_OPTIONS = [
  'HR Round',
  'Technical Round',
  'System Design Round',
  'Behavioral Round',
];

const DEFAULT_SKILLS = [
  'React 19',
  'TypeScript',
  'System Architecture',
  'FastAPI',
  'State Management',
  'Database Indexing',
  'REST & GraphQL APIs',
  'Performance Optimization',
];

export function StepConfiguration() {
  const { config, updateConfig, parsedResume } = useNewInterviewWizard();

  const initialSkills =
    config.selectedSkills && config.selectedSkills.length > 0
      ? config.selectedSkills
      : parsedResume?.skills && parsedResume.skills.length > 0
        ? parsedResume.skills
        : DEFAULT_SKILLS.slice(0, 5);

  const initialRole = config.role || 'Python Developer';

  const {
    register,
    watch,
    setValue,
  } = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      role: initialRole,
      experienceLevel: config.experienceLevel || 'Senior',
      difficulty: config.difficulty || 'Standard',
      interviewType: config.interviewType || 'Technical Architecture',
      duration: config.duration || '45',
      rounds: config.rounds.length > 0 ? config.rounds : ['HR Round', 'Technical Round', 'System Design Round'],
      selectedSkills: initialSkills,
    },
  });

  const level = watch('experienceLevel');
  const difficulty = watch('difficulty');
  const rounds = watch('rounds') || [];
  const selectedSkills = watch('selectedSkills') || [];

  const handleLevelSelect = (key: string) => {
    setValue('experienceLevel', key, { shouldValidate: true });
    updateConfig({ experienceLevel: key });
  };

  const handleDifficultySelect = (key: string) => {
    setValue('difficulty', key, { shouldValidate: true });
    updateConfig({ difficulty: key });
  };

  const toggleRound = (roundName: string) => {
    const updated = rounds.includes(roundName)
      ? rounds.filter((r) => r !== roundName)
      : [...rounds, roundName];
    setValue('rounds', updated, { shouldValidate: true });
    updateConfig({ rounds: updated });
  };

  const toggleSkill = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setValue('selectedSkills', updated, { shouldValidate: true });
    updateConfig({ selectedSkills: updated });
  };

  return (
    <div className="card-content p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            Configure Interview Parameters
          </h2>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Select target seniority level, simulation difficulty, and target technical competencies.
        </p>
      </div>

      {/* Target Role Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Target Role Title
        </label>
        <input
          {...register('role')}
          type="text"
          onChange={(e) => {
            setValue('role', e.target.value, { shouldValidate: true });
            updateConfig({ role: e.target.value });
          }}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
        />
      </div>

      {/* Seniority Level Tile Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Target Seniority Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LEVEL_TILES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => handleLevelSelect(t.key)}
              className={cn(
                'p-3.5 rounded-xl border text-left space-y-1 transition-all',
                level === t.key
                  ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'border-[var(--border)] bg-[var(--surface-raised)] hover:border-[var(--border-strong)]',
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-primary)]">{t.key}</p>
                {level === t.key && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-tight">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Tile Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Simulation Rigor / Difficulty
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIFFICULTY_TILES.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => handleDifficultySelect(d.key)}
              className={cn(
                'p-3.5 rounded-xl border text-left space-y-1 transition-all',
                difficulty === d.key
                  ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'border-[var(--border)] bg-[var(--surface-raised)] hover:border-[var(--border-strong)]',
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-primary)]">{d.label}</p>
                {difficulty === d.key && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-tight">{d.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interview Rounds Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Interview Rounds to Simulate
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ROUND_OPTIONS.map((r) => {
            const active = rounds.includes(r);
            return (
              <button
                key={r}
                type="button"
                onClick={() => toggleRound(r)}
                className={cn(
                  'px-3 py-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all',
                  active
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                )}
              >
                <span>{r}</span>
                {active && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Skills Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Target Skill Focus Area ({selectedSkills.length} selected)
        </label>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => toggleSkill(skill)}
                className="hover:text-rose-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
