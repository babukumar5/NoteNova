import { apiClient } from './apiClient';

/**
 * Service object wrapping all note backend requests.
 */
export const noteService = {
  /**
   * Fetches a note by its slug (creates if it doesn't exist)
   */
  getNote: (slug) => apiClient(`/notes/${slug}`, { method: 'GET' }),

  /**
   * Updates an existing note's metadata or content
   */
  updateNote: (slug, data) => apiClient(`/notes/${slug}`, { method: 'PUT', body: data }),

  /**
   * Deletes a note by its slug
   */
  deleteNote: (slug) => apiClient(`/notes/${slug}`, { method: 'DELETE' }),

  /**
   * Searches notes by matching titles, slug, or content query
   */
  searchNotes: (query) => apiClient(`/notes/search?q=${encodeURIComponent(query)}`, { method: 'GET' }),

  /**
   * Fetches metadata for a list of slugs stored locally
   */
  getRecentNotes: (slugs) => apiClient('/notes/recent', { method: 'POST', body: { slugs } }),
};
