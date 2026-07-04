const Note = require('../models/Note');
const { sanitizeContent } = require('../utils/sanitize');

/**
 * GET /notes/:slug
 * Retrieves an existing note or creates a new one if it doesn't exist.
 */
const getOrCreateNote = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Try to find the note
    let note = await Note.findOne({ slug });

    if (note) {
      // Increment views on read operations
      note.views += 1;
      await note.save();
      return res.status(200).json({ success: true, data: note });
    }

    // Create a new note automatically if not found
    // Extract title from slug (e.g. "my-first-note" -> "My First Note")
    const generatedTitle = slug
      .split(/[-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    note = await Note.create({
      slug,
      title: generatedTitle || 'Untitled Note',
      content: '',
      views: 0
    });

    return res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /notes/:slug
 * Updates a note's title, rich text content, and favorite status.
 */
const updateNote = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { title, content, favorite } = req.body;

    const note = await Note.findOne({ slug });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found.' });
    }

    // Update title
    if (title !== undefined) {
      note.title = title.trim() || 'Untitled Note';
    }

    // Update content (sanitize HTML)
    if (content !== undefined) {
      note.content = sanitizeContent(content);
    }

    // Update favorite flag
    if (favorite !== undefined) {
      note.favorite = favorite;
    }

    // Track editing timestamp
    note.lastEdited = new Date();

    const updatedNote = await note.save();
    return res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /notes/:slug
 * Deletes a note by its slug.
 */
const deleteNote = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const note = await Note.findOneAndDelete({ slug });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found.' });
    }

    return res.status(200).json({ success: true, message: 'Note successfully deleted.' });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /notes/search?q=query
 * Performs a regex search for notes matching title, content, or slug.
 */
const searchNotes = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(200).json({ success: true, data: [] });
    }

    const searchQuery = q.trim();
    // Case-insensitive regex match
    const notes = await Note.find({
      $or: [
        { slug: { $regex: searchQuery, $options: 'i' } },
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .select('slug title lastEdited favorite') // Return minimal metadata
      .limit(15);

    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /notes/recent
 * Batch resolves notes metadata for a list of slugs stored in client localStorage.
 */
const getRecentNotes = async (req, res, next) => {
  try {
    const { slugs } = req.body;

    if (!slugs || !Array.isArray(slugs)) {
      return res.status(400).json({ success: false, message: 'Slugs array is required.' });
    }

    if (slugs.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Fetch matching notes and sort them by the order in the input array or by updatedAt
    const notes = await Note.find({ slug: { $in: slugs } })
      .select('slug title lastEdited favorite')
      .sort({ lastEdited: -1 });

    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrCreateNote,
  updateNote,
  deleteNote,
  searchNotes,
  getRecentNotes
};
