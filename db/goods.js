const Sequelize = require("sequelize");
const Category = require("./category");

module.exports = function (sequelize) {
    return sequelize.define("goods", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        cost: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
    });
}