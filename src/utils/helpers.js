/**
 * General-purpose helper utilities.
 * Pure functions with no side-effects — easy to test and reuse.
 */

/**
 * Creates a debounced version of `fn` that delays invocation until
 * `delay` ms have elapsed since the last call.
 * @param {Function} fn - Function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} Debounced function with a `.cancel()` method.
 */
export function debounce(fn, delay) {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
}

/**
 * Generates a temporary client-side ID for new users.
 * JSONPlaceholder always returns id = 11 for POST requests,
 * so we use a timestamp-based ID to keep local state unique.
 * @returns {number} A unique numeric ID.
 */
export function generateId() {
  return Date.now();
}

/**
 * Transforms the JSONPlaceholder user object into our internal shape.
 * Splits `name` on the first space into firstName / lastName and
 * extracts `company.name` as the department.
 * @param {Object} apiUser - Raw user object from the API.
 * @returns {Object} Normalised user with firstName, lastName, email, department.
 */
export function normalizeUser(apiUser) {
  const nameParts = (apiUser.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email || '',
    department: apiUser.company?.name || '',
  };
}

/**
 * Converts our internal user shape back to the format expected by
 * JSONPlaceholder's POST / PUT endpoints.
 * @param {Object} formData - { firstName, lastName, email, department }
 * @returns {Object} API-compatible payload.
 */
export function formatUserForApi(formData) {
  return {
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    company: { name: formData.department },
  };
}

/**
 * Case-insensitive check — does `text` contain `query`?
 * @param {string} text
 * @param {string} query
 * @returns {boolean}
 */
export function includesCaseInsensitive(text, query) {
  if (!text || !query) return false;
  return text.toLowerCase().includes(query.toLowerCase());
}
