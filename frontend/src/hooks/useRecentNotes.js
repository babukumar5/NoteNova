import { useState, useEffect, useCallback } from 'react';
import { noteService } from '../services/noteService';

/**
 * Custom hook to track, update, and resolve recently visited notes locally
 * for user privacy.
 */
export const useRecentNotes = () => {
  const [recentSlugs, setRecentSlugs] = useState(() => {
    try {
      const stored = localStorage.getItem('recent_notes');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse recent notes from localStorage:', error);
      return [];
    }
  });

  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync slug array with localStorage
  useEffect(() => {
    localStorage.setItem('recent_notes', JSON.stringify(recentSlugs));
  }, [recentSlugs]);

  // Retrieve note details for all stored slugs
  const fetchRecentNotes = useCallback(async () => {
    if (recentSlugs.length === 0) {
      setRecentNotes([]);
      return;
    }
    setLoading(true);
    try {
      const res = await noteService.getRecentNotes(recentSlugs);
      if (res.success) {
        // Sort fetched notes to match the order of slugs in the local list
        const orderedNotes = [...res.data].sort((a, b) => {
          return recentSlugs.indexOf(a.slug) - recentSlugs.indexOf(b.slug);
        });
        setRecentNotes(orderedNotes);
      }
    } catch (err) {
      setError(err.message || 'Failed to load recent notes');
    } finally {
      setLoading(false);
    }
  }, [recentSlugs]);

  useEffect(() => {
    fetchRecentNotes();
  }, [fetchRecentNotes]);

  // Insert a note slug at the front of the list, preserving uniqueness and capping at 10 items
  const addRecentNote = useCallback((slug) => {
    if (!slug) return;
    const normalized = slug.toLowerCase().trim();
    setRecentSlugs((prev) => {
      const filtered = prev.filter((s) => s !== normalized);
      return [normalized, ...filtered].slice(0, 10);
    });
  }, []);

  // Remove a slug from the list (e.g. on deletion)
  const removeRecentNote = useCallback((slug) => {
    if (!slug) return;
    const normalized = slug.toLowerCase().trim();
    setRecentSlugs((prev) => prev.filter((s) => s !== normalized));
  }, []);

  return {
    recentNotes,
    loading,
    error,
    addRecentNote,
    removeRecentNote,
    refreshRecents: fetchRecentNotes,
  };
};
