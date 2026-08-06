import { useState } from 'react';
import {
  Bold,
  Italic,
  List,
  Code,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Terminal,
  FileText,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface QuestionEditorPanelProps {
  questionNumber: number;
  totalQuestions?: number;
  questionText: string;
  topicSkills: string[];
  expectedKeywords: string[];
  answerText: string;
  onAnswerChange: (text: string) => void;
  onSubmitAnswer: () => void;
  onPreviousQuestion: () => void;
  onSkipQuestion: () => void;
  isSubmitting?: boolean;
}

export function QuestionEditorPanel({
  questionNumber,
  totalQuestions = 4,
  questionText,
  topicSkills,
  expectedKeywords: _expectedKeywords,
  answerText,
  onAnswerChange,
  onSubmitAnswer,
  onPreviousQuestion,
  onSkipQuestion,
  isSubmitting = false,
}: QuestionEditorPanelProps) {
  const [inputMode, setInputMode] = useState<'text' | 'code' | 'voice'>('text');
  const [selectedLanguage, setSelectedLanguage] = useState('TypeScript');
  const [isRecording, setIsRecording] = useState(false);

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const isSubmitDisabled = !answerText.trim() || isSubmitting;

  const handleFormatClick = (syntax: string) => {
    onAnswerChange(`${answerText}${syntax}`);
  };

  const handleFormSubmit = () => {
    if (isSubmitDisabled) return;
    onSubmitAnswer();
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      if (!answerText) {
        onAnswerChange('In my previous project, we encountered a cache stampede during high-throughput traffic bursts. I designed a Redis Cluster write-through mechanism with optimistic locking tags...');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <div className="card-content p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Question #{questionNumber}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-medium">• 45 Min Session</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {topicSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-[var(--surface-raised)] border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-relaxed font-display">
          {questionText}
        </h2>
      </div>

      {/* Answer Workspace Tabs & Editor */}
      <div className="card-content overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2.5 gap-2">
          {/* Input Mode Selector */}
          <div className="flex gap-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] p-1">
            {[
              { id: 'text',  label: 'Write Answer', icon: FileText },
              { id: 'code',  label: 'Code Editor',  icon: Terminal },
              { id: 'voice', label: 'Voice Input',  icon: Mic },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = inputMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInputMode(tab.id as any)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all',
                    active
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls based on active mode */}
          {inputMode === 'text' && (
            <div className="flex items-center gap-1">
              {[
                { icon: Bold,   syntax: ' **bold** ' },
                { icon: Italic, syntax: ' *italic* ' },
                { icon: List,   syntax: '\n- ' },
                { icon: Code,   syntax: ' `code` ' },
              ].map(({ icon: Icon, syntax }, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleFormatClick(syntax)}
                  className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          )}

          {inputMode === 'code' && (
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-mono font-bold text-[var(--text-primary)] focus:outline-none"
            >
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Go">Go</option>
            </select>
          )}

          {inputMode === 'voice' && (
            <button
              type="button"
              onClick={toggleRecording}
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
              )}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span>{isRecording ? 'Listening... (Click to stop)' : 'Start Voice Recording'}</span>
            </button>
          )}
        </div>

        {/* Editor Body */}
        <div className="p-4 relative">
          <textarea
            value={answerText}
            onChange={(e) => onAnswerChange(e.target.value)}
            rows={10}
            placeholder={
              inputMode === 'code'
                ? `// Write your ${selectedLanguage} implementation here...\nfunction solution() {\n  // AI will evaluate algorithmic complexity\n}`
                : 'Structure your response clearly (e.g., STAR framework: Situation, Task, Action, Result)...'
            }
            className={cn(
              'w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none leading-relaxed resize-none',
              inputMode === 'code' ? 'font-mono' : 'font-sans',
            )}
          />

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
            <span>{wordCount} words written</span>
            <span className="flex items-center gap-1 text-indigo-500 font-semibold">
              <Sparkles className="h-3 w-3" />
              Live Evaluation Active
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPreviousQuestion}
          disabled={questionNumber === 1}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--border-strong)] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSkipQuestion}
            className="px-3 py-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Skip Question
          </button>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitDisabled}
            className={cn(
              "flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] transition-all",
              questionNumber === totalQuestions
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-600/30 font-extrabold"
                : "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-600/25"
            )}
          >
            <span>
              {isSubmitting
                ? 'Evaluating...'
                : questionNumber === totalQuestions
                ? 'Complete Interview & View Report'
                : 'Submit & Continue'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
