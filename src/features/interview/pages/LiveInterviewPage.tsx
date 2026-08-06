import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AIAvatar } from '../components/AIAvatar';
import { CelebrationModal } from '../components/CelebrationModal';
import { EndInterviewDialog } from '../components/EndInterviewDialog';
import { LiveMetricsPanel } from '../components/LiveMetricsPanel';
import { QuestionCard } from '../components/QuestionCard';
import { TranscriptStream } from '../components/TranscriptStream';
import { VoiceControls } from '../components/VoiceControls';
import { useInterview } from '../hooks/useInterview';
import { useInterviewPlan } from '../hooks/useInterviewPlan';
import { useInterviewWebSocket } from '../hooks/useInterviewWebSocket';
import { useInterviewStore } from '../store/InterviewStore';
import { interviewService } from '../services/interview.service';

export const LiveInterviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  const { data: interview } = useInterview(id);
  const { data: plan } = useInterviewPlan(id);

  // Connect WebSocket (audio PCM streaming is controlled by micStatus)
  useInterviewWebSocket(id);

  const { aiState, transcriptEntries, metrics } = useInterviewStore();

  const currentQuestion = plan?.blueprint?.questions?.[interview?.current_question_index || 0] || {
    id: 'q-1',
    text: 'Explain your experience with multi-agent system design and asynchronous Python performance optimization.',
    category: 'System Architecture',
    difficulty: 'HARD',
    competency_focus: 'LangGraph & PostgreSQL Checkpointing',
    expected_skills: ['FastAPI', 'LangGraph', 'PostgreSQL', 'Redis'],
  };

  const handleEndInterview = () => {
    setIsEndDialogOpen(false);
    setIsCelebrationOpen(true);
  };

  const handleViewAnalytics = () => {
    setIsCelebrationOpen(false);
    navigate(`/interviews/${id}/analytics`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] w-full space-y-4 font-sans antialiased text-slate-100 overflow-hidden">
      {/* 3-Column ChatGPT Voice Mode Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
        {/* Left 4 Columns: Live Transcript Stream */}
        <div className="lg:col-span-4 h-full flex flex-col overflow-hidden">
          <TranscriptStream
            entries={transcriptEntries}
            onDownload={() => interviewService.downloadTranscriptText(id || 'session', transcriptEntries)}
          />
        </div>

        {/* Center 4 Columns: ChatGPT Voice Orb AI Avatar */}
        <div className="lg:col-span-4 h-full flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/20 shadow-2xl relative">
          <AIAvatar state={aiState} />
        </div>

        {/* Right 4 Columns: Question, Progress & Live Metrics */}
        <div className="lg:col-span-4 h-full flex flex-col space-y-4 overflow-y-auto">
          <QuestionCard
            question={currentQuestion}
            questionIndex={interview?.current_question_index || 0}
            totalQuestions={plan?.blueprint?.total_questions || 5}
          />
          <LiveMetricsPanel metrics={metrics} />
        </div>
      </div>

      {/* Bottom Voice Controls */}
      <div className="w-full flex-shrink-0">
        <VoiceControls onEndInterview={() => setIsEndDialogOpen(true)} />
      </div>

      {/* End & Celebration Modals */}
      <EndInterviewDialog
        isOpen={isEndDialogOpen}
        onClose={() => setIsEndDialogOpen(false)}
        onConfirm={handleEndInterview}
      />
      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => navigate('/interviews')}
        onViewResults={handleViewAnalytics}
        technicalScore={metrics.technicalScore}
      />
    </div>
  );
};
