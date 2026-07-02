/**
 * Validation utility functions for the user form.
 * Each validator returns an error string or null when valid.
 * `validateUserForm` aggregates all field checks into a single result.
 */

import { FIELD_CONSTRAINTS } from '../constants';

/**
 * Checks that a value is non-empty after trimming whitespace.
 * @param {string} value - The input value.
 * @param {string} fieldLabel - Human-readable field name for the error message.
 * @returns {string|null} Error message or null if valid.
 */
export function validateRequired(value, fieldLabel) {
  if (!value || value.trim().length === 0) {
    return `${fieldLabel} is required`;
  }
  return null;
}

/**
 * Checks that a trimmed value meets a minimum length.
 * @param {string} value
 * @param {number} min - Minimum allowed length.
 * @param {string} fieldLabel
 * @returns {string|null}
 */
export function validateMinLength(value, min, fieldLabel) {
  if (value && value.trim().length < min) {
    return `${fieldLabel} must be at least ${min} characters`;
  }
  return null;
}

/**
 * Checks that a trimmed value does not exceed a maximum length.
 * @param {string} value
 * @param {number} max - Maximum allowed length.
 * @param {string} fieldLabel
 * @returns {string|null}
 */
export function validateMaxLength(value, max, fieldLabel) {
  if (value && value.trim().length > max) {
    return `${fieldLabel} must be no more than ${max} characters`;
  }
  return null;
}

/**
 * Validates an email address against a standard regex pattern.
 * @param {string} email
 * @returns {string|null}
 */
export function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  // RFC 5322 simplified — covers the vast majority of real-world addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

/**
 * Runs all validators for a user form and returns a combined result.
 * @param {Object} formData - { firstName, lastName, email, department }
 * @returns {{ isValid: boolean, errors: Object }} errors is keyed by field name.
 */
export function validateUserForm(formData) {
  const errors = {};

  // Iterate over constrained fields and run shared checks
  for (const [field, constraints] of Object.entries(FIELD_CONSTRAINTS)) {
    const value = formData[field] || '';
    const { min, max, label } = constraints;

    // Required check
    const requiredError = validateRequired(value, label);
    if (requiredError) {
      errors[field] = requiredError;
      continue; // skip length checks when empty
    }

    // Min length
    const minError = validateMinLength(value, min, label);
    if (minError) {
      errors[field] = minError;
      continue;
    }

    // Max length
    const maxError = validateMaxLength(value, max, label);
    if (maxError) {
      errors[field] = maxError;
    }
  }

  // Email has an additional format check beyond required/length
  if (!errors.email) {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      errors.email = emailError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
