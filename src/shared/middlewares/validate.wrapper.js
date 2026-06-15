// src/shared/middlewares/validate.wrapper.js
const validate = require("./validate.middleware");

/**
 * Shorthand middleware factories for common request parts.
 */
const validateBody = (schema, options) => validate({ body: schema }, options);
const validateQuery = (schema, options) => validate({ query: schema }, options);
const validateParams = (schema, options) =>
  validate({ params: schema }, options);

// Combined, e.g. body + params – rare but handy
const validateRequest = (schemas, options) => validate(schemas, options);

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
  validateRequest,
};
