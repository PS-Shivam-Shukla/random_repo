import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Wifi, Server, Activity, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="System Operations & Governance Admin"
        description="FastAPI gateway health, PostgreSQL checkpointer status, model latency SLA, and active WebSockets."
        actions={
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Refresh Diagnostics
          </Button>
        }
      />

      {/* Top System SLA Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-900/40 bg-emerald-950/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                FastAPI Gateway Status
              </CardTitle>
              <Server className="w-5 h-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" /> 99.99% Operational
              </div>
              <p className="text-xs text-slate-400 mt-1">Uptime: 42 Days 14 Hours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-indigo-900/40 bg-indigo-950/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Active WebSockets
              </CardTitle>
              <Wifi className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">18 Sessions</div>
              <p className="text-xs text-indigo-400 mt-1">Avg Latency: 12ms</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-slate-800 bg-slate-900 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                PostgreSQL Saver Storage
              </CardTitle>
              <Database className="w-5 h-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-100">14.2 GB</div>
              <p className="text-xs text-slate-400 mt-1">ACID Isolated Persistence</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-slate-800 bg-slate-900 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Worker Threads SLA
              </CardTitle>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-emerald-400">8 / 8 Active</div>
              <p className="text-xs text-slate-400 mt-1">0 Queue Backlog</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Model & Agent SLA Monitor */}
      <Card className="border-slate-800 bg-slate-900 shadow-xl">
        <CardHeader className="pb-3 border-b border-slate-800">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            LangGraph Agent Supervisors & Model Provider Status
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <div>
                <p className="font-bold text-slate-100">LangGraph Supervisor Engine</p>
                <p className="text-slate-400 text-[11px]">Multi-agent turn orchestration</p>
              </div>
            </div>
            <span className="text-emerald-400 font-bold">Optimal (120ms)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <div>
                <p className="font-bold text-slate-100">PostgreSQL Checkpointer</p>
                <p className="text-slate-400 text-[11px]">State serialization & rollbacks</p>
              </div>
            </div>
            <span className="text-emerald-400 font-bold">100% Synced</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <div>
                <p className="font-bold text-slate-100">Candidate Memory Graph Engine</p>
                <p className="text-slate-400 text-[11px]">Long-term interview state graph</p>
              </div>
            </div>
            <span className="text-emerald-400 font-bold">Operational</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
