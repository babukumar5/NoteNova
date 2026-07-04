/**
 * Centralized error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  // Log internal stacks for development
  console.error(err.stack || err);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    // Provide stack trace only in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
