const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("user_info", {
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
        user_phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: "user_info",
    });
}