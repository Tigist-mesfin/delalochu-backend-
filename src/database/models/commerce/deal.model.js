// src/database/models/commerce/deal.model.js

"use strict";

module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define(
    "Deal",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("pending", "active", "closed"),
        defaultValue: "pending",
      },

      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "deals",
      timestamps: true,
    },
  );

  // =====================
  // ASSOCIATIONS
  // =====================
  Deal.associate = (models) => {
    Deal.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Deal;
};
