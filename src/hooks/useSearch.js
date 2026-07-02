/**
 * useSearch hook — debounced search term state.
 *
 * Returns:
 *  - `searchTerm`   — the debounced value used for filtering
 *  - `inputValue`   — the raw input value (updates immediately for UX)
 *  - `setInputValue` — setter for the raw input
 *  - `clearSearch`  — resets both values
 */

import { useState, useEffect, useRef } from 'react';
import { DEBOUNCE_DELAY } from '../constants';

export default function useSearch() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    // Debounce: wait DEBOUNCE_DELAY ms after the user stops typing
    timerRef.current = setTimeout(() => {
      setSearchTerm(inputValue);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timerRef.current);
  }, [inputValue]);

  const clearSearch = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return { searchTerm, inputValue, setInputValue, clearSearch };
}
