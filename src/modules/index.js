const userRouter = require("./core/user/user.router");
const staffRouter = require("./core/staff/staff.router");
const staffRoleRouter = require("./core/staffRole/staffRole.router");
const staffPermissionRouter = require("./core/staffPermission/staffPermission.router");

const clientRouter = require("./core/client/client.router");
const brokerRouter = require("./core/broker/broker.router");
const brokerReviewRouter = require("./core/brokerReview/brokerReview.router");

module.exports = {
  userRouter,
  staffRouter,
  staffRoleRouter,
  staffPermissionRouter,
  clientRouter,
  brokerRouter,
  brokerReviewRouter,
};