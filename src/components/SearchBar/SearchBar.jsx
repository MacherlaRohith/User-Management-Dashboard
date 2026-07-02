/**
 * SearchBar component — debounced text input with search icon and clear button.
 */

import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search users…' }) {
  return (
    <div className={styles.searchWrapper}>
      <input
        id="search-input"
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search users"
      />
      <Search size={16} className={styles.searchIcon} />
      {value && (
        <button
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
