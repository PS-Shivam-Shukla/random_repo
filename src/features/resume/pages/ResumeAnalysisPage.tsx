import React from 'react';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowLeft, ArrowRight, BarChart2, Calendar, FileText, Hash, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { ErrorCard } from '../../../components/ErrorCard';
import { Progress } from '../../../components/Progress';
import { Skeleton } from '../../../components/Skeleton';
import { Topbar } from '../../../layouts/Topbar';
import { ATSScoreCard } from '../components/ATSScoreCard';
import { CertificationCards } from '../components/CertificationCards';
import { EducationTimeline } from '../components/EducationTimeline';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ProjectCards } from '../components/ProjectCards';
import { SkillCloud } from '../components/SkillCloud';
import { SummaryPanel } from '../components/SummaryPanel';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';

export const ResumeAnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: analysis, isLoading, isError, error, refetch } = useResumeAnalysis(id);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto p-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !analysis) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorCard
          title="Analysis Failed to Load"
          message={error?.message || 'Could not fetch deep AI resume analysis.'}
          onRetry={refetch}
        />
      </div>
    );
  }

  const qualityScore = analysis.resume_quality_score ?? 85;

  return (
    <div className="flex flex-col space-y-6 w-full max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-100">
      {/* Sprint 0.1 Pipeline Step Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
          ✓ Step 1: Resume Upload & AI Intelligence
        </span>
        <span className="text-slate-500">Step 2: Job Description Upload (Sprint 0.2)</span>
        <span className="text-slate-500">Step 3: Matching Engine</span>
        <span className="text-slate-500">Step 4: Live Interview</span>
      </div>

      {/* Document Metadata Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 font-bold text-slate-100">
            <FileText className="w-4 h-4 text-indigo-400" />
            Resume Name: <span className="text-indigo-300">{analysis.file_name}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Hash className="w-3.5 h-3.5 text-slate-500" />
            ID: {analysis.resume_id}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <span className="flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Last Uploaded: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <Topbar
        title={`AI Analysis Showcase: ${analysis.file_name}`}
        description="Deep multi-agent architectural skill evaluation, radar competency benchmarks, work timeline, and section completeness."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/resumes/${id}`)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Document Reader
          </Button>
        }
      />

      {/* Showcase Header Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 to-indigo-950/20 shadow-xl text-center py-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs uppercase font-semibold text-indigo-400">Resume Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-black text-slate-100">{qualityScore}%</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}>
          <Card className="border-emerald-900/40 bg-gradient-to-br from-slate-900 to-emerald-950/20 shadow-xl text-center py-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs uppercase font-semibold text-emerald-400">Section Completeness</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-black text-slate-100">{qualityScore} / 100</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="border-amber-900/40 bg-gradient-to-br from-slate-900 to-amber-950/20 shadow-xl text-center py-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs uppercase font-semibold text-amber-400">Seniority Signal</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-black text-slate-100">{analysis.seniority_signal}</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <Card className="border-slate-800 bg-slate-900/90 shadow-xl text-center py-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs uppercase font-semibold text-slate-400">Industry Percentile</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-black text-indigo-400">Top {analysis.industry_percentile || 88}%</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Radar Chart & Work Timelines */}
        <div className="lg:col-span-8 space-y-6">
          {/* Radar Competency Chart Card */}
          <Card className="border-slate-800 bg-slate-900 shadow-xl">
            <CardHeader className="pb-2 border-b border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                Technical Competency Radar (Candidate vs Industry Benchmark)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={analysis.radar_skills}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                    <Radar name="Candidate" dataKey="candidateScore" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                    <Radar name="Industry Benchmark" dataKey="benchmarkScore" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <ExperienceTimeline experience={analysis.experience} />
          <ProjectCards projects={analysis.projects} />
          <EducationTimeline education={analysis.education} />
        </div>

        {/* Right Column: ATS Score, Skill Cloud, Section Completeness, Summary */}
        <div className="lg:col-span-4 space-y-6">
          <ATSScoreCard
            resumeQualityScore={qualityScore}
            industryPercentile={analysis.industry_percentile}
          />

          {/* Section Completeness Progress Card */}
          <Card className="border-slate-800 bg-slate-900 shadow-xl">
            <CardHeader className="pb-2 border-b border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Section Completeness Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Progress value={analysis.section_completeness.contact} showValue label="Contact & Identifiers" />
              <Progress value={analysis.section_completeness.summary} showValue label="Executive Summary" />
              <Progress value={analysis.section_completeness.experience} showValue label="Work History & Metrics" />
              <Progress value={analysis.section_completeness.skills} showValue label="Technical Skill Breakdown" />
              <Progress value={analysis.section_completeness.education} showValue label="Education & Credentials" />
            </CardContent>
          </Card>

          <SkillCloud skills={analysis.skills} />
          <CertificationCards certifications={analysis.certifications} />
          <SummaryPanel
            summary={analysis.summary}
            strengths={analysis.strengths}
            weaknesses={analysis.weaknesses}
            suggestions={analysis.suggestions}
          />
        </div>
      </div>

      {/* Sprint 0.1 Required CTA Footer Button */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Step 1 Complete: Resume Parsed & Analyzed</h4>
            <p className="text-xs text-slate-400">Next pipeline stage requires uploading a Job Description for ATS matching.</p>
          </div>
        </div>
        <Button
          disabled
          className="px-6 py-3 font-bold bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
        >
          <span>Continue to Job Description</span>
          <span className="ml-2 text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300 border border-slate-800">
            Coming in Sprint 0.2
          </span>
          <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
        </Button>
      </div>
    </div>
  );
};
