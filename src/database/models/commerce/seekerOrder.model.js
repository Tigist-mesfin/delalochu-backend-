module.exports = (sequelize, DataTypes) => {
  const SeekerOrder = sequelize.define("SeekerOrder", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: DataTypes.STRING,
    phone: DataTypes.STRING,

    registered_by_user_id: DataTypes.INTEGER,
    listing_category_id: DataTypes.INTEGER,

    budget_min: DataTypes.DECIMAL,
    budget_max: DataTypes.DECIMAL,

    description: DataTypes.TEXT,

    mode: DataTypes.ENUM("INTERNAL", "SHARED"),
    status: DataTypes.ENUM("OPEN", "MATCHED", "CLOSED"),

    created_at: DataTypes.DATE,
  });

  SeekerOrder.associate = (models) => {
    SeekerOrder.belongsTo(models.User, {
      foreignKey: "registered_by_user_id",
    });

    SeekerOrder.belongsTo(models.ListingCategory, {
      foreignKey: "listing_category_id",
    });

    SeekerOrder.hasMany(models.Deal, {
      foreignKey: "seeker_order_id",
    });
  };

  return SeekerOrder;
};