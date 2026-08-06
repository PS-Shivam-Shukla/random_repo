import { useState } from 'react';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { Column, Table } from './Table';

export interface DataGridProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  keyExtractor?: (item: T) => string;
  searchFilter?: (item: T, query: string) => boolean;
  pageSize?: number;
  emptyMessage?: string;
}

export function DataGrid<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  searchFilter,
  pageSize = 10,
  emptyMessage = 'No records available.',
}: DataGridProps<T>) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = searchFilter && query ? data.filter((item) => searchFilter(item, query)) : data;
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col space-y-4 w-full">
      {searchFilter && (
        <div className="max-w-xs">
          <SearchBar onSearch={(q) => { setQuery(q); setCurrentPage(1); }} />
        </div>
      )}
      <Table columns={columns} data={paginatedData} keyExtractor={keyExtractor} emptyMessage={emptyMessage} />
      <Pagination currentPage={currentPage} totalPages={totalPages || 1} onPageChange={setCurrentPage} />
    </div>
  );
}
