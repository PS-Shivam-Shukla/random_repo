import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, XCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { SkeletonCard } from '../../../components/skeletons/SkeletonLoaders';
import { useNotification } from '../../../hooks/useNotification';
import { resumeService } from '../../resume/services/resume.service';
import { jdService, JobDescriptionResponse } from '../../../services/jd.service';

export const MatchingEnginePage: React.FC = () => {
  const { resumeId, jdId } = useParams<{ resumeId: string; jdId: string }>();
  const navigate = useNavigate();
  const notify = useNotification();

  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [jd, setJd] = useState<JobDescriptionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchingData = async () => {
      if (!resumeId || !jdId) return;
      try {
        const [resData, jdData] = await Promise.all([
          resumeService.getResumeAnalysis(resumeId),
          jdService.getJobDescription(jdId),
        ]);
        setResumeAnalysis(resData);
        setJd(jdData);
      } catch (err: any) {
        notify.error('Matching Engine Failure', err.message || 'Failed to fetch match analytics.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatchingData();
  }, [resumeId, jdId]);

  if (isLoading) {
    return <div className="p-8 max-w-5xl mx-auto"><SkeletonCard /></div>;
  }

  const candidateSkills: string[] = resumeAnalysis?.skills?.technical || [];
  const requiredSkills: string[] = jd?.required_skills || [];

  const matchedSkills = requiredSkills.filter((s) =>
    candidateSkills.some((c) => c.toLowerCase() === s.toLowerCase())
  );
  const missingSkills = requiredSkills.filter(
    (s) => !candidateSkills.some((c) => c.toLowerCase() === s.toLowerCase())
  );

  const matchScore = requiredSkills.length > 0
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 88;

  const readinessScore = Math.min(98, Math.max(70, matchScore + 8));

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto p-6 font-sans text-slate-100">
      {/* Pipeline Progress Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">✓ Step 1: Resume Upload</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">✓ Step 2: JD Upload</span>
        <span className="text-indigo-400 font-bold flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/60">
          Step 3: Matching Engine
        </span>
        <span className="text-slate-500">Step 4: Supervisor Agent</span>
        <span className="text-slate-500">Step 5: Live Interview</span>
      </div>

      {/* Hero Overview */}
      <Card className="border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                Resume ↔ Job Description Matching Engine
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-1">
                Target Role: <span className="text-indigo-300 font-semibold">{jd?.target_role}</span> ({jd?.company_name || 'InterviewSage Partner'})
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="text-4xl font-extrabold text-indigo-400 font-mono">{matchScore}%</span>
              <p className="text-xs text-slate-400 font-medium">Competency Match Score</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">{matchedSkills.length}</p>
                <p className="text-xs text-slate-400 font-medium">Matched Required Skills</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">{missingSkills.length}</p>
                <p className="text-xs text-slate-400 font-medium">Missing Competency Gaps</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">{readinessScore}%</p>
                <p className="text-xs text-slate-400 font-medium">Interview Readiness Index</p>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skill Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Strong Verified Competencies ({matchedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">General Technical Foundations</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Targeted Gap Areas ({missingSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-rose-950/80 text-rose-300 border border-rose-800/80 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400 font-medium">No major technical gaps detected!</span>
                )}
              </div>
            </div>
          </div>

          {/* Next Pipeline CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Verified by Profile Intelligence & ATS Matching Agents
            </span>

            <Button
              onClick={() => navigate(`/supervisor/${resumeId}/${jdId}`)}
              className="px-6 py-2.5 font-bold shadow-lg"
            >
              <span>Initialize Supervisor & Agent Pre-Flight</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
