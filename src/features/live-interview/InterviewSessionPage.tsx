import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Award,
} from 'lucide-react';
import { interviewsApi } from '../../services/interviews.api';
import { useSubmitAnswer, useLiveEvaluation } from '../../hooks/useInterviewSession';
import { ThinkingDots } from '../../components/shared/ThinkingDots';

export function InterviewSessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('interviewId') || 'demo-session-123';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  // 1. Fetch live interview plan from backend DISE Strategy Engine
  const { data: planResponse, isLoading: isPlanLoading } = useQuery({
    queryKey: ['interview-plan', sessionId],
    queryFn: () => interviewsApi.getInterviewPlan(sessionId),
    staleTime: 60 * 1000,
  });

  const plan = planResponse?.plan || {};
  const roleTitle = (plan.role as string) || 'Python Backend Engineer';
  const blueprintItems = (plan.blueprint_items as any[]) || [
    {
      seq: 1,
      category: 'System Design & Async Processing',
      difficulty: 'HARD',
      minutes: 10,
      focus: 'FastAPI, Asyncio, Redis Caching, PostgreSQL Sharding',
      question_text: `How would you architect a zero-downtime high-throughput backend service using Python, FastAPI, and Redis caching to handle 50,000 requests/sec? Explain your strategy for query optimization and race-condition prevention in PostgreSQL.`,
    },
    {
      seq: 2,
      category: 'Database Optimization & SQL Performance',
      difficulty: 'HARD',
      minutes: 10,
      focus: 'Indexes, Connection Pooling, Query Execution Plans',
      question_text: `Explain how PostgreSQL EXPLAIN ANALYZE execution plans identify sequential scans vs index scans. How do you design B-tree and GIN indexes for JSONB columns under heavy write loads in Python backend microservices?`,
    },
    {
      seq: 3,
      category: 'Behavioral & Engineering Leadership',
      difficulty: 'MEDIUM',
      minutes: 10,
      focus: 'STAR Method, System Trade-offs, Stakeholder Communication',
      question_text: `Describe a situation where your backend architecture experienced severe database connection pool exhaustion during a traffic spike. How did you diagnose the root cause, mitigate the outage, and realign engineering priorities?`,
    },
  ];

  const totalQuestions = blueprintItems.length;
  const currentItem = blueprintItems[currentQuestionIndex] || blueprintItems[0];
  const activeQuestionText = currentItem.question_text || currentItem.focus || `Explain key architectural considerations for ${roleTitle} position.`;
  const currentAnswerText = answers[currentQuestionIndex] || '';

  const submitAnswerMutation = useSubmitAnswer();
  const { data: liveEval } = useLiveEvaluation(sessionId, currentAnswerText);

  const handleAnswerChange = (text: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: text }));
  };

  const handleSubmitAnswer = () => {
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    submitAnswerMutation.mutate(
      {
        interviewId: sessionId,
        answerText: currentAnswerText,
        questionId: `q-${currentQuestionIndex + 1}`,
        questionText: activeQuestionText,
      },
      {
        onSuccess: () => {
          if (!answeredQuestionIds.includes(currentQuestionIndex)) {
            setAnsweredQuestionIds((prev) => [...prev, currentQuestionIndex]);
          }
          if (!isLastQuestion) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setShowHint(false);
          } else {
            navigate(`/reports?reportId=rep-101&interviewId=${sessionId}`);
          }
        },
      },
    );
  };

  if (isPlanLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4">
        <ThinkingDots color="bg-indigo-600" />
        <p className="text-xs font-mono font-bold text-[var(--text-muted)]">
          Connecting to AI Kernel & Initializing Live Arena...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Session Navigation & Header */}
      <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE ARENA ACTIVE
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Session ID: {sessionId.slice(0, 12)}
              </span>
            </div>
            <h1 className="text-lg font-bold text-[var(--text-primary)] font-display mt-0.5">
              {roleTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-indigo-400 font-bold">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          <button
            type="button"
            onClick={() => navigate(`/reports?reportId=rep-101&interviewId=${sessionId}`)}
            className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 font-bold hover:opacity-90 transition-all"
          >
            Finish Early
          </button>
        </div>
      </div>

      {/* Main 2-Column Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Question & Answer Input (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question Card */}
          <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-1 text-[11px] font-bold text-indigo-300 font-mono">
                  {currentItem.category || 'Technical Round'}
                </span>
                <span className="rounded-lg bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-amber-300 font-mono uppercase">
                  {currentItem.difficulty || 'HARD'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            </div>

            <h2 className="text-lg font-bold leading-relaxed text-slate-100 font-display">
              {activeQuestionText}
            </h2>

            {showHint && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                💡 <strong>Target Focus:</strong> {currentItem.focus || 'Focus on architectural trade-offs, scalability, and code structure.'}
              </div>
            )}
          </div>

          {/* Answer Input Panel */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="candidate-answer-textarea" className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Your Response & Engineering Solution
              </label>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {currentAnswerText.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              id="candidate-answer-textarea"
              value={currentAnswerText}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Detail your architectural approach, code design pattern, and technical trade-offs..."
              rows={8}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-bold text-[var(--text-muted)] hover:bg-[var(--surface-hover)] disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswerText.trim() || submitAnswerMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                {submitAnswerMutation.isPending ? (
                  <>
                    <span>Evaluating Answer</span>
                    <ThinkingDots color="bg-white" />
                  </>
                ) : (
                  <>
                    <span>Submit & Next Question</span>
                    {currentQuestionIndex === totalQuestions - 1 ? (
                      <Award className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live AI Evaluator Telemetry (Span 1) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-display flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Real-Time AI Telemetry
              </h3>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[var(--text-muted)]">Technical Coverage</span>
                  <span className="font-bold text-indigo-500">{liveEval?.technicalCoverageScore || 85}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--surface-hover)] overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${liveEval?.technicalCoverageScore || 85}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[var(--text-muted)]">Communication Clarity</span>
                  <span className="font-bold text-emerald-500">{liveEval?.communicationScore || 90}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--surface-hover)] overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${liveEval?.communicationScore || 90}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[var(--text-muted)]">Answer Completeness</span>
                  <span className="font-bold text-violet-500">{liveEval?.completenessScore || 88}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--surface-hover)] overflow-hidden">
                  <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${liveEval?.completenessScore || 88}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs space-y-2">
            <p className="font-bold text-indigo-400">⚡ Live Agent Status</p>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Answer Evaluation Agent and MCP Rubric Tool actively scoring responses against target Python/Backend competencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
