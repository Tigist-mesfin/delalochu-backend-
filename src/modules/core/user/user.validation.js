// src/modules/core/user/user.validation.js
const Joi = require("joi");

const objectId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Invalid ID"); // if using MongoDB ObjectId – adjust for integer IDs

const createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  role: Joi.string().valid("broker", "client", "staff").default("client"),
});

const updateUser = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50),
}).min(1); // at least one field required

const userId = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  createUser,
  updateUser,
  userId,
};
