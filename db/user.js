const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: {
            type: Sequelize.STRING,
            allowNull: true,
            default: "USER"
        },
    }, {
        timestamps: false,
        tableName: "user"
    });
}