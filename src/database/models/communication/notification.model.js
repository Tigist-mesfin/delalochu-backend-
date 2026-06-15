module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    sender_user_id: DataTypes.INTEGER,
    receiver_user_id: DataTypes.INTEGER,

    senderEntity: DataTypes.STRING,
    receiverEntity: DataTypes.STRING,

    message: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN,
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "sender_user_id",
      as: "sender",
    });

    Notification.belongsTo(models.User, {
      foreignKey: "receiver_user_id",
      as: "receiver",
    });
  };

  return Notification;
};