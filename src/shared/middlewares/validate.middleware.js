// src/shared/middlewares/validate.middleware.js
const AppError = require("../errors/AppError");

/**
 * Middleware factory to validate request parts with Joi schemas
 * @param {object} schemas - e.g. { body: Joi.object(), query: Joi.object(), params: Joi.object() }
 * @param {object} options - Joi validation options (abortEarly, stripUnknown, etc.)
 */
const validate = (schemas, options = {}) => {
  // Sensible defaults
  const defaultOptions = {
    abortEarly: false, // collect all errors
    stripUnknown: true, // remove unknown fields
    allowUnknown: false, // reject unknown fields (set true for query/prams if needed)
  };

  return (req, res, next) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const errors = [];

    for (const [part, schema] of Object.entries(schemas)) {
      if (!schema) continue;

      const { error, value } = schema.validate(req[part], {
        ...mergedOptions,
        context: { req }, // pass request for conditional validations
      });

      if (error) {
        errors.push(
          ...error.details.map((detail) => ({
            field: detail.path.join("."),
            message: detail.message,
          })),
        );
      } else {
        req[part] = value; // replace with sanitised values
      }
    }

    if (errors.length > 0) {
      const message = errors.map((e) => `${e.field}: ${e.message}`).join("; ");
      throw AppError.badRequest(message, "VALIDATION_ERROR");
    }

    next();
  };
};

module.exports = validate;
