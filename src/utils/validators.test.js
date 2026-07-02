import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateEmail,
  validateUserForm,
} from './validators';

describe('Validators', () => {
  describe('validateRequired', () => {
    it('returns an error if value is empty or only whitespace', () => {
      expect(validateRequired('', 'Name')).toBe('Name is required');
      expect(validateRequired('   ', 'Name')).toBe('Name is required');
      expect(validateRequired(null, 'Name')).toBe('Name is required');
    });

    it('returns null if value is present', () => {
      expect(validateRequired('John', 'Name')).toBeNull();
    });
  });

  describe('validateMinLength', () => {
    it('returns an error if value is too short', () => {
      expect(validateMinLength('A', 2, 'Name')).toBe('Name must be at least 2 characters');
    });

    it('returns null if value meets minimum length', () => {
      expect(validateMinLength('John', 2, 'Name')).toBeNull();
    });
  });

  describe('validateMaxLength', () => {
    it('returns an error if value is too long', () => {
      expect(validateMaxLength('TooLongName', 5, 'Name')).toBe('Name must be no more than 5 characters');
    });

    it('returns null if value is under maximum length', () => {
      expect(validateMaxLength('John', 10, 'Name')).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('returns an error for invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
      expect(validateEmail('user@')).toBe('Please enter a valid email address');
      expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
    });

    it('returns null for valid emails', () => {
      expect(validateEmail('user@example.com')).toBeNull();
      expect(validateEmail('firstname.lastname@domain.co.uk')).toBeNull();
    });
  });

  describe('validateUserForm', () => {
    it('returns errors for empty form', () => {
      const result = validateUserForm({});
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBeDefined();
      expect(result.errors.lastName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.department).toBeDefined();
    });

    it('returns isValid true for valid form data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
      };
      const result = validateUserForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });
  });
});
