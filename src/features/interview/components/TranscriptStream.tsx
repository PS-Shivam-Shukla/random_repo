import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Download, Search, Pin, PinOff, ArrowDown } from 'lucide-react';
import { Button } from '../../../components/Button';
import { TranscriptEntry } from '../types/interview.types';

export interface TranscriptStreamProps {
  entries: TranscriptEntry[];
  onDownload?: () => void;
}

export const TranscriptStream: React.FC<TranscriptStreamProps> = ({ entries, onDownload }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedIds, setPinnedIds] = useState<Record<string, boolean>>({});
  const [isAtBottom, setIsAtBottom] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries, isAtBottom]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 60;
    setIsAtBottom(atBottom);
  };

  const handleCopy = (_id: string, text: string) => {
    navigator.clipboard.writeText(text);
  };

  const togglePin = (id: string) => {
    setPinnedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportMarkdown = () => {
    const md = entries.map((e) => `### **${e.speaker}** *(${e.timestamp})*\n\n${e.text}\n`).join('\n---\n\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interview_transcript.md';
    link.click();
  };

  const filteredEntries = entries.filter((e) =>
    e.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden relative">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-40 rounded-lg bg-slate-900 border border-slate-800 py-1 pl-8 pr-2 text-[11px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-1.5">
          <Button variant="ghost" size="sm" onClick={handleExportMarkdown}>
            .MD
          </Button>
          {onDownload && (
            <Button variant="ghost" size="sm" onClick={onDownload} leftIcon={<Download className="w-3.5 h-3.5" />}>
              TXT
            </Button>
          )}
        </div>
      </div>

      {/* Transcript Messages Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[520px]"
      >
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, idx) => {
            const isAI = entry.speaker === 'AI';
            const isPinned = !!pinnedIds[entry.id];
            const isLatest = idx === filteredEntries.length - 1;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="rounded-xl bg-indigo-950 p-2 text-indigo-400 border border-indigo-800/50 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed border shadow-md relative group ${
                    isAI
                      ? isLatest
                        ? 'bg-slate-950 text-slate-100 border-indigo-500/50 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950 text-slate-200 border-slate-800'
                      : 'bg-indigo-600 text-white border-indigo-500'
                  } ${isPinned && 'ring-2 ring-amber-400/50'}`}
                >
                  <div className="flex justify-between items-center mb-1 space-x-2">
                    <span className="font-bold text-[10px] uppercase opacity-80 flex items-center gap-1">
                      {isAI ? 'InterviewSage AI' : 'Candidate'}
                      {isPinned && <Pin className="w-3 h-3 text-amber-400" />}
                    </span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => togglePin(entry.id)}
                        className="p-1 rounded hover:bg-slate-800/50 text-slate-300"
                        title="Pin turn"
                      >
                        {isPinned ? <PinOff className="w-3 h-3 text-amber-400" /> : <Pin className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => handleCopy(entry.id, entry.text)}
                        className="p-1 rounded hover:bg-slate-800/50 text-slate-300"
                        title="Copy message"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p>{entry.text}</p>
                </div>

                {!isAI && (
                  <div className="rounded-xl bg-indigo-600 p-2 text-white flex-shrink-0 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="text-center text-xs text-slate-500 py-8">No transcript entries recorded yet.</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Auto-scroll to bottom button */}
      {!isAtBottom && (
        <button
          onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-1 text-xs"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
