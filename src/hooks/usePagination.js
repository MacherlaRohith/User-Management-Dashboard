/**
 * usePagination hook — generic client-side pagination logic.
 *
 * Accepts a total item count and returns the current page slice
 * boundaries, page controls, and a page-size setter.
 */

import { useState, useMemo, useCallback } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

export default function usePagination(totalItems) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(DEFAULT_PAGE_SIZE);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );

  // Clamp currentPage when totalPages shrinks (e.g. after a filter)
  const safePage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages]
  );

  // Start and end indices for slicing the data array
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const setPage = useCallback(
    (page) => {
      const clamped = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(clamped);
    },
    [totalPages]
  );

  const setPageSize = useCallback((size) => {
    setPageSizeState(size);
    setCurrentPage(1); // reset to first page on size change
  }, []);

  const goToNextPage = useCallback(() => {
    setPage(safePage + 1);
  }, [safePage, setPage]);

  const goToPrevPage = useCallback(() => {
    setPage(safePage - 1);
  }, [safePage, setPage]);

  return {
    currentPage: safePage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    setPageSize,
    goToNextPage,
    goToPrevPage,
    /** Is there a next page? */
    hasNextPage: safePage < totalPages,
    /** Is there a previous page? */
    hasPrevPage: safePage > 1,
  };
}
