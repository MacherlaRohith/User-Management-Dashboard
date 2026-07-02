/**
 * useSort hook — manages sort column and direction.
 *
 * Toggle behaviour: clicking the same column flips asc ↔ desc,
 * clicking a different column resets to ascending.
 */

import { useState, useCallback, useMemo } from 'react';

export default function useSort(defaultColumn = 'id', defaultDirection = 'asc') {
  const [sortColumn, setSortColumn] = useState(defaultColumn);
  const [sortDirection, setSortDirection] = useState(defaultDirection);

  /**
   * Toggle sort when a column header is clicked.
   * @param {string} column — the column key
   */
  const handleSort = useCallback(
    (column) => {
      if (column === sortColumn) {
        // Same column → flip direction
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    },
    [sortColumn]
  );

  /**
   * Generic comparator for sorting an array by `sortColumn`.
   * Handles both strings and numbers.
   */
  const sortData = useCallback(
    (data) => {
      if (!sortColumn) return data;

      return [...data].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        // Null / undefined sorts to bottom regardless of direction
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let comparison;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal), undefined, {
            sensitivity: 'base',
          });
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    },
    [sortColumn, sortDirection]
  );

  return {
    sortColumn,
    sortDirection,
    handleSort,
    sortData,
  };
}
