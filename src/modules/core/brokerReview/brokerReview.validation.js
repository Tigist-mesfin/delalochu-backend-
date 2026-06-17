const Joi = require("joi");

const createReview = Joi.object({
  broker_id: Joi.number().integer().required(),

  commentor_user_id: Joi.number().integer().required(),

  interaction_type: Joi.string()
    .valid("LIKE", "DISLIKE")
    .required(),

  comment: Joi.string().allow("", null),

  date: Joi.date().optional(),
});

const updateReview = Joi.object({
  interaction_type: Joi.string().valid("LIKE", "DISLIKE"),

  comment: Joi.string().allow("", null),

  date: Joi.date(),
});

module.exports = {
  createReview,
  updateReview,
};