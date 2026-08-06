import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900/50 py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div>
        © 2026 <span className="font-semibold text-slate-300">InterviewSage AI</span>. Enterprise AI Interview Platform.
      </div>
      <div className="flex items-center space-x-4 text-slate-400">
        <a href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-slate-200 transition-colors">Terms of Service</a>
        <a href="#docs" className="hover:text-slate-200 transition-colors">Documentation</a>
      </div>
    </footer>
  );
};
