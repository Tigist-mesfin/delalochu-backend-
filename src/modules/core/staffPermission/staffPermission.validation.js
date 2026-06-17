const Joi = require("joi");

const createPermission = Joi.object({
  staff_role_id: Joi.number().integer().required(),
  module: Joi.string().required(),

  can_create: Joi.boolean().default(false),
  can_read: Joi.boolean().default(false),
  can_update: Joi.boolean().default(false),
  can_delete: Joi.boolean().default(false),

  granted_by_staff_id: Joi.number().integer().required(),

  granted_at: Joi.date().optional(),

  note: Joi.string().allow("", null),
});

const updatePermission = Joi.object({
  staff_role_id: Joi.number().integer(),
  module: Joi.string(),

  can_create: Joi.boolean(),
  can_read: Joi.boolean(),
  can_update: Joi.boolean(),
  can_delete: Joi.boolean(),

  granted_by_staff_id: Joi.number().integer(),

  granted_at: Joi.date(),

  note: Joi.string().allow("", null),
});

module.exports = {
  createPermission,
  updatePermission,
};