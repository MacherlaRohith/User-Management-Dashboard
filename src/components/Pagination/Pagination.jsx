/**
 * Pagination component — page numbers, prev/next arrows, page-size selector,
 * and "Showing X–Y of Z" info.
 *
 * Uses an ellipsis strategy to keep the button count manageable:
 * always show first, last, and a window around the current page.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_SIZE_OPTIONS } from '../../constants';
import styles from './Pagination.module.css';

/**
 * Build an array of page numbers (and '…' placeholders) to render.
 * Ensures first page, last page, and a window of ±1 around current
 * are always visible.
 */
function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    // Few pages — show them all
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages]);
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('…');
    }
    result.push(sorted[i]);
  }

  return result;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  startIndex,
  onPageChange,
  onPageSizeChange,
  hasNextPage,
  hasPrevPage,
}) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const showingStart = Math.min(startIndex + 1, totalItems);
  const showingEnd = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className={styles.paginationWrapper}>
      {/* Info text */}
      <span className={styles.info}>
        Showing <strong>{showingStart}–{showingEnd}</strong> of{' '}
        <strong>{totalItems}</strong> users
      </span>

      {/* Page navigation */}
      <div className={styles.controls}>
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((page, idx) =>
          page === '…' ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page size selector */}
      <div className={styles.pageSizeWrapper}>
        <label htmlFor="page-size-select" className={styles.pageSizeLabel}>
          Rows per page:
        </label>
        <select
          id="page-size-select"
          className={styles.pageSizeSelect}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
