const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        tableName: "category"
    });
}