module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,

    phone: { type: DataTypes.STRING, unique: true },

    password_hash: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    bio: DataTypes.TEXT,

    role: DataTypes.ENUM("CLIENT", "BROKER", "STAFF", "ADMIN"),

    status: DataTypes.ENUM("ACTIVE", "PENDING", "SUSPENDED"),
  });

  User.associate = (models) => {
    User.hasOne(models.BrokerProfile, { foreignKey: "user_id" });
    User.hasOne(models.ClientProfile, { foreignKey: "user_id" });
    User.hasOne(models.StaffProfile, { foreignKey: "user_id" });

    User.hasMany(models.Listing, { foreignKey: "client_user_id" });
    User.hasMany(models.Deal, { foreignKey: "seeker_id" });

    User.hasMany(models.Transaction, { foreignKey: "user_id" });

    User.hasMany(models.Notification, {
      foreignKey: "sender_user_id",
      as: "sentNotifications",
    });

    User.hasMany(models.Notification, {
      foreignKey: "receiver_user_id",
      as: "receivedNotifications",
    });
  };

  return User;
};