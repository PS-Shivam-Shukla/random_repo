import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Download, RefreshCw, BarChart2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';
import { useInterviewStore } from '../store/InterviewStore';
import { interviewService } from '../services/interview.service';

export const InterviewFinishedPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { metrics, transcriptEntries } = useInterviewStore();

  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <Topbar
        title="Session Finalized"
        description="Your AI interview evaluation has been saved to candidate memory and analytics report."
      />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 shadow-2xl text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-bold shadow-xl mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Interview Evaluation Completed
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Our multi-agent supervisor has evaluated your technical answers, speech metrics, and system design competency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left mb-6">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Technical Score</span>
              <p className="text-xl font-black text-emerald-400 mt-0.5">{metrics.technicalScore} / 100</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Communication</span>
              <p className="text-xl font-black text-indigo-400 mt-0.5">{metrics.communicationScore} / 100</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Hiring Prediction</span>
              <p className="text-xl font-black text-emerald-400 mt-0.5">Strong Hire</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => navigate(`/interviews/${id}/analytics`)}
              leftIcon={<BarChart2 className="w-4 h-4" />}
            >
              View Detailed Analytics
            </Button>
            <Button
              variant="outline"
              onClick={() => interviewService.downloadTranscriptText(id || 'session', transcriptEntries)}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Transcript
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/interviews/setup')}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Start Another Session
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
