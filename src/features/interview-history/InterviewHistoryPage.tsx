import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { SkeletonBlock } from '../../components/shared/SkeletonBlock';
import { ErrorState } from '../../components/shared/ErrorState';
import { EmptyState } from '../../components/shared/EmptyState';

import { HistoryControls } from './components/HistoryControls';
import { HistoryGridView } from './components/HistoryGridView';
import { HistoryTableView } from './components/HistoryTableView';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { CompareModal } from './components/CompareModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

import {
  useInterviewHistory,
  useDeleteInterview,
  type HistoryItem,
} from '../../hooks/useInterviewHistory';

import { History, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function InterviewHistoryPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [page, setPage] = useState(1);
  const limit = 6;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<HistoryItem | null>(null);

  const { data, isLoading, isError, refetch } = useInterviewHistory({
    search,
    roleFilter,
    typeFilter,
    sort,
    page,
    limit,
  });

  const deleteInterview = useDeleteInterview();

  const activeFilterCount =
    (search ? 1 : 0) + (roleFilter !== 'All' ? 1 : 0) + (typeFilter !== 'All' ? 1 : 0);

  const handleClearFilters = () => {
    setSearch('');
    setRoleFilter('All');
    setTypeFilter('All');
    setSort('newest');
    setPage(1);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    deleteInterview.mutate(itemToDelete.id, {
      onSuccess: () => {
        setItemToDelete(null);
        setSelectedIds((prev) => prev.filter((id) => id !== itemToDelete.id));
      },
    });
  };

  const selectedItemsForCompare = (data?.items || []).filter((item) =>
    selectedIds.includes(item.id),
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <PageHeader
        title="Interview History & Archives"
        description="Filterable repository of all completed AI interview simulations, diagnostic reports, and performance comparisons."
      />

      {/* Controls Bar */}
      <HistoryControls
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        roleFilter={roleFilter}
        onRoleFilterChange={(v) => {
          setRoleFilter(v);
          setPage(1);
        }}
        typeFilter={typeFilter}
        onTypeFilterChange={(v) => {
          setTypeFilter(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(v) => setSort(v)}
        viewMode={viewMode}
        onViewModeChange={(m) => setViewMode(m)}
        onClearFilters={handleClearFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* List / Table Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonBlock count={1} className="h-48 rounded-2xl" />
          <SkeletonBlock count={1} className="h-48 rounded-2xl" />
          <SkeletonBlock count={1} className="h-48 rounded-2xl" />
        </div>
      ) : isError ? (
        <ErrorState message="Failed to load interview history." onRetry={refetch} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          icon={History}
          title="No Interviews Match Your Filters"
          description="Try clearing your search query or expanding the filter options to view past sessions."
          action={{
            label: 'Clear Filters',
            onClick: handleClearFilters,
          }}
          className="min-h-[350px]"
        />
      ) : (
        <div className="space-y-6">
          {viewMode === 'grid' ? (
            <HistoryGridView
              items={data.items}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onConfirmDelete={(item) => setItemToDelete(item)}
            />
          ) : (
            <HistoryTableView
              items={data.items}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onConfirmDelete={(item) => setItemToDelete(item)}
            />
          )}

          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-xs">
              <span className="text-neutral-500 font-medium">
                Showing <strong className="text-neutral-900 dark:text-white">{(page - 1) * limit + 1}</strong> to{' '}
                <strong className="text-neutral-900 dark:text-white">
                  {Math.min(page * limit, data.total)}
                </strong>{' '}
                of {data.total} interviews
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-xl text-xs"
                >
                  <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Previous
                </Button>

                <span className="px-2 font-mono font-bold text-neutral-900 dark:text-white">
                  {page} / {data.totalPages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page >= data.totalPages}
                  className="rounded-xl text-xs"
                >
                  Next <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Compare Action Bar */}
      <CompareFloatingBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        onOpenCompareModal={() => setShowCompareModal(true)}
      />

      {/* Side-by-Side Compare Modal */}
      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        selectedItems={selectedItemsForCompare}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
        isDeleting={deleteInterview.isPending}
      />
    </div>
  );
}
