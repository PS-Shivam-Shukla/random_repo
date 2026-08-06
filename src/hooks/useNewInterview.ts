import { useMutation } from '@tanstack/react-query';
import { interviewsApi } from '../services/interviews.api';
import { jobDescriptionsApi } from '../services/job-descriptions.api';
import { resumesApi } from '../services/resumes.api';
import type { JobDescriptionCreateRequest } from '../types/domain';

export function useUploadResume() {
  return useMutation({
    mutationFn: (file: File) => resumesApi.upload(file),
  });
}

export function useSubmitJobDescription() {
  return useMutation({
    mutationFn: (payload: JobDescriptionCreateRequest) => jobDescriptionsApi.create(payload),
  });
}

export function useStartInterview() {
  return useMutation({
    mutationFn: (payload: {
      resumeId?: string;
      jdId?: string;
      role?: string;
      experience_level?: string;
      skills?: string[];
      rounds?: string[];
      difficulty?: string;
    }) =>
      interviewsApi.create({
        resume_id: payload.resumeId || 'demo-resume-101',
        jd_id: payload.jdId || 'demo-jd-101',
        role: payload.role || 'Python Developer',
        experience_level: payload.experience_level || 'Senior',
        skills: payload.skills || [],
        rounds: payload.rounds || [],
        difficulty: payload.difficulty || 'Standard',
      }),
  });
}
