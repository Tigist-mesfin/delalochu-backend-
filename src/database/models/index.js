const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

// =====================
// CORE MODELS
// =====================
const User = require("./core/user.model")(sequelize, DataTypes);
const BrokerProfile = require("./core/brokerProfile.model")(sequelize, DataTypes);
const BrokerReview = require("./core/brokerReview.model")(sequelize, DataTypes);
const ClientProfile = require("./core/clientProfile.model")(sequelize, DataTypes);
const StaffProfile = require("./core/staffProfile.model")(sequelize, DataTypes);
const StaffRole = require("./core/staffRole.model")(sequelize, DataTypes);
const StaffPermission = require("./core/staffPermission.model")(sequelize, DataTypes);

// =====================
// COMMERCE MODELS
// =====================
const Listing = require("./commerce/listing.model")(sequelize, DataTypes);
const ListingCategory = require("./commerce/listingCategory.model")(sequelize, DataTypes);
const SeekerOrder = require("./commerce/seekerOrder.model")(sequelize, DataTypes);
const Deal = require("./commerce/deal.model")(sequelize, DataTypes);
const DealAuditTrail = require("./commerce/dealAuditTrail.model")(sequelize, DataTypes);
const DealFinancialSnapshot = require("./commerce/dealFinancialSnapshot.model")(sequelize, DataTypes);

// =====================
// FINANCIAL MODELS
// =====================
const Transaction = require("./financial/transaction.model")(sequelize, DataTypes);
const CommissionHistory = require("./financial/commissionHistory.model")(sequelize, DataTypes);
const Revenue = require("./financial/revenue.model")(sequelize, DataTypes);
const SubscriptionHistory = require("./financial/subscriptionHistory.model")(sequelize, DataTypes);
const SubscriptionSetting = require("./financial/subscriptionSetting.model")(sequelize, DataTypes);

// =====================
// COMMUNICATION MODELS
// =====================
const Notification = require("./communication/notification.model")(sequelize, DataTypes);
const SmsMessages = require("./communication/smsMessages.model")(sequelize, DataTypes);

// =====================
// ALL MODELS REGISTRY
// =====================
const models = {
  // Core
  User,
  BrokerProfile,
  BrokerReview,
  ClientProfile,
  StaffProfile,
  StaffRole,
  StaffPermission,

  // Commerce
  Listing,
  ListingCategory,
  SeekerOrder,
  Deal,
  DealAuditTrail,
  DealFinancialSnapshot,

  // Financial
  Transaction,
  CommissionHistory,
  Revenue,
  SubscriptionHistory,
  SubscriptionSetting,

  // Communication
  Notification,
  SmsMessages,
};

// =====================
// RUN ASSOCIATIONS
// =====================
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// =====================
// EXPORT
// =====================
models.sequelize = sequelize;
models.Sequelize = DataTypes;

module.exports = models;