"use strict";
const bcrypt = require("bcryptjs"); // or bcrypt, install separately

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase().trim());
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "broker", "client", "staff"),
        allowNull: false,
        defaultValue: "client",
      },
      avatar: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "users",
      timestamps: true, // adds createdAt, updatedAt
      underscored: false, // keep camelCase in JS
      defaultScope: {
        attributes: { exclude: ["password"] }, // never expose password by default
      },
      scopes: {
        withPassword: { attributes: { include: ["password"] } },
        active: { where: { isActive: true } },
      },
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
      },
      indexes: [
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["phone"] },
        { fields: ["role"] },
      ],
    },
  );

  // =====================
  // ASSOCIATIONS
  // =====================
  User.associate = (models) => {
    User.hasMany(models.Deal, {
      foreignKey: "userId",
      as: "deals",
    });
  };

  // Instance method to compare password
  User.prototype.validatePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // Exclude sensitive data in JSON output (already done via defaultScope)
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};
