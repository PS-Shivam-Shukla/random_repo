import React from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';

export interface SummaryPanelProps {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  strengths,
  weaknesses,
  suggestions,
}) => {
  return (
    <Card className="border-indigo-900/40 bg-slate-900/80">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          AI Executive Candidate Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 text-xs">
        <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-sans">
          {summary}
        </p>

        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <h4 className="font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
              Key Strengths
            </h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
              {strengths.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {weaknesses.length > 0 && (
          <div>
            <h4 className="font-semibold text-rose-400 mb-1.5 flex items-center gap-1.5">
              <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
              Areas of Caution
            </h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
              {weaknesses.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Actionable Resume Enhancements
            </h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
              {suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
