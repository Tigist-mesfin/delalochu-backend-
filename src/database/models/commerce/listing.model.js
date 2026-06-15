module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define("Listing", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    listing_category_id: DataTypes.INTEGER,
    client_user_id: DataTypes.INTEGER,

    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,

    region: DataTypes.STRING,
    city: DataTypes.STRING,
    woreda: DataTypes.STRING,
    specific_location: DataTypes.STRING,

    images_json: DataTypes.TEXT,
    features_json: DataTypes.TEXT,
    assigned_brokers_json: DataTypes.TEXT,
  });

  Listing.associate = (models) => {
    Listing.belongsTo(models.ListingCategory, {
      foreignKey: "listing_category_id",
    });

    Listing.belongsTo(models.User, {
      foreignKey: "client_user_id",
    });

    Listing.hasMany(models.Deal, {
      foreignKey: "listing_id",
    });
  };

  return Listing;
};