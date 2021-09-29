const db = require("../db");
const User = db.user;
const Category = db.category;
const Goods = db.goods;
const Shop_order = db.shop_order;
const User_info = db.user_info;
const jwt = require("jsonwebtoken");
const { secret } = require("../templates/config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require('fs');

function generateAccessToken(user) {
    return jwt.sign(user, secret, { expiresIn: "30min" });
}

class authController {
    async registration_get(req, res) { res.render("registration.pug") }
    async registration(req, res) {
        const error = validationResult(req);
        const { userName, userPassword } = req.body;

        if (!error.isEmpty()) {
            return res.status(400).json({ message: "Registration error", error });
        }

        await User.findOne({
            raw: true,
            where: {
                user_name: userName,
            }
        })
            .then(async data => {
                if (data) {
                    return res.status(400).json({ message: "Such a user already exists" });
                }
                const hashPassword = bcrypt.hashSync(userPassword, 7);
                await User.create({
                    user_name: userName,
                    password: hashPassword,
                })
                    .then(data => res.status(200).json({ message: `${data.user_name} registration successful` }))
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json({ message: `${data.user_name} registration isn't successful` })
                    })
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Registration error" })
            })
    }

    async login_get(req, res) { res.render("login.pug") }
    async login(req, res) {
        const { userName, userPassword } = req.body;

        await User.findOne({
            raw: true,
            where: {
                user_name: userName,
            }
        })
            .then(data => {
                const validPassword = bcrypt.compareSync(userPassword, data.password);
                if (data == null || userName !== data.user_name) {
                    return res.status(400).json({ message: `User ${userName} Not Found` })
                } else {
                    if (validPassword) {
                        const user = {
                            name: data.user_name,
                            roles: data.roles.split(",")
                        }
                        const accessToken = generateAccessToken(user);
                        const cookies = res.cookie("accessToken", `Bearer ${accessToken}`);
                        if (!cookies) {
                            return res.redirect("/auth/login");
                        }
                        return res.status(200).json({ user: user, message: "access allowed" });
                    } else {
                        return res.status(401).json({ message: "Passwords do not match" })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Login error" })
            }
            );
    }

    async admin_get(req, res) { res.render("admin.pug") }

    async category_get(req, res) {
        await Category.findAll({
            raw: true,
        })
            .then(data => {
                res.render("admin_category.pug", {
                    category: data
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "All category error" })
            })
    }
    async category(req, res) {
        await Category.create({
            category: req.body.name,
            description: req.body.description,
            image: `category-${req.body.image}`,
        })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Add new category - error" })
            })
    }
    async categoryDel(req, res) {
        let categoryId = req.body.categoryId;

        await Category.findOne({
            raw: true,
            where: { id: categoryId }
        })
            .then(req => {
                fs.unlink(__dirname + `/../public/img/${req.image}`, err => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`File ${req.image} has been Deleted`);
                })
            })
            .catch(err => {
                console.log(err);
            });

        await Category.destroy({ where: { id: categoryId } })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Delete category - error" })
            });
    }

    async goods_get(req, res) {
        let category = new Promise((resolve, reject) => {
            Category.findAll({ raw: true })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });

        let goods = new Promise((resolve, reject) => {
            Goods.findAll({
                raw: true,
                include: [{
                    model: Category,
                }]
            })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });

        Promise.all([goods, category])
            .then((value) => {
                res.render("admin_goods.pug", {
                    goods: value[0],
                    category: value[1],
                });
            });
    }
    async goods(req, res) {
        await Goods.create({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            image: `goods-${req.body.image}`,
            category_id: req.body.category_id,
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Add new goods - error" })
            })
    }
    async goodsDel(req, res) {
        let goodsId = req.body.goodsId;

        await Goods.findOne({
            raw: true,
            where: { id: goodsId }
        })
            .then(req => {
                fs.unlink(__dirname + `/../public/img/${req.image}`, err => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`File ${req.image} has been Deleted`);
                })
            })
            .catch(err => {
                console.log(err);
            });

        await Goods.destroy({ where: { id: goodsId } })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Delete goods - error" })
            })
    }

    async users_get(req, res) {
        await User.findAll({
            raw: true,
        })
            .then(data => {
                res.render("admin_users.pug", {
                    users: data
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Users error" })
            })
    }
    async users(req, res) {
        const { userId, name, password, roles } = req.body;
        const hashPassword = bcrypt.hashSync(password, 7);
        await User.update({
            user_name: name,
            password: hashPassword,
            roles: roles,
        },
            {
                where: { id: userId }
            }
        )
            .then(data => res.status(200).json({ message: "User data has been changed" }))
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "User data - error" })
            })
    }
    async usersDel(req, res) {
        let userId = req.body.userId;

        await User.destroy({ where: { id: userId } })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "Delete User - error" })
            });
    }

    async order_get(req, res) {
        await Shop_order.findAll({
            raw: true,
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: User_info,
            }]
        })
            .then(data => {
                res.render("admin_order.pug", {
                    order_shop: data,
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: "All order - error" })
            })
    }

    async uploadsImg(req, res) {
        let filedata = req.file;
        if (filedata) {
            return res.status(200).json({ message: "File loaded" });
        }
        else {
            return res.status(304).json({ message: "Only .png, .jpg and .jpeg format allowed! and file size < 1MB" });
        }
    }
}

module.exports = new authController();