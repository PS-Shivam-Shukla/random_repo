import React from 'react';
import { motion } from 'framer-motion';
import { Play, Upload, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';

export const InterviewLobbyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-slate-100">
      <Topbar
        title="AI Interview Session Pipeline"
        description="To ensure 100% precision, interviews require a validated Resume + Job Description to configure the Supervisor Agent."
        actions={
          <Button onClick={() => navigate('/resumes/upload')} leftIcon={<Upload className="w-4 h-4" />}>
            Start Step 1: Upload Resume
          </Button>
        }
      />

      {/* Hero Welcome Card */}
      <Card className="border-indigo-900/40 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 shadow-2xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="rounded-full bg-indigo-950 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-800/50">
              Enterprise Multi-Agent Pipeline
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Ready for your next AI Technical Evaluation?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our LangGraph supervisor extracts target role requirements from your Job Description and matches them against your Resume and Candidate Memory graph.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="lg" onClick={() => navigate('/resumes/upload')} leftIcon={<Play className="w-5 h-5" />}>
              Start Pipeline Flow
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Steps Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between h-full">
            <CardHeader className="pb-3">
              <span className="rounded-md bg-indigo-950 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-800/50">
                Step 1 & 2
              </span>
              <CardTitle className="text-base font-bold text-slate-100 mt-2">
                Resume & Job Description Upload
              </CardTitle>
              <CardDescription>Upload candidate document & target job description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-400">
              <p>Extracts technical skills, experience timeline, and company expectations.</p>
            </CardContent>
            <div className="p-4 border-t border-slate-800">
              <Button className="w-full" onClick={() => navigate('/resumes/upload')}>
                Upload Documents <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between h-full">
            <CardHeader className="pb-3">
              <span className="rounded-md bg-indigo-950 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-800/50">
                Step 3 & 4
              </span>
              <CardTitle className="text-base font-bold text-slate-100 mt-2">
                Matching & Supervisor Pre-Flight
              </CardTitle>
              <CardDescription>Calculates ATS match % & initializes 11 AI agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-400">
              <p>Verifies Domain Experts, HR Evaluators, and Candidate Memory synchronization.</p>
            </CardContent>
            <div className="p-4 border-t border-slate-800">
              <Button variant="outline" className="w-full" onClick={() => navigate('/matching/default/default')}>
                View Matching Engine <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between h-full">
            <CardHeader className="pb-3">
              <span className="rounded-md bg-emerald-950 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800/50">
                Step 5
              </span>
              <CardTitle className="text-base font-bold text-slate-100 mt-2">
                Live Voice Session & Evaluation
              </CardTitle>
              <CardDescription>ChatGPT-style interactive voice evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-400">
              <p>Real-time WebSockets, STT/TTS voice controls, and live rubric scoring.</p>
            </CardContent>
            <div className="p-4 border-t border-slate-800">
              <Button variant="outline" className="w-full" onClick={() => navigate('/supervisor/default/default')}>
                Check Agent Pre-Flight <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
