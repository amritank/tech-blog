const sequelize = require("../config/connection");
const { Blog, Comment, User } = require("../models");

const userSeedData = require("./user.json");
const blogSeedData = require("./blog.json");
const commentseedData = require("./comment.json");

const seedDb = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userSeedData, { individualHooks: true });
    await Blog.bulkCreate(blogSeedData);
    await Comment.bulkCreate(commentseedData);
    process.exit();
}

seedDb();