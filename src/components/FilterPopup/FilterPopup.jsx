/**
 * FilterPopup — a modal with text inputs for each filterable field.
 * Shows a badge on the trigger button when filters are active.
 */

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button, Input, Modal } from '../common';
import styles from './FilterPopup.module.css';

export default function FilterPopup({
  filters,
  activeFilterCount,
  onApply,
  onClear,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Local state allows editing without immediately affecting the table
  const [localFilters, setLocalFilters] = useState(filters);

  const handleOpen = () => {
    setLocalFilters(filters); // sync with current filters
    setIsOpen(true);
  };

  const handleApply = () => {
    onApply(localFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear();
    setIsOpen(false);
  };

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Trigger button */}
      <div className={styles.filterTrigger}>
        <Button
          variant="secondary"
          onClick={handleOpen}
          aria-label="Open filters"
          id="filter-button"
        >
          <Filter size={16} />
          Filters
        </Button>
        {activeFilterCount > 0 && (
          <span className={styles.badge}>{activeFilterCount}</span>
        )}
      </div>

      {/* Filter modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filter Users"
        footer={
          <>
            <Button variant="ghost" onClick={handleClear}>
              Clear All
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply Filters
            </Button>
          </>
        }
      >
        <div className={styles.filterForm}>
          <Input
            id="filter-firstName"
            label="First Name"
            placeholder="e.g. John"
            value={localFilters.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
          <Input
            id="filter-lastName"
            label="Last Name"
            placeholder="e.g. Doe"
            value={localFilters.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
          <Input
            id="filter-email"
            label="Email"
            placeholder="e.g. john@example.com"
            value={localFilters.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <Input
            id="filter-department"
            label="Department"
            placeholder="e.g. Engineering"
            value={localFilters.department}
            onChange={(e) => handleChange('department', e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}
