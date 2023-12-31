console.log("BEFORE");
const sequelize = require('../config/connection');
console.log(":AFTER");
const { User, blogPost } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();


