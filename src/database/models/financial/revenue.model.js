module.exports = (sequelize, DataTypes) => {
  const Revenue = sequelize.define("Revenue", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    subscription_revenue: DataTypes.DECIMAL,
    commission_revenue: DataTypes.DECIMAL,
  });

  return Revenue;
};