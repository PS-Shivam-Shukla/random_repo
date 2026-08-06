import React from 'react';
import { LayoutGrid, List, Trash2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Select } from '../../../components/Select';
import { ResumeFilterOptions } from '../types/resume.types';

export interface ResumeFiltersProps {
  options: ResumeFilterOptions;
  onChange: (updated: Partial<ResumeFilterOptions>) => void;
  availableSkills?: string[];
  totalSelectedCount?: number;
  onBulkDelete?: () => void;
}

export const ResumeFilters: React.FC<ResumeFiltersProps> = ({
  options,
  onChange,
  availableSkills = [],
  totalSelectedCount = 0,
  onBulkDelete,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 shadow-md">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={options.seniority}
          onChange={(e) => onChange({ seniority: e.target.value })}
          options={[
            { value: 'ALL', label: 'All Seniority Levels' },
            { value: 'STAFF', label: 'Staff / Principal' },
            { value: 'SENIOR', label: 'Senior Level' },
            { value: 'MID', label: 'Mid Level' },
            { value: 'JUNIOR', label: 'Junior Level' },
          ]}
          className="w-44"
        />

        <Select
          value={options.skillFilter}
          onChange={(e) => onChange({ skillFilter: e.target.value })}
          options={[
            { value: 'ALL', label: 'All Parsed Skills' },
            ...availableSkills.map((skill) => ({ value: skill, label: skill })),
          ]}
          className="w-48"
        />

        <Select
          value={options.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as any })}
          options={[
            { value: 'date_desc', label: 'Newest Upload' },
            { value: 'date_asc', label: 'Oldest Upload' },
            { value: 'name_asc', label: 'File Name (A-Z)' },
            { value: 'seniority', label: 'Seniority Signal' },
          ]}
          className="w-44"
        />

        {totalSelectedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Selected ({totalSelectedCount})
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => onChange({ viewMode: 'grid' })}
          className={`p-2 rounded-lg transition-colors ${
            options.viewMode === 'grid'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Grid View"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChange({ viewMode: 'table' })}
          className={`p-2 rounded-lg transition-colors ${
            options.viewMode === 'table'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Table View"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
