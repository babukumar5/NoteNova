const rateLimit = require('express-rate-limit');

/**
 * General rate limiter for all standard API endpoints.
 * Capped at 300 requests per 15 minutes per IP.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Stricter rate limiter for note modification (PUT/DELETE).
 * Capped at 60 requests per minute per IP.
 */
const saveLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: {
    success: false,
    message: 'You are autosaving too frequently. Rate limit exceeded.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, saveLimiter };
