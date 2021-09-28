const Sequelize = require("sequelize");
const sequelize = new Sequelize("market", "lego", "1991", {
    dialect: "mysql",
    host: "localhost"
});

const Category = require("./category")(sequelize);
const Goods = require("./goods")(sequelize);
const Shop_order = require("./shop_order")(sequelize);
const User_info = require("./user_info")(sequelize);
const User = require("./user")(sequelize);

Shop_order.belongsTo(User_info, { foreignKey: 'user_id', targetKey: 'id' });
Goods.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id' });

module.exports = {
    sequelize: sequelize,
    category: Category,
    goods: Goods,
    shop_order: Shop_order,
    user_info: User_info,
    user: User,
}