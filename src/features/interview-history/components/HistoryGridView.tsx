import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Building2, Calendar, Clock, Download, Eye, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../../../hooks/useInterviewHistory';
import { useDownloadReport } from '../../../hooks/useInterviewReport';

interface HistoryGridViewProps {
  items: HistoryItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onConfirmDelete: (item: HistoryItem) => void;
}

export function HistoryGridView({
  items,
  selectedIds,
  onToggleSelect,
  onConfirmDelete,
}: HistoryGridViewProps) {
  const navigate = useNavigate();
  const downloadReport = useDownloadReport();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id);

        const scoreBadgeVariant =
          item.score >= 85
            ? 'success'
            : item.score >= 70
              ? 'secondary'
              : item.score >= 50
                ? 'warning'
                : 'danger';

        return (
          <Card
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 ${
              isSelected
                ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-500'
                : 'border-neutral-200/80 dark:border-neutral-800'
            }`}
          >
            <CardContent className="p-0 space-y-4">
              {/* Header: Checkbox + Score Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(item.id)}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  />
                  <div className="rounded-xl bg-blue-600/10 p-2.5 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>

                <Badge variant={scoreBadgeVariant} className="text-xs font-bold font-mono px-2.5 py-0.5">
                  {item.score} / 100
                </Badge>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {item.roleTitle}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {item.companyName}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.completionDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  {item.durationMinutes}m
                </span>
              </div>

              {/* Round Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.rounds.map((r) => (
                  <span
                    key={r}
                    className="rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 text-[10px] font-semibold"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Quick Actions Row */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/reports?reportId=${item.id}`)}
                  className="h-8 text-xs font-medium rounded-xl border-neutral-200 dark:border-neutral-700"
                >
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  View Report
                </Button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => downloadReport.mutate(item.id)}
                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
                    title="Download Report PDF"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onConfirmDelete(item)}
                    className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Interview Record"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
