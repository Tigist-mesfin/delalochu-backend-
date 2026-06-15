module.exports = (sequelize, DataTypes) => {
  const SubscriptionHistory = sequelize.define("SubscriptionHistory", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    subscription_setting_id: DataTypes.INTEGER,
    broker_id: DataTypes.INTEGER,

    expired_date: DataTypes.DATE,
  });

  SubscriptionHistory.associate = (models) => {
    SubscriptionHistory.belongsTo(models.SubscriptionSetting, {
      foreignKey: "subscription_setting_id",
    });

    SubscriptionHistory.belongsTo(models.BrokerProfile, {
      foreignKey: "broker_id",
    });
  };

  return SubscriptionHistory;
};