const Joi = require("joi");

const createClient = Joi.object({
  user_id: Joi.number().integer().required(),

  registered_by_staff_id: Joi.number().integer().allow(null),

  referred_by_broker_id: Joi.number().integer().allow(null),

  registration_type: Joi.string()
    .valid("APP", "MANUAL_OFFICE")
    .required(),

  client_category: Joi.string()
    .valid("BUYER", "SELLER", "EMPLOYER", "TENANT")
    .required(),

  requested_service: Joi.string().required(),
});

const updateClient = Joi.object({
  registered_by_staff_id: Joi.number().integer(),

  referred_by_broker_id: Joi.number().integer(),

  registration_type: Joi.string().valid(
    "APP",
    "MANUAL_OFFICE"
  ),

  client_category: Joi.string().valid(
    "BUYER",
    "SELLER",
    "EMPLOYER",
    "TENANT"
  ),

  requested_service: Joi.string(),
});

module.exports = {
  createClient,
  updateClient,
};