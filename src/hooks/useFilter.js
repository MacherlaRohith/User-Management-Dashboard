/**
 * useFilter hook — manages per-field filter state.
 *
 * Filters are applied case-insensitively on firstName, lastName,
 * email, and department.
 */

import { useState, useCallback, useMemo } from 'react';
import { includesCaseInsensitive } from '../utils/helpers';

const EMPTY_FILTERS = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export default function useFilter() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  /**
   * Update a single filter field.
   * @param {string} field
   * @param {string} value
   */
  const setFilter = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Apply all filters at once (e.g. from the popup form).
   * @param {Object} newFilters
   */
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  /** Reset all filters to empty strings */
  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  /** Count of active (non-empty) filters — used for badge display */
  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v.trim().length > 0).length,
    [filters]
  );

  /**
   * Filter a data array by the current filter state.
   * Only non-empty filter fields are applied (AND logic).
   */
  const filterData = useCallback(
    (data) => {
      return data.filter((item) => {
        for (const [field, query] of Object.entries(filters)) {
          if (query.trim() && !includesCaseInsensitive(item[field], query)) {
            return false;
          }
        }
        return true;
      });
    },
    [filters]
  );

  return {
    filters,
    setFilter,
    applyFilters,
    clearFilters,
    activeFilterCount,
    filterData,
  };
}
