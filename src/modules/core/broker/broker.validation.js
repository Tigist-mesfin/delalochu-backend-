const Joi = require("joi");

const createBroker = Joi.object({
  user_id: Joi.number().integer().required(),

  verification_status: Joi.string().required(),

  experience: Joi.number().integer().min(0).required(),

  region: Joi.string().required(),
  city: Joi.string().required(),
  woreda: Joi.string().required(),
  specific_area: Joi.string().required(),

  doc: Joi.string().allow("", null),

  total_deals_closed: Joi.number().integer().default(0),

  rating: Joi.number().min(0).max(5).default(0),

  broker_status: Joi.string()
    .valid("ACTIVE", "BANNED")
    .default("ACTIVE"),

  wallet_balance: Joi.number().default(0),
});

const updateBroker = Joi.object({
  verification_status: Joi.string(),

  experience: Joi.number().integer(),

  region: Joi.string(),
  city: Joi.string(),
  woreda: Joi.string(),
  specific_area: Joi.string(),

  doc: Joi.string().allow("", null),

  total_deals_closed: Joi.number().integer(),

  rating: Joi.number().min(0).max(5),

  broker_status: Joi.string().valid("ACTIVE", "BANNED"),

  wallet_balance: Joi.number(),
});

module.exports = {
  createBroker,
  updateBroker,
};