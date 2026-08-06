import { useQuery } from '@tanstack/react-query';
import { interviewService } from '../services/interview.service';
import { InterviewPlan } from '../types/interview.types';

export function useInterviewPlan(interviewId?: string) {
  return useQuery<InterviewPlan, Error>({
    queryKey: ['interview-plan', interviewId],
    queryFn: () => interviewService.getInterviewPlan(interviewId!),
    enabled: !!interviewId,
  });
}
