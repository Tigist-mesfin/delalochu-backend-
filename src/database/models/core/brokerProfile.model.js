module.exports = (sequelize, DataTypes) => {
  const BrokerProfile = sequelize.define("BrokerProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    user_id: DataTypes.INTEGER,

    verification_status: DataTypes.STRING,
    experience: DataTypes.INTEGER,

    region: DataTypes.STRING,
    city: DataTypes.STRING,
    woreda: DataTypes.STRING,
    specific_area: DataTypes.STRING,

    doc: DataTypes.STRING,

    total_deals_closed: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,

    broker_status: DataTypes.ENUM("ACTIVE", "BANNED"),

    wallet_balance: DataTypes.DECIMAL(10, 2),
  });

  BrokerProfile.associate = (models) => {
    BrokerProfile.belongsTo(models.User, { foreignKey: "user_id" });

    BrokerProfile.hasMany(models.BrokerReview, {
      foreignKey: "broker_id",
    });

    BrokerProfile.hasMany(models.CommissionHistory, {
      foreignKey: "broker_id",
    });

    BrokerProfile.hasMany(models.SubscriptionHistory, {
      foreignKey: "broker_id",
    });

    BrokerProfile.hasMany(models.ClientProfile, {
      foreignKey: "referred_by_broker_id",
    });
  };

  return BrokerProfile;
};