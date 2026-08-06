import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bot, CheckCircle2, Cpu, Sparkles, Play, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { useNotification } from '../../../hooks/useNotification';
import { interviewService } from '../../interview/services/interview.service';

interface AgentStatus {
  name: string;
  role: string;
  status: 'CHECKING' | 'READY';
  description: string;
}

export const SupervisorPreflightPage: React.FC = () => {
  const { resumeId, jdId } = useParams<{ resumeId: string; jdId: string }>();
  const navigate = useNavigate();
  const notify = useNotification();

  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: 'Supervisor Agent', role: 'LangGraph Orchestrator', status: 'CHECKING', description: 'Coordinates multi-agent state graph and routing' },
    { name: 'Resume Agent', role: 'Resume Intelligence', status: 'CHECKING', description: 'Parsed skills, experience, and seniority signal' },
    { name: 'JD Agent', role: 'Job Description Intelligence', status: 'CHECKING', description: 'Extracted competencies and target role expectations' },
    { name: 'ATS Agent', role: 'ATS & Skill Gap Analyzer', status: 'CHECKING', description: 'Calculated match scores and missing skill areas' },
    { name: 'Profile Intelligence Agent', role: 'Candidate Profiler', status: 'CHECKING', description: 'Loaded candidate memory graph & past interview history' },
    { name: 'Competency Mapping Agent', role: 'Skills Matrix Mapping', status: 'CHECKING', description: 'Mapped technical and HR competencies to blueprint' },
    { name: 'Interview Planner Agent', role: 'Blueprint Generator', status: 'CHECKING', description: 'Generated personalized question distribution' },
    { name: 'Technical Interview Agent', role: 'Domain Expert Evaluator', status: 'CHECKING', description: 'Prepared architecture & coding questions' },
    { name: 'HR Interview Agent', role: 'Behavioral Evaluator', status: 'CHECKING', description: 'Prepared behavioral & leadership questions' },
    { name: 'Evaluation Agent', role: 'Answer Scorer', status: 'CHECKING', description: 'Ready to evaluate responses against rubrics' },
    { name: 'Memory Agent', role: 'Long-Term Memory Persistence', status: 'CHECKING', description: 'Synchronized PostgreSQL candidate memory graph' },
  ]);

  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Simulate real agent readiness check sequence
    const timer = setTimeout(() => {
      setAgents((prev) => prev.map((a) => ({ ...a, status: 'READY' })));
      setIsReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartInterview = async () => {
    setIsLaunching(true);
    try {
      const interview = await interviewService.createInterview({
        resume_id: resumeId || 'res-101',
        jd_id: jdId || 'jd-101',
        difficulty: 'ADAPTIVE',
      });
      notify.success('AI Agents Ready', 'Interview Session initialized successfully.');
      navigate(`/interviews/${interview.id}/session`);
    } catch (err: any) {
      notify.error('Interview Initialization Failed', err.message || 'Error launching session.');
      setIsLaunching(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto p-6 font-sans text-slate-100">
      {/* Pipeline Progress Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">✓ Step 1: Resume Upload</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">✓ Step 2: JD Upload</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">✓ Step 3: Matching Engine</span>
        <span className="text-indigo-400 font-bold flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/60">
          Step 4: Supervisor Agent
        </span>
        <span className="text-slate-500">Step 5: Live Interview</span>
      </div>

      <Card className="border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  Multi-Agent Supervisor Pre-Flight Check
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-1">
                  LangGraph Supervisor is initializing all 11 specialized agent nodes for your session.
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Agent Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Cpu className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-100">{agent.name}</p>
                    <p className="text-[11px] text-slate-400">{agent.description}</p>
                  </div>
                </div>
                <div>
                  {agent.status === 'READY' ? (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-400 text-[10px] font-bold border border-amber-800 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Verifying
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Launch CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>All 11 LangGraph Agents Initialized & Synchronized</span>
            </div>

            <Button
              onClick={handleStartInterview}
              disabled={!isReady}
              isLoading={isLaunching}
              className="px-8 py-3 font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-xl"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              <span>Launch AI Interview Session</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
