
import { useState } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({ initialPage = 1, initialPageSize = 10 }: PaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const updateTotalItems = (total: number) => {
    setTotalItems(total);
    setTotalPages(Math.max(1, Math.ceil(total / pageSize)));
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
    
    // Recalculate total pages
    if (totalItems > 0) {
      setTotalPages(Math.max(1, Math.ceil(totalItems / size)));
    }
  };

  return {
    page,
    setPage,
    pageSize,
    totalItems,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    updateTotalItems,
    changePageSize,
  };
}
