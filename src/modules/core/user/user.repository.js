const { models } = require('../../../database');
const { User } = models; // assuming model alias

const findByEmail = (email) => User.findOne({ where: { email } });
const findById = (id) => User.findByPk(id);
const create = (data) => User.create(data);

module.exports = { findByEmail, findById, create };