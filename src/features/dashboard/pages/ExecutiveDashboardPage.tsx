import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Award, TrendingUp, Sparkles, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';
import { SkillRadarChart, SkillProgressTrendChart } from '../../../components/charts/SkillCharts';
import { HiringPredictionGauge } from '../../../components/charts/HiringPredictionGauge';
import { CompanyBenchmarkChart } from '../../../components/charts/CompanyBenchmarkChart';
import { dashboardService } from '../services/dashboard.service';
import { ExecutiveMetrics } from '../types/dashboard.types';

export const ExecutiveDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null);

  useEffect(() => {
    dashboardService.getExecutiveMetrics().then(setMetrics);
  }, []);

  return (
    <div className="flex flex-col space-y-6 w-full font-sans antialiased text-slate-100">
      <Topbar
        title="Executive AI Operations Dashboard"
        description="Enterprise platform metrics, hiring prediction odds, FAANG benchmarks, and multi-agent skill evaluations."
        actions={
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => navigate('/resumes/upload')}
              leftIcon={<Upload className="w-4 h-4" />}
              className="bg-indigo-600 hover:bg-indigo-500 font-bold"
            >
              Start AI Interview Pipeline
            </Button>
            <Button variant="outline" onClick={() => navigate('/resumes')}>
              View Resume Library
            </Button>
          </div>
        }
      />

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 to-indigo-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Total Candidate Interviews
              </CardTitle>
              <Activity className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{metrics?.totalInterviews || 142}</div>
              <p className="text-xs text-slate-400 mt-1">{metrics?.activeInterviews || 8} Active Sessions Now</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-emerald-900/40 bg-gradient-to-br from-slate-900 to-emerald-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Evaluation Success Rate
              </CardTitle>
              <Award className="w-5 h-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{metrics?.successRate || 91.5}%</div>
              <p className="text-xs text-emerald-400 mt-1">Top 5% Platform SLA</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-amber-900/40 bg-gradient-to-br from-slate-900 to-amber-950/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Average ATS Audit Score
              </CardTitle>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">{metrics?.avgAtsScore || 88.5}%</div>
              <p className="text-xs text-slate-400 mt-1">High ATS Keyword Alignment</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Avg Hiring Probability
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-indigo-400">{metrics?.avgHiringProbability || 94}%</div>
              <p className="text-xs text-slate-400 mt-1">Strong Hire Recommendation</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 2: Hiring Prediction Gauge & Company Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <HiringPredictionGauge
            hireProbability={metrics?.avgHiringProbability || 94}
            confidenceScore={92}
            recommendation="STRONG HIRE"
          />
        </div>
        <div className="lg:col-span-6">
          <CompanyBenchmarkChart />
        </div>
      </div>

      {/* Row 3: Skill Charts & Progression Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <SkillRadarChart />
        </div>
        <div className="lg:col-span-6">
          <SkillProgressTrendChart />
        </div>
      </div>
    </div>
  );
};
