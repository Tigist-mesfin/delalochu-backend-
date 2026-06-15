module.exports = (sequelize, DataTypes) => {
  const BrokerReview = sequelize.define("BrokerReview", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    broker_id: DataTypes.INTEGER,
    commentor_user_id: DataTypes.INTEGER,

    interaction_type: DataTypes.ENUM("LIKE", "DISLIKE"),
    comment: DataTypes.TEXT,

    date: DataTypes.DATE,
  });

  BrokerReview.associate = (models) => {
    BrokerReview.belongsTo(models.BrokerProfile, {
      foreignKey: "broker_id",
    });

    BrokerReview.belongsTo(models.User, {
      foreignKey: "commentor_user_id",
    });
  };

  return BrokerReview;
};