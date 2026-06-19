const Joi = require("joi");

exports.create = Joi.object({

  listing_category_id: Joi.number().required(),

  client_user_id: Joi.number().required(),

  title: Joi.string().required(),

  price: Joi.number().required(),

  description: Joi.string().allow(""),

  region: Joi.string().required(),

  city: Joi.string().required(),

  woreda: Joi.string().allow(""),

  specific_location: Joi.string().allow(""),

  features: Joi.string().required(),

  assigned_brokers: Joi.string().required(),

});