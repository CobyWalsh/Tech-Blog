const sequelize = require('../config/connection');
const { User, blogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPostDataEntry of blogPostData) {
    await blogPost.create({
      ...blogPostDataEntry,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();


