const sanitizeHtml = require('sanitize-html');

/**
 * Sanitizes an HTML string to prevent XSS attacks while preserving
 * rich-text formatting tags used by TipTap.
 */
const sanitizeContent = (html) => {
  if (typeof html !== 'string') return '';
  return sanitizeHtml(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li',
      'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'pre', 'span', 'u', 's'
    ],
    allowedAttributes: {
      'a': ['href', 'name', 'target', 'rel'],
      'span': ['class', 'style'],
      'code': ['class'],
      'pre': ['class']
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'color': [/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'background-color': [/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/]
      }
    },
    transformTags: {
      'a': sanitizeHtml.simpleTransform('a', { rel: 'nofollow noopener noreferrer' })
    }
  });
};

module.exports = { sanitizeContent };
