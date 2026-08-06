import React, { useState } from 'react';
import { FileText, Code, Sparkles, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Tabs } from '../../../components/Tabs';
import { Resume } from '../types/resume.types';

export interface ResumeViewerProps {
  resume: Resume;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ resume }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(12); // px

  const handleZoomIn = () => setFontSize((prev) => Math.min(20, prev + 2));
  const handleZoomOut = () => setFontSize((prev) => Math.max(10, prev - 2));
  const handleResetZoom = () => setFontSize(12);

  const getHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-amber-400/30 text-amber-200 rounded px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="h-full flex flex-col border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <CardTitle className="text-base font-bold text-slate-100 truncate max-w-xs">{resume.file_path}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search document..."
                className="w-36 rounded-lg bg-slate-950 border border-slate-800 py-1 pl-8 pr-2 text-[11px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={handleZoomOut}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors text-[10px] font-mono"
                title="Reset Zoom"
              >
                {fontSize}px
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex-1 overflow-y-auto max-h-[680px]">
        <Tabs
          items={[
            {
              id: 'formatted',
              label: 'Parsed Skills Overview',
              icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
              content: (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Parsed Skills ({resume.parsed_skills.length})</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.parsed_skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-indigo-950/70 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-800/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Seniority Signal</h4>
                    <span className="rounded bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800/50">
                      {resume.seniority_signal}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              id: 'raw',
              label: 'Raw Document Reader',
              icon: <Code className="w-4 h-4 text-slate-400" />,
              content: (
                <div
                  style={{ fontSize: `${fontSize}px` }}
                  className="rounded-xl bg-slate-950 p-4 font-mono text-slate-300 leading-relaxed whitespace-pre-wrap border border-slate-800 selection:bg-indigo-500 selection:text-white"
                >
                  {getHighlightedText(resume.raw_text || 'No raw text stored.', searchQuery)}
                </div>
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
