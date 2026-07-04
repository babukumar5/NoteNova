const express = require('express');
const router = express.Router();

const {
  getOrCreateNote,
  updateNote,
  deleteNote,
  searchNotes,
  getRecentNotes
} = require('../controllers/noteController');

const { validateSlug, validateNoteBody } = require('../middleware/validator');
const { saveLimiter } = require('../middleware/rateLimiter');

// Non-dynamic routes (defined first to prevent slug parameter collisions)
router.get('/search', searchNotes);
router.post('/recent', getRecentNotes);

// Dynamic note CRUD routes
router.get('/:slug', validateSlug, getOrCreateNote);
router.put('/:slug', validateSlug, saveLimiter, validateNoteBody, updateNote);
router.delete('/:slug', validateSlug, deleteNote);

module.exports = router;
