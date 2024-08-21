const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model { }

Blog.init(
    {
        blogText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        blogTitle: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Blog;