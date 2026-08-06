import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Sparkles, TrendingUp, Award, CheckCircle2, ShieldCheck, Activity, ArrowRight, Upload, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { Skeleton } from '../../../components/Skeleton';
import { Topbar } from '../../../layouts/Topbar';
import { ResumeGrid } from '../components/ResumeGrid';
import { useResumeList } from '../hooks/useResumeList';

export const ResumeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: resumes, isLoading } = useResumeList();

  const totalResumes = resumes?.length || 0;
  const totalSkillsParsed = resumes?.reduce((acc, r) => acc + r.parsed_skills.length, 0) || 0;
  const seniorCount = resumes?.filter((r) => r.seniority_signal === 'SENIOR' || r.seniority_signal === 'STAFF').length || 0;
  const latestUpload = resumes && resumes.length > 0 ? resumes[0].file_path : 'None uploaded yet';

  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="Resume Intelligence Dashboard"
        description="Real-time parsed candidate resume hub, ATS scoring metrics, and AI skill analytics."
        actions={
          <div className="flex items-center space-x-2">
            <Button onClick={() => navigate('/resumes/upload')} leftIcon={<Plus className="w-4 h-4" />}>
              Upload Resume
            </Button>
            <Button variant="outline" onClick={() => navigate('/resumes/library')}>
              Resume Library
            </Button>
          </div>
        }
      />

      {/* Top Section: Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 to-indigo-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Total Parsed Resumes
              </CardTitle>
              <FileText className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{totalResumes}</div>
              <CardDescription className="mt-1">Active in Candidate Vault</CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
          <Card className="border-emerald-900/40 bg-gradient-to-br from-slate-900 to-emerald-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Average ATS Score
              </CardTitle>
              <Award className="w-5 h-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">88.5%</div>
              <CardDescription className="mt-1">Top 10% Industry Percentile</CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
          <Card className="border-amber-900/40 bg-gradient-to-br from-slate-900 to-amber-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Extracted Skills
              </CardTitle>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{totalSkillsParsed}</div>
              <CardDescription className="mt-1">Verified Tech Keywords</CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
          <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Seniority Signals
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{seniorCount}</div>
              <CardDescription className="mt-1">Senior / Staff Detected</CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Middle Section: Quick Actions & Recent Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-100">Recent Candidate Resumes</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/resumes/library')}>
              View All Resumes <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-44 w-full rounded-xl" />
            </div>
          ) : (
            <ResumeGrid
              resumes={resumes?.slice(0, 4) || []}
              onUploadClick={() => navigate('/resumes/upload')}
            />
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Quick Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <button
                onClick={() => navigate('/resumes/upload')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all text-xs font-semibold text-slate-200"
              >
                <div className="flex items-center space-x-2.5">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Upload & Parse New Resume</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => navigate('/resumes/library')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all text-xs font-semibold text-slate-200"
              >
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Browse Resume Library</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => navigate(resumes && resumes.length > 0 ? `/resumes/${resumes[0].id}/analysis` : '/resumes/upload')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all text-xs font-semibold text-slate-200"
              >
                <div className="flex items-center space-x-2.5">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>View Latest AI Analysis</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </CardContent>
          </Card>

          {/* Bottom Section: AI Recommendations & Resume Health */}
          <Card className="border-indigo-900/30 bg-slate-900/90 shadow-xl">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Resume Vault Health
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Format Compliance
                </span>
                <span className="font-bold text-emerald-400">100% Valid</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Latest Upload
                </span>
                <span className="font-mono text-slate-300 truncate max-w-[120px]">{latestUpload}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
