/**
 * useUsers hook — manages the user list, loading state, and CRUD mutations.
 *
 * Since JSONPlaceholder doesn't actually persist changes, we maintain
 * an optimistic local state: API calls still fire (to demonstrate real
 * HTTP interaction), but the UI state is updated immediately.
 */

import { useState, useEffect, useCallback } from 'react';
import * as userService from '../api/userService';
import { normalizeUser, formatUserForApi } from '../utils/helpers';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Fetch all users on mount ----
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers();
      const normalizedUsers = response.data.map(normalizeUser);
      setUsers(normalizedUsers);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ---- Add a new user ----
  const addUser = useCallback(async (formData) => {
    const apiPayload = formatUserForApi(formData);
    // Fire the real API call for demonstration
    const response = await userService.createUser(apiPayload);

    setUsers((prev) => {
      // Calculate the next sequential ID safely using latest state
      const nextId = prev.length > 0 ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      
      const newUser = {
        id: nextId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        department: formData.department.trim(),
      };

      return [newUser, ...prev];
    });
  }, []);

  // ---- Update an existing user ----
  const updateUser = useCallback(async (id, formData) => {
    const apiPayload = formatUserForApi(formData);
    await userService.updateUser(id, apiPayload);

    // Optimistically update local state
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              firstName: formData.firstName.trim(),
              lastName: formData.lastName.trim(),
              email: formData.email.trim(),
              department: formData.department.trim(),
            }
          : user
      )
    );
  }, []);

  // ---- Delete a user ----
  const deleteUser = useCallback(async (id) => {
    await userService.deleteUser(id);

    // Optimistically remove from local state
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  };
}
