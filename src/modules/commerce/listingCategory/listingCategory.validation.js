const Joi = require("joi");

const createListingCategory = Joi.object({
  property_name: Joi.string().required(),

  commission_type: Joi.string().valid("FIXED", "PERCENTAGE").required(),

  commission_value: Joi.number().required(),

  broker_commission_share: Joi.number().required(),

  company_gain_share: Joi.number().required(),

  // FIXED: JSON key-value pair
  category_specific_feature_details: Joi.object().allow(null),
});

const updateListingCategory = Joi.object({
  property_name: Joi.string(),

  commission_type: Joi.string().valid("FIXED", "PERCENTAGE"),

  commission_value: Joi.number(),

  broker_commission_share: Joi.number(),

  company_gain_share: Joi.number(),

  category_specific_feature_details: Joi.object().allow(null),
});

module.exports = {
  createListingCategory,
  updateListingCategory,
};