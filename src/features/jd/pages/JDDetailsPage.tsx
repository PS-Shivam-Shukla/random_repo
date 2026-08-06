import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Building2, CheckCircle2, Cpu, FileText, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { SkeletonCard } from '../../../components/skeletons/SkeletonLoaders';
import { useNotification } from '../../../hooks/useNotification';
import { jdService, JobDescriptionResponse } from '../../../services/jd.service';

export const JDDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notify = useNotification();
  const resumeId = searchParams.get('resumeId');

  const [jd, setJd] = useState<JobDescriptionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJD = async () => {
      if (!id) return;
      try {
        const data = await jdService.getJobDescription(id);
        setJd(data);
      } catch (err: any) {
        notify.error('Failed to load Job Description', err.message || 'Error fetching JD.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJD();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 max-w-4xl mx-auto"><SkeletonCard /></div>;
  }

  if (!jd) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold text-rose-400">Job Description Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/job-descriptions/upload')}>
          Upload New Job Description
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto p-6 font-sans text-slate-100">
      {/* Header Info */}
      <Card className="border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                {jd.target_role}
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-slate-400" /> {jd.company_name || 'InterviewSage Partner'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-xs border border-indigo-800 font-mono font-semibold">
                  Seniority: {jd.seniority_level}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Required Skills Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Extracted Required Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {jd.required_skills.length > 0 ? (
                jd.required_skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Standard Technical & Architecture Competencies</span>
              )}
            </div>
          </div>

          {/* Raw Text Summary */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Parsed Requirements & Specifications
            </h4>
            <p className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
              {jd.raw_text}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Parsed by JD Agent & Supervisor Pipeline</span>
            </div>

            <Button
              onClick={() => {
                if (resumeId) {
                  navigate(`/matching/${resumeId}/${jd.id}`);
                } else {
                  navigate(`/resumes/upload?jdId=${jd.id}`);
                }
              }}
              className="px-6 py-2.5 font-bold shadow-lg"
            >
              <span>{resumeId ? 'Run Resume ↔ JD Match Engine' : 'Select / Upload Resume for Matching'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
