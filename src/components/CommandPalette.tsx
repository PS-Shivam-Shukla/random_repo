import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Command, LayoutDashboard, FileText, Brain, Mic, Shield, UserCheck, Upload, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/AppStore';

export interface CommandItem {
  id: string;
  category: 'Pages' | 'Resumes' | 'Interviews' | 'Analytics' | 'Settings';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  href: string;
}

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const items: CommandItem[] = [
    { id: '1', category: 'Pages', title: 'Dashboard Overview', subtitle: 'Global metrics hub', icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" />, href: '/dashboard' },
    { id: '2', category: 'Resumes', title: 'Resume Intelligence Vault', subtitle: 'Browse parsed candidate resumes', icon: <UserCheck className="w-4 h-4 text-emerald-400" />, href: '/resumes' },
    { id: '3', category: 'Resumes', title: 'Resume Library', subtitle: 'Filterable candidate resume grid', icon: <FileText className="w-4 h-4 text-emerald-400" />, href: '/resumes/library' },
    { id: '4', category: 'Resumes', title: 'Upload Candidate Resume', subtitle: 'PDF, DOCX, TXT parser', icon: <Upload className="w-4 h-4 text-emerald-400" />, href: '/resumes/upload' },
    { id: '5', category: 'Interviews', title: 'Interview Lobby & Launchpad', subtitle: 'Start voice or text sessions', icon: <Mic className="w-4 h-4 text-indigo-400" />, href: '/interviews' },
    { id: '6', category: 'Interviews', title: 'Configure AI Interview Setup', subtitle: 'Select role, company, difficulty', icon: <Settings className="w-4 h-4 text-indigo-400" />, href: '/interviews/setup' },
    { id: '7', category: 'Analytics', title: 'Candidate Memory Graph', subtitle: 'Multi-interview learning timeline', icon: <Brain className="w-4 h-4 text-amber-400" />, href: '/memory' },
    { id: '8', category: 'Analytics', title: 'Career Intelligence Benchmarks', subtitle: 'Skill gap audit & learning roadmap', icon: <Brain className="w-4 h-4 text-amber-400" />, href: '/career' },
    { id: '9', category: 'Analytics', title: 'Recruiter Governance Dashboard', subtitle: 'Enterprise hiring metrics', icon: <Users className="w-4 h-4 text-emerald-400" />, href: '/recruiter' },
    { id: '10', category: 'Settings', title: 'Admin & System Settings', subtitle: 'Feature flags & API security', icon: <Shield className="w-4 h-4 text-rose-400" />, href: '/admin' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (href: string) => {
    navigate(href);
    setCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative z-50 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
          >
            <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950">
              <Search className="w-4 h-4 text-slate-400 mr-3" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search resumes, interviews, analytics..."
                className="w-full bg-transparent py-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                <Command className="w-3 h-3" /> K
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-slate-200 hover:bg-slate-800/80 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-slate-700">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-100">{item.title}</p>
                        {item.subtitle && <p className="text-[11px] text-slate-400">{item.subtitle}</p>}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {item.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">No matching routes or resources found.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
