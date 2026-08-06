import React, { useState } from 'react';
import { ArrowUpDown, Download, CheckSquare, Square } from 'lucide-react';
import { Button } from './Button';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  exportFileName?: string;
  enableSelection?: boolean;
  keyExtractor?: (item: T) => string;
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  exportFileName = 'table_export.csv',
  enableSelection = false,
  emptyMessage = 'No records found.',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIndices, setSelectedIndices] = useState<Record<number, boolean>>({});

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const handleExportCsv = () => {
    if (!data.length) return;
    const headers = columns.map((c) => c.header).join(',');
    const rows = sortedData.map((row) =>
      columns.map((c) => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName;
    link.click();
  };

  const toggleSelectAll = () => {
    if (Object.keys(selectedIndices).length === data.length) {
      setSelectedIndices({});
    } else {
      const newSel: Record<number, boolean> = {};
      data.forEach((_, idx) => (newSel[idx] = true));
      setSelectedIndices(newSel);
    }
  };

  const toggleSelectRow = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl max-h-[500px]">
        <table className="w-full text-left text-xs text-slate-200">
          <thead className="sticky top-0 z-10 bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800 shadow-sm">
            <tr>
              {enableSelection && (
                <th className="p-3 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-slate-200">
                    {Object.keys(selectedIndices).length === data.length && data.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`p-3 font-semibold select-none ${col.sortable ? 'cursor-pointer hover:text-slate-200' : ''}`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{col.header}</span>
                    {col.sortable && <ArrowUpDown className="w-3 h-3 text-slate-500" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedData.map((row, idx) => {
              const isSelected = !!selectedIndices[idx];
              return (
                <tr
                  key={idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${
                    isSelected ? 'bg-indigo-950/40 border-l-2 border-l-indigo-500' : 'hover:bg-slate-800/50'
                  }`}
                >
                  {enableSelection && (
                    <td className="p-3 text-center">
                      <button onClick={(e) => toggleSelectRow(idx, e)} className="text-slate-400 hover:text-slate-200">
                        {isSelected ? <CheckSquare className="w-4 h-4 text-indigo-400" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="p-3">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
