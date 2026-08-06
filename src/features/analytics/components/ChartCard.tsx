import { useState, ReactNode } from 'react';
import { Download, Maximize2, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  legend?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  legend,
  className,
}: ChartCardProps) {
  const [showToast, setShowToast] = useState(false);

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <Card className={`group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 ${className || ''}`}>
      {showToast && (
        <div className="absolute top-3 right-12 z-20 flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white shadow-md animate-in fade-in">
          <Sparkles className="h-3 w-3" />
          <span>Exporting Chart SVG...</span>
        </div>
      )}

      <CardHeader className="p-0 pb-4 flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {legend}
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
            title="Export chart SVG data"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
            title="Expand chart view"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-0 min-h-[260px] flex items-center justify-center">
        {children}
      </CardContent>
    </Card>
  );
}
