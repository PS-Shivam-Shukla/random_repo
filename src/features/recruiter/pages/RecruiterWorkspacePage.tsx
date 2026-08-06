import React, { useState } from 'react';
import { Users, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Select } from '../../../components/Select';
import { Topbar } from '../../../layouts/Topbar';

export interface RecruiterCandidate {
  id: string;
  name: string;
  role: string;
  atsScore: number;
  technicalScore: number;
  hiringRecommendation: 'STRONG HIRE' | 'HIRE' | 'LEAN HIRE';
  seniority: string;
  updatedAt: string;
}

export const RecruiterWorkspacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [seniorityFilter, setSeniorityFilter] = useState('ALL');

  const candidates: RecruiterCandidate[] = [
    { id: 'cand-1', name: 'Alex Mercer', role: 'Senior AI Architect', atsScore: 98, technicalScore: 95, hiringRecommendation: 'STRONG HIRE', seniority: 'STAFF', updatedAt: '2026-08-05' },
    { id: 'cand-2', name: 'Sarah Chen', role: 'Staff Backend Engineer', atsScore: 94, technicalScore: 92, hiringRecommendation: 'STRONG HIRE', seniority: 'SENIOR', updatedAt: '2026-08-04' },
    { id: 'cand-3', name: 'Marcus Vance', role: 'Full-Stack Developer', atsScore: 89, technicalScore: 88, hiringRecommendation: 'HIRE', seniority: 'MID', updatedAt: '2026-08-03' },
    { id: 'cand-4', name: 'Elena Rostova', role: 'DevOps & Cloud Engineer', atsScore: 91, technicalScore: 90, hiringRecommendation: 'STRONG HIRE', seniority: 'SENIOR', updatedAt: '2026-08-02' },
  ];

  const filtered = candidates.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeniority = seniorityFilter === 'ALL' || c.seniority === seniorityFilter;
    return matchesQuery && matchesSeniority;
  });

  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="Recruiter Workspace & Candidate Ranking Portal"
        description="Candidate queue, automated ATS skill matching, technical score comparison tables, and hiring recommendations."
      />

      {/* Top Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or target role..."
              className="w-64 rounded-xl bg-slate-950 border border-slate-800 py-2 pl-9 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <Select
            value={seniorityFilter}
            onChange={(e) => setSeniorityFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Seniority Levels' },
              { value: 'STAFF', label: 'Staff / Principal' },
              { value: 'SENIOR', label: 'Senior Level' },
              { value: 'MID', label: 'Mid Level' },
            ]}
            className="w-48"
          />
        </div>

        <span className="text-xs font-mono text-indigo-400 font-semibold bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Showing {filtered.length} Evaluated Candidates
        </span>
      </div>

      {/* Candidate Ranking Comparison Table */}
      <Card className="border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-800">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Candidate Evaluation Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">Target Job Role</th>
                  <th className="p-3.5">Seniority</th>
                  <th className="p-3.5">ATS Score</th>
                  <th className="p-3.5">Tech Rating</th>
                  <th className="p-3.5">Hiring Outcome</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-slate-100 flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-indigo-950 text-indigo-400 font-extrabold flex items-center justify-center border border-indigo-800/50">
                        {candidate.name.charAt(0)}
                      </div>
                      <span>{candidate.name}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">{candidate.role}</td>
                    <td className="p-3.5 font-mono">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700">
                        {candidate.seniority}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-400">{candidate.atsScore}%</td>
                    <td className="p-3.5 font-bold text-indigo-400">{candidate.technicalScore} / 100</td>
                    <td className="p-3.5">
                      <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-400 border border-emerald-800/50 flex items-center gap-1 w-max">
                        <ShieldCheck className="w-3 h-3" /> {candidate.hiringRecommendation}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button size="sm" variant="outline">
                        View Dossier <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
