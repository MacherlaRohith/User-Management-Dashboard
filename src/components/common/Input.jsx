/**
 * Reusable controlled Input component with label and error display.
 * Wraps a native <input> and adds consistent styling plus validation feedback.
 */

import { AlertCircle } from 'lucide-react';
import styles from './Input.module.css';

export default function Input({
  label,
  id,
  error,
  required = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        id={id}
        className={`${styles.input} ${error ? styles.hasError : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />

      {error && (
        <span id={`${id}-error`} className={styles.errorMessage} role="alert">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}
