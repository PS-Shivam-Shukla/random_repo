import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';

export interface MemorySessionNode {
  id: string;
  title: string;
  date: string;
  score: number;
  skillsImproved: string[];
  weaknessesAddressed: string[];
  recruiterNotes: string;
}

export const CandidateMemoryTimeline: React.FC = () => {
  const memoryHistory: MemorySessionNode[] = [
    {
      id: 'mem-1',
      title: 'Interview 1 — Junior Technical Evaluation',
      date: '2026-07-15',
      score: 76,
      skillsImproved: ['Python Basics', 'REST APIs'],
      weaknessesAddressed: ['Async Concurrency'],
      recruiterNotes: 'Solid foundational coding, needs deeper system architecture knowledge.',
    },
    {
      id: 'mem-2',
      title: 'Interview 2 — Mid Level System Design',
      date: '2026-07-28',
      score: 86,
      skillsImproved: ['FastAPI Async Routing', 'PostgreSQL Indexing'],
      weaknessesAddressed: ['Redis Cache Invalidation'],
      recruiterNotes: 'Significantly improved backend latency understanding and ORM optimization.',
    },
    {
      id: 'mem-3',
      title: 'Interview 3 — Senior AI & Platform Architecture (Current)',
      date: '2026-08-05',
      score: 95,
      skillsImproved: ['LangGraph Multi-Agent Checkpointer', 'PCM Voice Streaming'],
      weaknessesAddressed: ['Distributed Lock Management'],
      recruiterNotes: 'Mastered production state graph persistence and real-time audio SLA.',
    },
  ];

  return (
    <Card className="border-indigo-900/30 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          Long-Term Candidate Memory Graph Progression
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-6">
        <div className="relative border-l-2 border-indigo-900/60 ml-4 space-y-6">
          {memoryHistory.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8"
            >
              {/* Timeline Avatar Node */}
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border-2 border-indigo-500 text-[10px] font-extrabold text-indigo-400 shadow-md">
                {idx + 1}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{session.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{session.date}</span>
                  </div>
                  <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-800/50">
                    {session.score}% Score
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Skills Improved
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {session.skillsImproved.map((sk) => (
                        <span key={sk} className="rounded bg-indigo-950 px-2 py-0.5 text-[10px] text-indigo-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Weaknesses Resolved
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {session.weaknessesAddressed.map((w) => (
                        <span key={w} className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-300">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  "{session.recruiterNotes}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
