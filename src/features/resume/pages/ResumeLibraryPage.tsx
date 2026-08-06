import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { ErrorCard } from '../../../components/ErrorCard';
import { Skeleton } from '../../../components/Skeleton';
import { Topbar } from '../../../layouts/Topbar';
import { DeleteDialog } from '../components/DeleteDialog';
import { ResumeFilters } from '../components/ResumeFilters';
import { ResumeGrid } from '../components/ResumeGrid';
import { ResumeSearch } from '../components/ResumeSearch';
import { ResumeTable } from '../components/ResumeTable';
import { useDeleteResume } from '../hooks/useDeleteResume';
import { useResumeList } from '../hooks/useResumeList';
import { useNotification } from '../../../hooks/useNotification';
import { ResumeFilterOptions } from '../types/resume.types';
import { filterAndSortResumes } from '../utils/resumeHelpers';

export const ResumeLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const { data: resumes, isLoading, isError, error, refetch } = useResumeList();
  const deleteMutation = useDeleteResume();

  const [filterOptions, setFilterOptions] = useState<ResumeFilterOptions>({
    searchQuery: '',
    seniority: 'ALL',
    skillFilter: 'ALL',
    sortBy: 'date_desc',
    viewMode: 'grid',
    selectedIds: [],
  });

  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  const availableSkills = useMemo(() => {
    if (!resumes) return [];
    const set = new Set<string>();
    resumes.forEach((r) => r.parsed_skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [resumes]);

  const filteredResumes = useMemo(() => {
    if (!resumes) return [];
    return filterAndSortResumes(resumes, filterOptions);
  }, [resumes, filterOptions]);

  const handleFilterChange = (updated: Partial<ResumeFilterOptions>) => {
    setFilterOptions((prev) => ({ ...prev, ...updated }));
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(filterOptions.selectedIds.map((id) => deleteMutation.mutateAsync(id)));
      notify.success('Bulk Delete Complete', `Removed ${filterOptions.selectedIds.length} resumes.`);
      setFilterOptions((prev) => ({ ...prev, selectedIds: [] }));
      setIsBulkDeleteOpen(false);
    } catch (err: any) {
      notify.error('Bulk Delete Failed', err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="Resume Library"
        description="Manage, search, filter, and review parsed candidate resumes."
        actions={
          <Button onClick={() => navigate('/resumes/upload')} leftIcon={<Plus className="w-4 h-4" />}>
            Upload Resume
          </Button>
        }
      />

      <div className="flex flex-col space-y-4">
        <ResumeSearch onSearch={(q) => handleFilterChange({ searchQuery: q })} />
        <ResumeFilters
          options={filterOptions}
          onChange={handleFilterChange}
          availableSkills={availableSkills}
          totalSelectedCount={filterOptions.selectedIds.length}
          onBulkDelete={() => setIsBulkDeleteOpen(true)}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      )}

      {isError && (
        <ErrorCard
          title="Failed to Load Resumes"
          message={error?.message || 'Could not fetch resume records from backend API.'}
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && (
        <>
          {filterOptions.viewMode === 'grid' ? (
            <ResumeGrid
              resumes={filteredResumes}
              onUploadClick={() => navigate('/resumes/upload')}
            />
          ) : (
            <ResumeTable resumes={filteredResumes} />
          )}
        </>
      )}

      <DeleteDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        fileName={`${filterOptions.selectedIds.length} Selected Resumes`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
