/**
 * Toast context + provider.
 * Any component can call `addToast({ type, title, message })` to
 * show a notification that auto-dismisses after TOAST_DURATION ms.
 */

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { TOAST_DURATION } from '../../constants';
import styles from './Toast.module.css';

const ToastContext = createContext(null);

/** Hook for consuming toast functionality */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

/* Icon lookup by toast type */
const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

/**
 * Individual Toast item — handles its own exit animation.
 */
function ToastItem({ toast, onRemove }) {
  const Icon = ICONS[toast.type] || Info;

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <span className={styles.icon}>
        <Icon size={20} />
      </span>

      <div className={styles.content}>
        {toast.title && <div className={styles.title}>{toast.title}</div>}
        {toast.message && <div className={styles.message}>{toast.message}</div>}
      </div>

      <button
        className={styles.close}
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>

      {/* Auto-dismiss progress bar */}
      <div
        className={styles.progressBar}
        style={{ animationDuration: `${TOAST_DURATION}ms` }}
      />
    </div>
  );
}

/**
 * Provider that wraps the app and renders the toast container.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', title, message }) => {
      const id = ++idCounter.current;

      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto-remove after TOAST_DURATION
      setTimeout(() => removeToast(id), TOAST_DURATION);

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container — rendered at the top-right of the viewport */}
      <div className={styles.toastContainer} aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
