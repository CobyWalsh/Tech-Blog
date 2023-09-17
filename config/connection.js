const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    "blog_db", "root", "rootroot",
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: 3306,
  }
);

module.exports = sequelize;