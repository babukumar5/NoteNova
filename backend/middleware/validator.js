const RESERVED_SLUGS = new Set([
  'api', 'search', 'recent', 'static', 'admin', 'assets', 'favicon', 'robots.txt', 'sitemap.xml', 'index', 'home', 'about'
]);

/**
 * Validates and normalizes the note slug parameter.
 */
const validateSlug = (req, res, next) => {
  const { slug } = req.params;
  
  if (!slug) {
    return res.status(400).json({ success: false, message: 'Slug parameter is required.' });
  }

  const normalizedSlug = slug.toLowerCase().trim();

  // Validate format (lowercase letters, numbers, hyphens, underscores)
  const slugRegex = /^[a-z0-9-_]+$/;
  if (!slugRegex.test(normalizedSlug)) {
    return res.status(400).json({
      success: false,
      message: 'Slug can only contain alphanumeric characters, hyphens, and underscores.'
    });
  }

  // Validate length constraints
  if (normalizedSlug.length < 1 || normalizedSlug.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Slug must be between 1 and 100 characters.'
    });
  }

  // Prevent hijacking reserved paths
  if (RESERVED_SLUGS.has(normalizedSlug)) {
    return res.status(400).json({
      success: false,
      message: `"${normalizedSlug}" is a reserved keyword and cannot be used as a note slug.`
    });
  }

  // Update param for controllers
  req.params.slug = normalizedSlug;
  next();
};

/**
 * Validates note properties in request body.
 */
const validateNoteBody = (req, res, next) => {
  const { title, content, favorite } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return res.status(400).json({ success: false, message: 'Title must be a string.' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ success: false, message: 'Title cannot exceed 200 characters.' });
    }
  }

  if (content !== undefined && typeof content !== 'string') {
    return res.status(400).json({ success: false, message: 'Content must be a string.' });
  }

  if (favorite !== undefined && typeof favorite !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Favorite must be a boolean value.' });
  }

  next();
};

module.exports = { validateSlug, validateNoteBody };
