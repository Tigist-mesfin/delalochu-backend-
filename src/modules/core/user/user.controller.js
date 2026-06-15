// src/modules/core/user/user.controller.js
const catchAsync = require("../../../shared/helpers/catchAsync.helper");
const { sendSuccess } = require("../../../shared/helpers/response.helper");
const userService = require("./user.service");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  sendSuccess(res, { data: user, message: "User created", statusCode: 201 });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  sendSuccess(res, { data: user, message: "User fetched" });
});

module.exports = { createUser, getUser };
