module.exports = (sequelize, DataTypes) => {
  const ListingCategory = sequelize.define("ListingCategory", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    property_name: DataTypes.STRING,

    commission_type: DataTypes.ENUM("FIXED", "PERCENTAGE"),
    commission_value: DataTypes.FLOAT,

    broker_commission_share: DataTypes.FLOAT,
    company_gain_share: DataTypes.FLOAT,

    category_specific_feature_details: DataTypes.TEXT,
  });

  ListingCategory.associate = (models) => {
    ListingCategory.hasMany(models.Listing, {
      foreignKey: "listing_category_id",
    });

    ListingCategory.hasMany(models.SeekerOrder, {
      foreignKey: "listing_category_id",
    });
  };

  return ListingCategory;
};