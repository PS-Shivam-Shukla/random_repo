import { useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interview.service';
import { SubmitAnswerPayload } from '../types/interview.types';
import { useInterviewStore } from '../store/InterviewStore';

export function useSubmitAnswer() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, SubmitAnswerPayload>({
    mutationFn: (payload) => interviewService.submitAnswer(payload),
    onSuccess: (data, variables) => {
      if (data?.evaluation) {
        const ev = data.evaluation;
        const { addTranscriptEntry, updateMetrics } = useInterviewStore.getState();

        updateMetrics({
          answerQualityScore: ev.score ?? 88,
          technicalScore: ev.technical_coverage ?? ev.score ?? 88,
          communicationScore: ev.communication_score ?? 90,
          confidenceScore: ev.confidence_score ?? 92,
        });

        addTranscriptEntry({
          id: `cand-${Date.now()}`,
          speaker: 'CANDIDATE',
          text: variables.answer,
          timestamp: new Date().toISOString(),
        });

        if (ev.reasoning || ev.feedback) {
          addTranscriptEntry({
            id: `eval-${Date.now()}`,
            speaker: 'AI',
            text: ev.reasoning || ev.feedback,
            timestamp: new Date().toISOString(),
            feedback: {
              technical_score: ev.technical_coverage ?? ev.score ?? 88,
              communication_score: ev.communication_score ?? 90,
              confidence_score: ev.confidence_score ?? 92,
            },
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: ['interview', variables.interview_id] });
      queryClient.invalidateQueries({ queryKey: ['transcripts', variables.interview_id] });
    },
  });
}
