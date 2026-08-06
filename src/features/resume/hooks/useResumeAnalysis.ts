import { useQuery } from '@tanstack/react-query';
import { resumeService } from '../services/resume.service';
import { Resume, ResumeAnalysis } from '../types/resume.types';

export function useResumeAnalysis(resumeId?: string) {
  return useQuery<ResumeAnalysis, Error>({
    queryKey: ['resume-analysis', resumeId],
    queryFn: () => resumeService.getResumeAnalysis(resumeId!),
    enabled: !!resumeId,
  });
}

export function useResume(resumeId?: string) {
  return useQuery<Resume, Error>({
    queryKey: ['resume', resumeId],
    queryFn: () => resumeService.getResume(resumeId!),
    enabled: !!resumeId,
  });
}
