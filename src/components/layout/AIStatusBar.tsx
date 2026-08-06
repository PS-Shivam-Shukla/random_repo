import { useState, useEffect } from 'react';
import { BrainCircuit, Cpu, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AGENT_ACTIVITIES = [
  { agent: 'Question Synthesizer Agent', task: 'Synthesizing STAR behavioral and system design prompts...', latency: '142ms' },
  { agent: 'Evaluation Agent', task: 'Calculating live technical coverage & confidence index...', latency: '88ms' },
  { agent: 'ATS Matcher Agent', task: 'Parsing resume PDF vectors & matching against target JD...', latency: '210ms' },
  { agent: 'STAR Assessor Agent', task: 'Analyzing situation-action impact metrics...', latency: '165ms' },
  { agent: 'Career Coach Agent', task: 'Updating 4-week personalized growth roadmap...', latency: '95ms' },
];

export function AIStatusBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % AGENT_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = AGENT_ACTIVITIES[index];

  return (
    <div className="h-7 bg-slate-900 text-white border-b border-indigo-500/20 px-4 flex items-center justify-between text-[11px] font-mono select-none z-50">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center gap-1.5 font-bold text-indigo-400 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-400 ai-pulse-ring" />
          <BrainCircuit className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">LANGGRAPH AGENTS ACTIVE:</span>
        </div>

        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-slate-200 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-400/20 shrink-0">
            {current.agent}
          </span>
          <span className="text-slate-400 truncate hidden md:inline">
            {current.task}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Cpu className="h-3 w-3 text-indigo-400" />
          <span>Latency: <span className="text-emerald-400 font-bold">{current.latency}</span></span>
        </div>

        <Link
          to="/agent-monitoring"
          className="flex items-center gap-1 text-indigo-300 hover:text-white font-bold bg-indigo-500/20 hover:bg-indigo-500/40 px-2 py-0.5 rounded-md transition-all"
        >
          <Activity className="h-3 w-3 text-emerald-400" />
          <span>Live Cluster</span>
        </Link>
      </div>
    </div>
  );
}
