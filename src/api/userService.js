/**
 * User service — thin wrapper around axiosInstance for CRUD operations
 * on the JSONPlaceholder /users endpoint.
 *
 * Each function returns the Axios response so callers can access
 * both `data` and `status` when needed.
 */

import api from './axiosInstance';

/**
 * Fetch all users.
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getUsers() {
  return api.get('/users');
}

/**
 * Fetch a single user by ID.
 * @param {number} id
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getUserById(id) {
  return api.get(`/users/${id}`);
}

/**
 * Create a new user.
 * JSONPlaceholder simulates success but doesn't persist.
 * @param {Object} userData - { name, email, company: { name } }
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function createUser(userData) {
  return api.post('/users', userData);
}

/**
 * Update an existing user by ID.
 * JSONPlaceholder simulates success for IDs 1-10. For newly added users (ID > 10),
 * we mock the success response to prevent 500 errors.
 * @param {number} id
 * @param {Object} userData
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function updateUser(id, userData) {
  if (id > 10) {
    return Promise.resolve({ data: { id, ...userData }, status: 200 });
  }
  return api.put(`/users/${id}`, userData);
}

/**
 * Delete a user by ID.
 * JSONPlaceholder simulates success for IDs 1-10. For newly added users (ID > 10),
 * we mock the success response to prevent 500 errors.
 * @param {number} id
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function deleteUser(id) {
  if (id > 10) {
    return Promise.resolve({ status: 200 });
  }
  return api.delete(`/users/${id}`);
}
