import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search interviews, candidates, topics...',
  onSearch,
  className,
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Input
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      leftIcon={<Search className="w-4 h-4 text-slate-400" />}
      rightIcon={
        query ? (
          <button onClick={handleClear} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        ) : undefined
      }
      className={className}
    />
  );
};
