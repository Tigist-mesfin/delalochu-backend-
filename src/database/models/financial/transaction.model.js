module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    user_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,

    type: DataTypes.ENUM("CREDIT", "DEBIT"),
    category: DataTypes.STRING,

    reference_type: DataTypes.STRING,
    reference_id: DataTypes.INTEGER,

    balance_after: DataTypes.DECIMAL,

    description: DataTypes.TEXT,

    created_at: DataTypes.DATE,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };

  return Transaction;
};