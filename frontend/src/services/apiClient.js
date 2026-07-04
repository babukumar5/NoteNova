const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

/**
 * A wrapper around fetch to interact with the backend API.
 */
export const apiClient = async (endpoint, options = {}) => {
  const { body, method, ...customOptions } = options;
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: method || (body ? 'POST' : 'GET'),
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message || 'Something went wrong.');
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
};
