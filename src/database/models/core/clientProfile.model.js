module.exports = (sequelize, DataTypes) => {
  const ClientProfile = sequelize.define("ClientProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    user_id: DataTypes.INTEGER,
    registered_by_staff_id: DataTypes.INTEGER,
    referred_by_broker_id: DataTypes.INTEGER,

    registration_type: DataTypes.ENUM("APP", "MANUAL_OFFICE"),
    client_category: DataTypes.ENUM("BUYER", "SELLER", "EMPLOYER", "TENANT"),

    requested_service: DataTypes.STRING,
  });

  ClientProfile.associate = (models) => {
    ClientProfile.belongsTo(models.User, {
      foreignKey: "user_id",
    });

    ClientProfile.belongsTo(models.User, {
      foreignKey: "registered_by_staff_id",
      as: "registeredByStaff",
    });

    ClientProfile.belongsTo(models.BrokerProfile, {
      foreignKey: "referred_by_broker_id",
    });
  };

  return ClientProfile;
};