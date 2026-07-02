/**
 * UserTable — responsive data table with sortable columns and row actions.
 */

import { ArrowDown, ArrowUp, Edit2, Trash2 } from 'lucide-react';
import { Button, Spinner } from '../common';
import styles from './UserTable.module.css';

// Column definitions mapping field keys to display labels
const COLUMNS = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
];

export default function UserTable({
  users,
  loading,
  sortColumn,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.emptyState}>
          <Spinner />
          <p style={{ marginTop: '1rem' }}>Loading users…</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.emptyState}>
          <p>No users found matching the current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`${styles.th} ${col.sortable ? styles.sortable : ''}`}
                onClick={() => col.sortable && onSort(col.key)}
                aria-sort={
                  sortColumn === col.key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                <div className={styles.thContent}>
                  {col.label}
                  {col.sortable && (
                    <span
                      className={`${styles.sortIcon} ${
                        sortColumn !== col.key ? styles.invisible : ''
                      }`}
                    >
                      {sortDirection === 'asc' ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tr}>
              <td className={styles.td}>{user.id}</td>
              <td className={styles.td}>{user.firstName}</td>
              <td className={styles.td}>{user.lastName}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.department}</td>
              <td className={styles.td}>
                <div className={styles.tdActions}>
                  <Button
                    variant="ghost"
                    size="small"
                    iconOnly
                    onClick={() => onEdit(user)}
                    aria-label={`Edit ${user.firstName} ${user.lastName}`}
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    iconOnly
                    onClick={() => onDelete(user)}
                    aria-label={`Delete ${user.firstName} ${user.lastName}`}
                    style={{ color: 'var(--color-error)' }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
