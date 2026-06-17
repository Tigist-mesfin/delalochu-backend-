const Joi = require("joi");

const createRole = Joi.object({
  rolename: Joi.string().required(),
});

const updateRole = Joi.object({
  rolename: Joi.string(),
});

module.exports = { createRole, updateRole };