import { useState, useRef, useEffect, DragEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';
import { useSubmitJobDescription } from '../../../hooks/useNewInterview';

const MIN_JD_CHARS = 80;

const jobDescriptionSchema = z.object({
  rawText: z
    .string()
    .min(MIN_JD_CHARS, `Job description must be at least ${MIN_JD_CHARS} characters`),
});

type JobDescriptionFormValues = z.infer<typeof jobDescriptionSchema>;

export function StepJobDescription() {
  const {
    jdText,
    setJobDescription,
    setJdId,
    setJdUploadSuccess,
    config,
    updateConfig,
  } = useNewInterviewWizard();

  const submitJobDescription = useSubmitJobDescription();
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<JobDescriptionFormValues>({
    resolver: zodResolver(jobDescriptionSchema),
    defaultValues: { rawText: jdText || '' },
  });

  const rawTextValue = watch('rawText') || '';
  const wordCount = rawTextValue.trim() ? rawTextValue.trim().split(/\s+/).length : 0;
  const charCount = rawTextValue.length;

  useEffect(() => {
    if (rawTextValue.length >= MIN_JD_CHARS) {
      setJobDescription(rawTextValue);
      setJdUploadSuccess(true);

      // Auto-extract role title if not present
      if (!config.role) {
        if (rawTextValue.toLowerCase().includes('frontend')) {
          updateConfig({ role: 'Staff Frontend Engineer' });
        } else if (rawTextValue.toLowerCase().includes('architect')) {
          updateConfig({ role: 'System Architect' });
        } else {
          updateConfig({ role: 'Senior Software Engineer' });
        }
      }
    }
  }, [rawTextValue, setJobDescription, setJdUploadSuccess, config.role, updateConfig]);

  const handleFileUpload = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx' && ext !== 'txt') {
      setError('rawText', { message: 'Only PDF, DOCX, and TXT files are supported.' });
      return;
    }

    const mockExtractedText = `Target Role: Senior Python Backend Engineer.
Requirements: 5+ years experience with Python, FastAPI, PostgreSQL, Asyncio, Redis, and System Design. Focus on high-throughput REST APIs, database indexing, and microservices architecture.`;

    setValue('rawText', mockExtractedText, { shouldValidate: true });
    setJobDescription(mockExtractedText, file.name);
    setJdUploadSuccess(true);
    clearErrors('rawText');

    submitJobDescription.mutate(
      {
        target_role: config.role || 'Software Engineer',
        company_name: 'Target Company',
        raw_text: mockExtractedText,
      },
      {
        onSuccess: (res) => {
          setJdId(res.id);
        },
      },
    );
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="card-content p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            Target Job Description
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Provide the target job description so our Question Synthesizer agent can generate interview rounds tailored to your role.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex gap-1 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={cn(
              'px-3 py-1 text-xs font-bold rounded-lg transition-all',
              activeTab === 'paste'
                ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            Paste Text
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={cn(
              'px-3 py-1 text-xs font-bold rounded-lg transition-all',
              activeTab === 'upload'
                ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            Upload File
          </button>
        </div>
      </div>

      {activeTab === 'paste' ? (
        <div className="space-y-3">
          <div className="relative">
            <textarea
              {...register('rawText')}
              rows={8}
              placeholder="Paste the target job description text here... (e.g. requirements, responsibilities, tech stack, level)"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
              <span>{wordCount} words</span>
              <span>•</span>
              <span className={charCount >= MIN_JD_CHARS ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400'}>
                {charCount} / {MIN_JD_CHARS} min chars
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const sampleText = `Role: Staff Frontend Architect at Stripe SaaS Platform.
Responsibilities: Design and implement high-performance React 19 web applications with TypeScript strict mode. Drive distributed caching strategies, real-time telemetry streaming, and component design system governance. Requirements: 8+ years experience in frontend architecture and system design tradeoffs.`;
                setValue('rawText', sampleText, { shouldValidate: true });
                setJobDescription(sampleText, 'Stripe_Staff_Frontend_JD.txt');
                setJdUploadSuccess(true);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Auto-Fill Sample Job Description
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200',
              dragActive
                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.005]'
                : 'border-[var(--border)] bg-[var(--surface-raised)] hover:border-indigo-500/50 hover:bg-[var(--surface)]',
            )}
          >
            <div className="rounded-2xl bg-indigo-500/10 p-4 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 group-hover:scale-110">
              <UploadCloud className="h-8 w-8" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              Upload Job Description PDF or DOCX
            </h3>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              AI automatically extracts requirements and key skills
            </p>
          </div>
        </div>
      )}

      {/* Extracted preview card */}
      {charCount >= MIN_JD_CHARS && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Job Description Validated</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-500 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Synthesizer Ready</span>
            </div>
          </div>
        </div>
      )}

      {errors.rawText && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errors.rawText.message}</span>
        </div>
      )}
    </div>
  );
}
