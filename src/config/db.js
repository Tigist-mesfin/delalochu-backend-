// src/config/db.js
const { Sequelize } = require("sequelize");
const env = require("../config/env");

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'mysql',
  // Use mysql2 package for better performance & auth support
  dialectModule: require('mysql2'),

  logging: env.NODE_ENV === 'development' ? console.log : false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;