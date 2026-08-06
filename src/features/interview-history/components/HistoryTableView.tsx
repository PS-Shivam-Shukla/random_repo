import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Eye, Download, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../../../hooks/useInterviewHistory';
import { useDownloadReport } from '../../../hooks/useInterviewReport';

interface HistoryTableViewProps {
  items: HistoryItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onConfirmDelete: (item: HistoryItem) => void;
}

export function HistoryTableView({
  items,
  selectedIds,
  onToggleSelect,
  onConfirmDelete,
}: HistoryTableViewProps) {
  const navigate = useNavigate();
  const downloadReport = useDownloadReport();

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <table className="w-full text-xs text-left">
        <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-neutral-500 font-mono dark:bg-neutral-950/60 dark:border-neutral-800">
          <tr>
            <th className="p-3.5 w-8">
              <span className="sr-only">Select</span>
            </th>
            <th className="p-3.5 font-semibold">Target Role & Company</th>
            <th className="p-3.5 font-semibold">Date & Duration</th>
            <th className="p-3.5 font-semibold">Format / Rounds</th>
            <th className="p-3.5 font-semibold">Score</th>
            <th className="p-3.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
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
              <tr
                key={item.id}
                className={`hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors ${
                  isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                }`}
              >
                <td className="p-3.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(item.id)}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </td>

                <td className="p-3.5">
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {item.roleTitle}
                  </div>
                  <div className="text-[11px] text-neutral-500">{item.companyName}</div>
                </td>

                <td className="p-3.5">
                  <div className="text-neutral-700 dark:text-neutral-300 font-medium">
                    {item.completionDate}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    {item.durationMinutes} mins
                  </div>
                </td>

                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.rounds.map((r) => (
                      <span
                        key={r}
                        className="rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 text-[10px] font-semibold"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-3.5">
                  <Badge variant={scoreBadgeVariant} className="text-xs font-bold font-mono">
                    {item.score} / 100
                  </Badge>
                </td>

                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/reports?reportId=${item.id}`)}
                      className="h-7 text-xs font-semibold text-blue-600"
                    >
                      <Eye className="mr-1 h-3.5 w-3.5" /> View
                    </Button>

                    <button
                      type="button"
                      onClick={() => downloadReport.mutate(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      title="Download PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onConfirmDelete(item)}
                      className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
