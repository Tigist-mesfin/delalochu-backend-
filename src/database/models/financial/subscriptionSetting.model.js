module.exports = (sequelize, DataTypes) => {
  const SubscriptionSetting = sequelize.define("SubscriptionSetting", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
  });

  SubscriptionSetting.associate = (models) => {
    SubscriptionSetting.hasMany(models.SubscriptionHistory, {
      foreignKey: "subscription_setting_id",
    });
  };

  return SubscriptionSetting;
};