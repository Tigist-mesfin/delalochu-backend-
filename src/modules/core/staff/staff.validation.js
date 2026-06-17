const Joi = require("joi");

const createStaff = Joi.object({
  user_id: Joi.number().required(),
  role_id: Joi.number().required(),
});

const updateStaff = Joi.object({
  role_id: Joi.number(),
});

module.exports = { createStaff, updateStaff };