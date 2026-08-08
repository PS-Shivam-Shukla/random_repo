import { useMutation, useQuery } from '@tanstack/react-query';
import { jdService, JobDescriptionCreatePayload, JobDescriptionResponse } from '../services/jd.service';

export function useCreateJobDescription() {
  return useMutation<JobDescriptionResponse, Error, JobDescriptionCreatePayload>({
    mutationFn: (payload: JobDescriptionCreatePayload) => jdService.createJobDescription(payload),
  });
}

export function useJobDescription(id?: string) {
  return useQuery<JobDescriptionResponse, Error>({
    queryKey: ['job-description', id],
    queryFn: () => jdService.getJobDescription(id!),
    enabled: !!id,
  });
}
