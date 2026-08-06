import React from 'react';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { ErrorCard } from '../../../components/ErrorCard';
import { Skeleton } from '../../../components/Skeleton';
import { Topbar } from '../../../layouts/Topbar';
import { ATSScoreCard } from '../components/ATSScoreCard';
import { SkillCloud } from '../components/SkillCloud';
import { SummaryPanel } from '../components/SummaryPanel';
import { useResume, useResumeAnalysis } from '../hooks/useResumeAnalysis';

export const ResumeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: resume, isLoading: isResumeLoading, isError: isResumeError, refetch: refetchResume } = useResume(id);
  const { data: analysis, isLoading: isAnalysisLoading } = useResumeAnalysis(id);

  if (isResumeLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (isResumeError || !resume) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorCard
          title="Resume Document Not Found"
          message="Could not load the requested resume file record."
          onRetry={refetchResume}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full max-w-6xl mx-auto p-4 md:p-6 text-slate-100 font-sans">
      <Topbar
        title={`Document Reader: ${resume.file_path}`}
        description={`Uploaded on ${new Date(resume.created_at).toLocaleDateString()} | Seniority Signal: ${resume.seniority_signal}`}
        actions={
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/resumes')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to List
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/resumes/${id}/analysis`)}
              leftIcon={<ExternalLink className="w-4 h-4" />}
            >
              View Full AI Analysis
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Columns: Extracted Raw PDF Text Display */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Raw Text Viewer
            </span>
            <span className="text-slate-500 font-mono">{resume.raw_text.length} chars</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 overflow-y-auto max-h-[600px] leading-relaxed whitespace-pre-wrap shadow-inner">
            {resume.raw_text || 'No extracted text available for this document.'}
          </div>
        </div>

        {/* Right 6 Columns: AI Summary & Quality Cards */}
        <div className="lg:col-span-6 space-y-6">
          {isAnalysisLoading || !analysis ? (
            <div className="space-y-4">
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : (
            <>
              <ATSScoreCard resumeQualityScore={analysis.resume_quality_score} />
              <SkillCloud skills={analysis.skills} />
              <SummaryPanel
                summary={analysis.summary}
                strengths={analysis.strengths}
                weaknesses={analysis.weaknesses}
                suggestions={analysis.suggestions}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
