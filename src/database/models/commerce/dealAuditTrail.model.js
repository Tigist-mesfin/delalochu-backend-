module.exports = (sequelize, DataTypes) => {
  const DealAuditTrail = sequelize.define("DealAuditTrail", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    deal_id: DataTypes.INTEGER,
    changed_by_user_id: DataTypes.INTEGER,

    action: DataTypes.STRING,
    old_data: DataTypes.TEXT,
    new_data: DataTypes.TEXT,

    created_at: DataTypes.DATE,
  });

  DealAuditTrail.associate = (models) => {
    DealAuditTrail.belongsTo(models.Deal, {
      foreignKey: "deal_id",
    });

    DealAuditTrail.belongsTo(models.User, {
      foreignKey: "changed_by_user_id",
    });
  };

  return DealAuditTrail;
};