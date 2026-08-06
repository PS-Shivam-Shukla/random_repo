import { useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interview.service';
import { CreateInterviewPayload, Interview } from '../types/interview.types';

export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation<Interview, Error, CreateInterviewPayload>({
    mutationFn: (payload) => interviewService.createInterview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
}
