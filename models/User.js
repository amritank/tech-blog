const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model { }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [3],
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        hooks: {
            beforeCreate: (userObj) => {
                userObj.password = bcrypt.hashSync(userObj.password, 6);
                return userObj;
            },
        },
    }
);

module.exports = User;