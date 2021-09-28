const Sequelize = require("sequelize");
const User_info = require("./user_info");

module.exports = function (sequelize) {
    return sequelize.define("shop_order", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User_info,
                key: 'id'
            }
        },
        goods_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        goods_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        goods_amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        tableName: "shop_order",
    });
}