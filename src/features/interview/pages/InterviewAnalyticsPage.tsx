import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, FileText, TrendingUp, BarChart2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';
import { ReplayTimeline } from '../components/ReplayTimeline';
import { interviewService } from '../services/interview.service';
import { useInterviewStore } from '../store/InterviewStore';
import { InterviewReplayItem } from '../types/interview.types';

export const InterviewAnalyticsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { metrics } = useInterviewStore();
  const [replayItems, setReplayItems] = useState<InterviewReplayItem[]>([]);

  useEffect(() => {
    if (id) {
      interviewService.getReplay(id).then(setReplayItems);
    }
  }, [id]);

  return (
    <div className="flex flex-col space-y-6 w-full max-w-5xl mx-auto">
      <Topbar
        title="Post-Interview Analytics & Replay"
        description="Comprehensive score breakdowns, turn-by-turn answer replay, AI evaluator comments, and hiring outcome predictions."
        actions={
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/interviews')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Lobby
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/interviews/${id}/transcript`)}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Transcript Viewer
            </Button>
          </div>
        }
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-900/40 bg-emerald-950/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Technical Score
              </CardTitle>
              <Award className="w-5 h-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{metrics.technicalScore} / 100</div>
              <p className="text-xs text-emerald-400 mt-1">Exceeds Role Threshold (85%)</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-indigo-900/40 bg-indigo-950/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Communication & Clarity
              </CardTitle>
              <BarChart2 className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{metrics.communicationScore} / 100</div>
              <p className="text-xs text-indigo-400 mt-1">High Vocal Pacing ({metrics.wpm} WPM)</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-amber-900/40 bg-amber-950/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Hiring Outcome Prediction
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-extrabold text-emerald-400">STRONG HIRE</div>
              <p className="text-xs text-slate-400 mt-1">Top 5% Candidate Benchmark</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Turn-by-Turn Replay Timeline */}
      <ReplayTimeline replayItems={replayItems} />
    </div>
  );
};
