import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Building2, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { useNotification } from '../../../hooks/useNotification';
import { jdService } from '../../../services/jd.service';

export const JDUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resumeId');

  const [targetRole, setTargetRole] = useState('Senior Full-Stack & AI Architect');
  const [companyName, setCompanyName] = useState('InterviewSage Tech');
  const [industry] = useState('Artificial Intelligence & Software SaaS');
  const [rawText, setRawText] = useState(
    `We are seeking a Senior Full-Stack & AI Architect to lead multi-agent system design, high-performance FastAPI backends, and modern React 19 interfaces.

Key Responsibilities:
- Architect autonomous AI agents using LangGraph and PostgreSQL state persistence.
- Engineer real-time WebSocket voice pipelines with low latency.
- Build high-scale REST APIs with Python, FastAPI, and Redis.
- Design responsive frontend applications with React, TypeScript, and TailwindCSS.

Required Skills:
- Python, FastAPI, PostgreSQL, Redis, LangGraph, LLMs, WebSockets.
- React, TypeScript, Vite, TailwindCSS, State Management.
- System Architecture, Microservices, CI/CD, Docker.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim() || !targetRole.trim()) {
      notify.error('Validation Error', 'Please enter a target role and job description content.');
      return;
    }

    setIsSubmitting(true);
    try {
      const jd = await jdService.createJobDescription({
        raw_text: rawText,
        target_role: targetRole,
        company_name: companyName,
        industry: industry,
      });

      notify.success('Job Description Processed', 'JD parsed and skills extracted successfully.');
      if (resumeId) {
        navigate(`/matching/${resumeId}/${jd.id}`);
      } else {
        navigate(`/job-descriptions/${jd.id}`);
      }
    } catch (err: any) {
      notify.error('JD Parsing Error', err.message || 'Failed to process Job Description.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto p-6 font-sans text-slate-100">
      {/* Pipeline Progress Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
          ✓ Step 1: Resume Upload
        </span>
        <span className="text-indigo-400 font-bold flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/60">
          Step 2: Job Description Upload
        </span>
        <span className="text-slate-500">Step 3: Matching Engine</span>
        <span className="text-slate-500">Step 4: Supervisor Agent</span>
        <span className="text-slate-500">Step 5: Live Interview</span>
      </div>

      <Card className="border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                Job Description Analysis Engine
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">
                Paste or upload the Job Description to extract required competencies for AI supervisor matching.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Target Role Title"
                placeholder="e.g. Senior AI Architect"
                leftIcon={<Briefcase className="w-4 h-4 text-slate-400" />}
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                required
              />
              <Input
                label="Company Name"
                placeholder="e.g. InterviewSage AI"
                leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Job Description Raw Text / Requirements
              </label>
              <textarea
                rows={10}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Paste complete job description text here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                JD Agent will extract technical competencies & seniority expectations.
              </span>
              <Button type="submit" isLoading={isSubmitting} className="px-6 py-2.5 font-bold shadow-lg">
                <span>Analyze Job Description</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
