module.exports = (sequelize, DataTypes) => {
  const DealFinancialSnapshot = sequelize.define("DealFinancialSnapshot", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    deal_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },

    commission_gain: DataTypes.DECIMAL,
    company_gain: DataTypes.DECIMAL,
    broker_payout: DataTypes.DECIMAL,

    snapshot_at: DataTypes.DATE,
  });

  DealFinancialSnapshot.associate = (models) => {
    DealFinancialSnapshot.belongsTo(models.Deal, {
      foreignKey: "deal_id",
    });
  };

  return DealFinancialSnapshot;
};