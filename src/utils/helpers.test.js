import { describe, it, expect } from 'vitest';
import {
  generateId,
  normalizeUser,
  formatUserForApi,
  includesCaseInsensitive,
} from './helpers';

describe('Helpers', () => {
  describe('generateId', () => {
    it('returns a numeric ID', () => {
      const id = generateId();
      expect(typeof id).toBe('number');
      expect(id).toBeGreaterThan(0);
    });
  });

  describe('normalizeUser', () => {
    it('splits name into firstName and lastName and extracts department', () => {
      const apiUser = {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        company: { name: 'Romaguera-Crona' },
      };

      const normalized = normalizeUser(apiUser);
      expect(normalized).toEqual({
        id: 1,
        firstName: 'Leanne',
        lastName: 'Graham',
        email: 'Sincere@april.biz',
        department: 'Romaguera-Crona',
      });
    });

    it('handles missing fields gracefully', () => {
      const normalized = normalizeUser({ id: 2 });
      expect(normalized).toEqual({
        id: 2,
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      });
    });
  });

  describe('formatUserForApi', () => {
    it('combines firstName and lastName and formats department correctly', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering',
      };

      const apiPayload = formatUserForApi(formData);
      expect(apiPayload).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        company: { name: 'Engineering' },
      });
    });
  });

  describe('includesCaseInsensitive', () => {
    it('returns true if text contains query case-insensitively', () => {
      expect(includesCaseInsensitive('Hello World', 'world')).toBe(true);
      expect(includesCaseInsensitive('TESTING', 'test')).toBe(true);
    });

    it('returns false if text does not contain query', () => {
      expect(includesCaseInsensitive('Hello', 'world')).toBe(false);
    });

    it('handles empty inputs', () => {
      expect(includesCaseInsensitive('', 'test')).toBe(false);
      expect(includesCaseInsensitive('test', '')).toBe(false);
      expect(includesCaseInsensitive(null, 'test')).toBe(false);
    });
  });
});
