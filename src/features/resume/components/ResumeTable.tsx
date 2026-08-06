import React from 'react';
import { Table, Column } from '../../../components/Table';
import { formatDate } from '../../../utils/dateFormatter';
import { ResumeActions } from './ResumeActions';
import { ResumeStatus } from './ResumeStatus';
import { Resume } from '../types/resume.types';

export interface ResumeTableProps {
  resumes: Resume[];
}

export const ResumeTable: React.FC<ResumeTableProps> = ({ resumes }) => {
  const columns: Column<Resume>[] = [
    {
      key: 'file_path',
      header: 'Resume File',
      render: (r) => (
        <div className="font-semibold text-slate-100 truncate max-w-xs">{r.file_path}</div>
      ),
    },
    {
      key: 'seniority_signal',
      header: 'Seniority & Skills',
      render: (r) => (
        <ResumeStatus senioritySignal={r.seniority_signal} skillCount={r.parsed_skills.length} />
      ),
    },
    {
      key: 'parsed_skills',
      header: 'Top Skills',
      render: (r) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {r.parsed_skills.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
              {skill}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'created_at',
      header: 'Upload Date',
      render: (r) => <span className="text-slate-400">{formatDate(r.created_at)}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => <ResumeActions resume={r} />,
    },
  ];

  return <Table columns={columns} data={resumes} keyExtractor={(r) => r.id} emptyMessage="No resumes found." />;
};
