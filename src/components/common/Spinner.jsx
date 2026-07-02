/**
 * Loading spinner with configurable size.
 */

import styles from './Spinner.module.css';

export default function Spinner({ size = 'medium' }) {
  return (
    <div className={styles.spinnerWrapper} role="status" aria-label="Loading">
      <div className={`${styles.spinner} ${styles[size]}`} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
