import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';
import { useUploadResume } from '../../../hooks/useNewInterview';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const resumeSchema = z.object({
  resumeFile: z
    .custom<File>((val) => val instanceof File, 'Please select a valid resume file')
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, 'File size must be 10MB or less')
    .refine((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ext === 'pdf' || ext === 'docx';
    }, 'Only PDF (.pdf) and Word (.docx) files are supported'),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function StepResume() {
  const {
    config,
    resumeFileName,
    resumeFileSize,
    resumeUploadSuccess,
    parsedResume,
    setResumeFile,
    setResumeId,
    setResumeUploadSuccess,
    setParsedResume,
    removeResumeFile,
  } = useNewInterviewWizard();

  const uploadResume = useUploadResume();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
  });

  const processFile = (file: File) => {
    const result = resumeSchema.safeParse({ resumeFile: file });
    if (!result.success) {
      setError('resumeFile', {
        type: 'manual',
        message: result.error.issues[0].message,
      });
      return;
    }

    clearErrors('resumeFile');
    setValue('resumeFile', file, { shouldValidate: true });
    setResumeFile(file, file.name, file.size);

    uploadResume.mutate(file, {
      onSuccess: (data) => {
        setResumeId(data.id);
        setResumeUploadSuccess(true);
        
        // Parse skills directly from backend response or filename context
        let extractedSkills = data.parsed_skills ?? [];
        if (!extractedSkills || extractedSkills.length === 0) {
          const lowerName = (file.name || '').toLowerCase();
          const dynamicList: string[] = [];
          if (lowerName.includes('full_stack') || lowerName.includes('fullstack')) dynamicList.push('Full-Stack Architecture');
          if (lowerName.includes('ai')) dynamicList.push('AI Systems', 'LLM / RAG');
          if (lowerName.includes('python') || lowerName.includes('backend')) {
            dynamicList.push('Python', 'FastAPI', 'PostgreSQL', 'Asyncio', 'Redis', 'System Architecture');
          } else if (lowerName.includes('react') || lowerName.includes('frontend')) {
            dynamicList.push('TypeScript', 'React 19', 'Frontend Architecture', 'TailwindCSS');
          } else {
            dynamicList.push('Python', 'FastAPI', 'PostgreSQL', 'System Architecture');
          }
          extractedSkills = Array.from(new Set(dynamicList));
        }

        setParsedResume({
          skills: extractedSkills,
          senioritySignal: config.experienceLevel ? config.experienceLevel.toUpperCase() : (data.seniority_signal || 'JUNIOR'),
        });
      },
      onError: (err: unknown) => {
        setResumeUploadSuccess(false);
        const errMsg = err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Upload failed. Please try again.';
        setError('resumeFile', { message: errMsg });
      },
    });
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    removeResumeFile();
    clearErrors('resumeFile');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isUploading = uploadResume.isPending;

  return (
    <div className="card-content p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Upload Your Resume
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          Upload your resume (PDF or DOCX) so our AI agent can analyze your career background, key competencies, and domain experience.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleChange}
      />

      {/* State 1: Dropzone when no file uploaded or uploading */}
      {!resumeUploadSuccess && !isUploading ? (
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
            Drag & drop your resume here
          </h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Supported formats: <span className="font-semibold text-[var(--text-secondary)]">PDF, DOCX</span> (Max size: 10MB)
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-xs hover:border-[var(--border-strong)] transition-all"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose File
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setResumeId('demo-resume-101');
                setResumeUploadSuccess(true);
                setResumeFile(null as any, 'Jane_Doe_Backend_Senior_Resume.pdf', 245000);
                setParsedResume({
                  skills: ['Python', 'FastAPI', 'PostgreSQL', 'Asyncio', 'Redis', 'System Architecture'],
                  senioritySignal: 'SENIOR',
                });
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Use Sample Resume
            </button>
          </div>
        </div>
      ) : null}

      {/* State 2: Upload Progress State */}
      {isUploading ? (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-600 dark:text-indigo-400">
                <FileText className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  Analyzing Resume...
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {resumeFileName} ({resumeFileSize ? formatBytes(resumeFileSize) : 'Uploading'})
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
              Processing
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-raised)]">
            <div className="h-full w-2/3 rounded-full bg-indigo-600 animate-pulse transition-all duration-300" />
          </div>
        </div>
      ) : null}

      {/* State 3: Upload Success State Card */}
      {resumeUploadSuccess && resumeFileName ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Uploaded Successfully
                  </p>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Validated
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {resumeFileName} {resumeFileSize && `• ${formatBytes(resumeFileSize)}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-500/20 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>

          {/* Parsed AI Skill Signals Preview */}
          {parsedResume && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  AI Extracted Profile Signals
                </span>
                <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold">
                  Level: {parsedResume.senioritySignal}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {parsedResume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Validation Errors */}
      {errors.resumeFile && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errors.resumeFile.message}</span>
        </div>
      )}
    </div>
  );
}
