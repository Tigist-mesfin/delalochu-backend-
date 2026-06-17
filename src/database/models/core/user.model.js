module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Optional
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Optional
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("CLIENT", "BROKER", "STAFF", "ADMIN"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "PENDING", "SUSPENDED"),
      allowNull: false,
    },
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