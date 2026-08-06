import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';
import { SkillRadarChart, SkillProgressTrendChart } from '../../../components/charts/SkillCharts';
import { CompanyBenchmarkChart } from '../../../components/charts/CompanyBenchmarkChart';

export const CareerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="Career Intelligence & Adaptive Engine"
        description="Personalized career coaching, target role skill gap audits, FAANG company benchmarks, and learning roadmaps."
      />

      {/* Hero Welcome Card */}
      <Card className="border-indigo-900/40 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 shadow-2xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="rounded-full bg-indigo-950 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-800/50">
              AI Career Coach Engine
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Predict Hiring Outcomes & Bridge Skill Gaps
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuously learn from previous technical interview sessions, extract key strengths, and track your progression toward Tier-1 hiring thresholds.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => navigate('/interviews/setup')}>Launch Mock Interview</Button>
            <Button variant="outline" onClick={() => navigate('/resumes/library')}>
              Resume Vault
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid Row 1: Skill Radar & Company Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <SkillRadarChart />
        </div>
        <div className="lg:col-span-6">
          <CompanyBenchmarkChart />
        </div>
      </div>

      {/* Grid Row 2: Progression Trend */}
      <div className="grid grid-cols-1 gap-6">
        <SkillProgressTrendChart />
      </div>
    </div>
  );
};
