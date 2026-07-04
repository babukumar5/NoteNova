const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // Primary lookup index
    },
    title: {
      type: String,
      trim: true,
      default: 'Untitled Note',
    },
    content: {
      type: String, // Rich HTML output from TipTap (sanitized)
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Auto manages createdAt and updatedAt
  }
);

// Multi-field text index for search functionality
NoteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', NoteSchema);
