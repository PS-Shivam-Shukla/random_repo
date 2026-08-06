import { Search, Filter, X, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';

interface HistoryControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function HistoryControls({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  typeFilter,
  onTypeFilterChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearFilters,
  activeFilterCount,
}: HistoryControlsProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by role, company name, or interview title..."
            className="w-full rounded-xl border border-neutral-200/90 bg-white pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white shadow-2xs transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 shadow-2xs">
            <ArrowUpDown className="h-3.5 w-3.5 text-neutral-400" />
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none text-neutral-900 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-800">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'rounded-lg p-1.5 text-xs transition-all',
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-2xs dark:bg-neutral-900 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
              )}
              title="Grid Card View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={cn(
                'rounded-lg p-1.5 text-xs transition-all',
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-2xs dark:bg-neutral-900 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
              )}
              title="Compact Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
        <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400 mr-1">
          <Filter className="h-3.5 w-3.5" /> Filters:
        </span>

        {/* Role Filter Selector */}
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="rounded-xl border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 focus:outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Staff">Staff Tier Roles</option>
          <option value="Senior">Senior Tier Roles</option>
          <option value="Lead">Lead Tier Roles</option>
        </select>

        {/* Type Filter Selector */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="rounded-xl border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 focus:outline-none"
        >
          <option value="All">All Interview Formats</option>
          <option value="Technical">Technical Deep Dive</option>
          <option value="System Design">System Architecture</option>
          <option value="HR">HR Culture</option>
        </select>

        {/* Active Filter Count & Clear Filter CTA */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 text-[11px] font-mono font-bold">
              {activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-7 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 p-0 font-semibold"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
