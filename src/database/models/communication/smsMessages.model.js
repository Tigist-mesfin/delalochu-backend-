module.exports = (sequelize, DataTypes) => {
  const SmsMessages = sequelize.define("SmsMessages", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    receiver_user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    message: DataTypes.TEXT,
    date: DataTypes.DATE,
  });

  SmsMessages.associate = (models) => {
    SmsMessages.belongsTo(models.User, {
      foreignKey: "receiver_user_id",
    });
  };

  return SmsMessages;
};