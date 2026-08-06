import React from 'react';
import { SearchBar } from '../../../components/SearchBar';

export interface ResumeSearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const ResumeSearch: React.FC<ResumeSearchProps> = ({ onSearch, className }) => {
  return (
    <SearchBar
      placeholder="Search by resume filename, skills, or seniority signal..."
      onSearch={onSearch}
      className={className}
    />
  );
};
