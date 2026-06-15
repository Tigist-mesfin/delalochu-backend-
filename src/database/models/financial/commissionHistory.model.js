module.exports = (sequelize, DataTypes) => {
  const CommissionHistory = sequelize.define("CommissionHistory", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    deal_id: DataTypes.INTEGER,
    broker_id: DataTypes.INTEGER,

    paid_amount: DataTypes.DECIMAL,
  });

  CommissionHistory.associate = (models) => {
    CommissionHistory.belongsTo(models.Deal, {
      foreignKey: "deal_id",
    });

    CommissionHistory.belongsTo(models.BrokerProfile, {
      foreignKey: "broker_id",
    });
  };

  return CommissionHistory;
};