import React, { useState, useMemo } from 'react';
import { EmptyState } from '../../../components/EmptyState';
import { Pagination } from '../../../components/Pagination';
import { ResumeCard } from './ResumeCard';
import { Resume } from '../types/resume.types';

export interface ResumeGridProps {
  resumes: Resume[];
  onUploadClick?: () => void;
  pageSize?: number;
}

export const ResumeGrid: React.FC<ResumeGridProps> = ({
  resumes,
  onUploadClick,
  pageSize = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(resumes.length / pageSize);

  const paginatedResumes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return resumes.slice(start, start + pageSize);
  }, [resumes, currentPage, pageSize]);

  if (resumes.length === 0) {
    return (
      <EmptyState
        title="No Resumes Found"
        description="No candidate resumes match your search query or filters."
        actionLabel="Upload Candidate Resume"
        onAction={onUploadClick}
        variant="resume"
      />
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {paginatedResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
