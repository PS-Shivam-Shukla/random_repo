import { useState } from 'react';
import { Download, Calendar, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useDownloadReport } from '../../../hooks/useInterviewReport';

interface ReportHeaderProps {
  reportId: string;
  reportTitle: string;
  candidateRole: string;
  completionDate: string;
}

export function ReportHeader({
  reportId,
  reportTitle,
  candidateRole,
  completionDate,
}: ReportHeaderProps) {
  const downloadReport = useDownloadReport();
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  const handleDownload = () => {
    setShowDownloadToast(true);
    setTimeout(() => setShowDownloadToast(false), 2500);
    downloadReport.mutate(reportId);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-neutral-200/80 dark:border-neutral-800">
      {/* Toast Notification */}
      {showDownloadToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <Sparkles className="h-4 w-4 animate-spin" />
          <span>Generating PDF Report Artifact...</span>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl font-display">
            {reportTitle}
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
            Verified Report
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {candidateRole}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {completionDate}
          </span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleDownload}
        disabled={downloadReport.isPending}
        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-11 shrink-0"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Report PDF
      </Button>
    </div>
  );
}
