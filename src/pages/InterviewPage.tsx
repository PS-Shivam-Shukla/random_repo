import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, AlertCircle, Loader2, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useInterviewStore } from '../features/interview/store/InterviewStore';
import { useInterviewPlan } from '../features/interview/hooks/useInterviewPlan';
import { useSubmitAnswer } from '../features/interview/hooks/useSubmitAnswer';
import { useCreateInterview } from '../features/interview/hooks/useCreateInterview';
import { AIAvatar } from '../features/interview/components/AIAvatar';
import { InterviewHeader } from '../features/interview/components/InterviewHeader';
import { InterviewProgress } from '../features/interview/components/InterviewProgress';
import { InterviewQuestionCard } from '../features/interview/components/InterviewQuestionCard';
import { InterviewAnswerInput } from '../features/interview/components/InterviewAnswerInput';
import { InterviewEvaluationCard } from '../features/interview/components/InterviewEvaluationCard';
import { InterviewMetricsPanel } from '../features/interview/components/InterviewMetricsPanel';
import { Button } from '../components/ui/Button';

export default function InterviewPage() {
  const navigate = useNavigate();
  const {
    activeInterview,
    isPaused,
    aiState,
    metrics,
    setAIState,
    setIsPaused,
    setActiveInterview,
  } = useInterviewStore();

  const { data: planData, isLoading: isPlanLoading, isError: isPlanError } = useInterviewPlan(activeInterview?.id);
  const submitAnswerMutation = useSubmitAnswer();
  const createInterviewMutation = useCreateInterview();

  const [activeQuestion, setActiveQuestion] = useState<any>(null);
  const [nextQuestionPending, setNextQuestionPending] = useState<any>(null);
  const [lastEvaluation, setLastEvaluation] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync initial question from backend plan response
  useEffect(() => {
    if (planData) {
      const plan = (planData as any).plan || planData;
      const firstQ = plan.first_question || plan.blueprint?.questions?.[0] || activeInterview?.current_question;
      if (firstQ && !activeQuestion) {
        setActiveQuestion({
          id: firstQ.id || 'q-1',
          sequence_number: firstQ.sequence_number || 1,
          round_type: firstQ.type || firstQ.round_type || 'TECHNICAL',
          competency: firstQ.competency || firstQ.competency_focus || 'Backend Architecture',
          difficulty: firstQ.difficulty || 'MEDIUM',
          text: firstQ.text || firstQ.question_text || 'Explain Python concurrency and database connection pooling.',
        });
      }
    }
  }, [planData, activeInterview, activeQuestion]);

  // Handle Answer Submission Flow
  const handleAnswerSubmit = async (answerText: string) => {
    if (!activeInterview || !activeQuestion) return;

    setSubmitError(null);
    setAIState('THINKING');

    try {
      const response = await submitAnswerMutation.mutateAsync({
        interview_id: activeInterview.id,
        question_id: activeQuestion.id || 'q-1',
        question_text: activeQuestion.text,
        answer: answerText,
      });

      if (response?.evaluation) {
        setLastEvaluation(response.evaluation);
      }

      if (response?.next_question) {
        setNextQuestionPending(response.next_question);
      }

      setAIState('IDLE');
    } catch (err: any) {
      setAIState('IDLE');
      setSubmitError(err?.response?.data?.detail || err?.message || 'Failed to evaluate answer. Please try again.');
    }
  };

  // Handle Proceeding to Next Question
  const handleNextQuestion = () => {
    if (nextQuestionPending) {
      setActiveQuestion({
        id: nextQuestionPending.id,
        sequence_number: nextQuestionPending.sequence_number,
        round_type: nextQuestionPending.round_type || 'TECHNICAL',
        competency: nextQuestionPending.competency || 'System Architecture',
        difficulty: nextQuestionPending.difficulty || 'MEDIUM',
        text: nextQuestionPending.text,
      });
      setNextQuestionPending(null);
    }
    setLastEvaluation(null);
  };

  // Handle Launch New Interview
  const handleCreateSession = () => {
    createInterviewMutation.mutate({
      target_role: 'Senior Backend Engineer',
      target_company: 'InterviewSage AI',
      interview_mode: 'TEXT',
      difficulty: 'ADAPTIVE',
    });
  };

  // 1. NO ACTIVE INTERVIEW STATE
  if (!activeInterview) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="p-8 lg:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div className="h-16 w-16 rounded-2xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center mx-auto text-indigo-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-100">
              No Active Interview Session
            </h1>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Launch a live multi-agent interview session to generate personalized questions and evaluate your responses in real time.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <Button
              onClick={handleCreateSession}
              disabled={createInterviewMutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 px-8 py-3 rounded-xl transition-all flex items-center space-x-2 text-base"
            >
              {createInterviewMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Initializing Multi-Agent Session...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start New AI Interview</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOADING STATE
  if (isPlanLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
        <p className="text-slate-300 font-medium">Assembling multi-agent question pipeline from backend...</p>
      </div>
    );
  }

  // 3. ERROR STATE
  if (isPlanError) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="p-8 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h2 className="text-lg font-bold text-rose-200">Failed to Load Interview Session</h2>
          <p className="text-sm text-slate-300">An error occurred while fetching the interview plan from the server.</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-rose-800 text-rose-300">
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  // 4. COMPLETED SESSION STATE
  if (activeInterview.status === 'COMPLETED') {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="p-8 lg:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div className="h-16 w-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-100 font-display">
              Interview Complete
            </h1>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Your performance report is ready! All question turns have been evaluated via the EvaluationAgent and persisted to PostgreSQL.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => {
                const targetId = (activeInterview as any).report_id || activeInterview.id;
                setActiveInterview(null);
                navigate(`/reports/${targetId}`);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-indigo-200" />
              <span>View Performance Report</span>
            </Button>
            <Button
              onClick={() => setActiveInterview(null)}
              variant="outline"
              className="border-slate-800 text-slate-300 hover:bg-slate-800 px-6 py-3 rounded-xl transition-all"
            >
              Start Another Interview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 5. LIVE INTERVIEW SESSION VIEW
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
      {/* Top Session Header */}
      <InterviewHeader
        interview={activeInterview}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
      />

      {/* Progress Bar */}
      <InterviewProgress
        currentQuestionIndex={activeQuestion?.sequence_number || 1}
        totalQuestions={activeInterview.total_questions || 5}
        currentCompetency={activeQuestion?.competency}
      />

      {/* Main Grid Layout: Desktop (2 Columns: Main 8-col, Sidebar 4-col) | Mobile (Stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Content Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Animated AI Avatar Container */}
          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-center backdrop-blur-md shadow-xl">
            <AIAvatar state={aiState} />
          </div>

          {/* Active Question Card */}
          <InterviewQuestionCard
            question={activeQuestion}
            sequenceNumber={activeQuestion?.sequence_number || 1}
          />

          {/* Answer Input (Visible when last turn is not evaluated or when proceeding) */}
          <InterviewAnswerInput
            interviewId={activeInterview?.id}
            onSubmit={handleAnswerSubmit}
            isSubmitting={aiState === 'THINKING' || submitAnswerMutation.isPending}
            isDisabled={isPaused || !!lastEvaluation}
            error={submitError}
          />

          {/* Backend Evaluation Results Card (Appears after answer is evaluated) */}
          <InterviewEvaluationCard
            evaluation={lastEvaluation}
            onNextQuestion={handleNextQuestion}
            hasNextQuestion={!!nextQuestionPending}
          />
        </div>

        {/* Right Sidebar Column (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <InterviewMetricsPanel metrics={metrics} />
        </div>
      </div>
    </div>
  );
}