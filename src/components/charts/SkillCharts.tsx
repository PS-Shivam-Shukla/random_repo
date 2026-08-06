import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

export interface SkillDataPoint {
  skill: string;
  score: number;
  benchmark: number;
}

export interface SkillChartsProps {
  skillsData?: SkillDataPoint[];
}

const defaultSkillsData: SkillDataPoint[] = [
  { skill: 'System Design', score: 92, benchmark: 75 },
  { skill: 'Frontend / React', score: 96, benchmark: 80 },
  { skill: 'FastAPI Backend', score: 94, benchmark: 78 },
  { skill: 'PostgreSQL DB', score: 90, benchmark: 76 },
  { skill: 'DevOps / Docker', score: 88, benchmark: 72 },
  { skill: 'AI & LangGraph', score: 95, benchmark: 70 },
];

export const SkillRadarChart: React.FC<SkillChartsProps> = ({ skillsData = defaultSkillsData }) => (
  <Card className="border-slate-800 bg-slate-900 shadow-xl">
    <CardHeader className="pb-2 border-b border-slate-800">
      <CardTitle className="text-sm font-bold text-slate-100">Technical Skill Radar Benchmark</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
            <Radar name="Candidate" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            <Radar name="Industry Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const SkillBarChart: React.FC<SkillChartsProps> = ({ skillsData = defaultSkillsData }) => (
  <Card className="border-slate-800 bg-slate-900 shadow-xl">
    <CardHeader className="pb-2 border-b border-slate-800">
      <CardTitle className="text-sm font-bold text-slate-100">Domain Competency Comparison</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={skillsData}>
            <XAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
            <YAxis domain={[0, 100]} stroke="#475569" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
            <Bar dataKey="score" name="Candidate Score" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="benchmark" name="Benchmark" fill="#334155" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const SkillProgressTrendChart: React.FC = () => {
  const trendData = [
    { session: 'Interview 1', score: 72 },
    { session: 'Interview 2', score: 81 },
    { session: 'Interview 3', score: 89 },
    { session: 'Interview 4', score: 95 },
  ];

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-2 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100">Multi-Interview Score Progression Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <XAxis dataKey="session" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <YAxis domain={[50, 100]} stroke="#475569" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
