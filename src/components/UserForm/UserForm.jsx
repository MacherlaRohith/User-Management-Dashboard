/**
 * UserForm — Add / Edit user form rendered inside a Modal.
 *
 * Props:
 *  - isOpen      — controls modal visibility
 *  - onClose     — close callback
 *  - onSubmit    — async callback receiving validated form data
 *  - initialData — pre-fill values when editing (null for add)
 */

import { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../common';
import { validateUserForm } from '../../utils/validators';
import styles from './UserForm.module.css';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export default function UserForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!initialData;

  // Populate form when editing or reset when adding
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? { ...initialData } : EMPTY_FORM);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as the user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const { isValid, errors: validationErrors } = validateUserForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch {
      // Error handling is done in the parent (with a toast),
      // but we stop the spinner here regardless.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit User' : 'Add New User'}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving…'
              : isEditing
                ? 'Save Changes'
                : 'Add User'}
          </Button>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formRow}>
          <Input
            id="form-firstName"
            label="First Name"
            required
            placeholder="e.g. John"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
          />
          <Input
            id="form-lastName"
            label="Last Name"
            required
            placeholder="e.g. Doe"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
          />
        </div>

        <Input
          id="form-email"
          label="Email"
          type="email"
          required
          placeholder="e.g. john.doe@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        <Input
          id="form-department"
          label="Department"
          required
          placeholder="e.g. Engineering"
          value={formData.department}
          onChange={handleChange('department')}
          error={errors.department}
        />
      </form>
    </Modal>
  );
}
