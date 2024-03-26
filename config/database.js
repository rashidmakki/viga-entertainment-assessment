const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'food_delivery_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'new_password',
});

module.exports = sequelize;
