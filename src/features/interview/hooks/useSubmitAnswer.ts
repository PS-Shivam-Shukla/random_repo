import { useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interview.service';
import { SubmitAnswerPayload } from '../types/interview.types';

export function useSubmitAnswer() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, SubmitAnswerPayload>({
    mutationFn: (payload) => interviewService.submitAnswer(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['interview', variables.interview_id] });
      queryClient.invalidateQueries({ queryKey: ['transcripts', variables.interview_id] });
    },
  });
}
