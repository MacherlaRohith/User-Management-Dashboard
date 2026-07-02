/**
 * Application-wide constants.
 * Centralizes magic numbers and configuration values so they can be
 * changed in one place without hunting through component code.
 */

// Base URL for JSONPlaceholder REST API
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Pagination page-size options shown in the dropdown
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Default number of rows per page
export const DEFAULT_PAGE_SIZE = 10;

// Debounce delay (ms) for search input to avoid excessive re-renders
export const DEBOUNCE_DELAY = 300;

// Toast auto-dismiss timeout (ms)
export const TOAST_DURATION = 4000;

// Sortable column keys — keeps sort logic in sync with table headers
export const SORTABLE_COLUMNS = ['id', 'firstName', 'lastName', 'email', 'department'];

// Form field constraints used by both the UI and validators
export const FIELD_CONSTRAINTS = {
  firstName: { min: 2, max: 50, label: 'First Name' },
  lastName:  { min: 2, max: 50, label: 'Last Name' },
  email:     { min: 5, max: 100, label: 'Email' },
  department:{ min: 2, max: 100, label: 'Department' },
};
