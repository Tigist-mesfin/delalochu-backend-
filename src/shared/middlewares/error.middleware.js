// src/shared/middlewares/error.middleware.js
const AppError = require('../errors/AppError');
// const logger = require('../../config/logger'); 

const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || 'INTERNAL_ERROR';
  let message = err.message || 'Something went wrong';

  // Handle known operational errors
  if (err instanceof AppError) {
    // already set
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = err.errors.map(e => e.message).join(', ');
  }

  // Handle Sequelize unique constraint violation
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    errorCode = 'DUPLICATE_ENTRY';
    message = err.errors.map(e => e.message).join(', ');
  }

  // Handle JSON parse error
  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    errorCode = 'INVALID_JSON';
    message = 'Invalid JSON body';
  }

  // Log full error in development, limited in production
  if (process.env.NODE_ENV === 'development') {
    console.error('💥 ERROR:', err);
  } else {
    // log non-operational errors (bugs) with full stack
    if (!err.isOperational) {
      console.error('Unhandled error', err);
    }
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;