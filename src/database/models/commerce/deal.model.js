module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define("Deal", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    listing_id: DataTypes.INTEGER,
    seeker_id: DataTypes.INTEGER,

    final_deal_value: DataTypes.DECIMAL,

    status: DataTypes.STRING,
  });

  Deal.associate = (models) => {
    Deal.belongsTo(models.Listing, {
      foreignKey: "listing_id",
    });

    Deal.belongsTo(models.User, {
      foreignKey: "seeker_id",
    });

    Deal.hasMany(models.DealAuditTrail, {
      foreignKey: "deal_id",
    });

    Deal.hasMany(models.CommissionHistory, {
      foreignKey: "deal_id",
    });

    Deal.hasOne(models.DealFinancialSnapshot, {
      foreignKey: "deal_id",
    });
  };

  return Deal;
};