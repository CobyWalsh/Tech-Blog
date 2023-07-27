const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    "blog_db", "root", "rootroot",
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;