const Joi = require("joi");

const registerUser = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("CLIENT", "BROKER", "STAFF", "ADMIN").required(),
});

const loginUser = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});
const verifyOtpSchema = Joi.object({
  phone: Joi.string().required(),
  otp: Joi.string().pattern(/^\d{4,6}$/).required(),
});

const resendOtpSchema = Joi.object({
  phone: Joi.string().required(),
});



module.exports = { registerUser, loginUser, verifyOtpSchema,
  resendOtpSchema, };

