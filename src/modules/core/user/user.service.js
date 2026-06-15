// src/modules/core/user/user.service.js
const UserRepository = require("./user.repository");
const AppError = require("../../../shared/errors/AppError");

const createUser = async (data) => {
  const existing = await UserRepository.findByEmail(data.email);
  if (existing) throw AppError.conflict("Email already exists", "EMAIL_EXISTS");
  return UserRepository.create(data);
};

const getUserById = async (id) => {
  const user = await UserRepository.findById(id);
  if (!user) throw AppError.notFound("User not found");
  return user;
};

module.exports = { createUser, getUserById };
