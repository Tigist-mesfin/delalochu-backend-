// src/shared/helpers/response.helper.js

/**
 * Send a success response
 * @param {Response} res - Express response object
 * @param {object} options
 * @param {*} options.data - payload
 * @param {string} [options.message='Success']
 * @param {number} [options.statusCode=200]
 */
const sendSuccess = (
  res,
  { data = null, message = "Success", statusCode = 200 } = {},
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response manually (rarely needed – prefer throwing AppError)
 * @param {Response} res
 * @param {object} options
 * @param {string} options.message
 * @param {number} options.statusCode
 * @param {string} [options.errorCode='CUSTOM_ERROR']
 */
const sendError = (
  res,
  { message, statusCode = 500, errorCode = "CUSTOM_ERROR" },
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
    },
  });
};

module.exports = { sendSuccess, sendError };
