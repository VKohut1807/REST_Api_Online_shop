const db = require("../db");
const Category = db.category;
const Goods = db.goods;
const User_info = db.user_info;
const Shop_order = db.shop_order;
const filterLastElements = require("../templates/filterLastElements");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { secret } = require("../templates/config");

async function sendMail(data, result) {
    let res = `<h2>Order in lite shop</h2>`;
    let total = 0;
    for (let i = 0; i < result.length; i++) {
        res += `<p>${result[i]["name"]} - ${data.key[result[i]["id"]]} ea - ${result[i]["cost"] * data.key[result[i]["id"]]} uah</p>`;
        total += result[i]["cost"] * data.key[result[i]["id"]];
    }
    res += `<hr>`;
    res += `Total ${total} uah`;
    res += `<hr>Phone: ${data.phone}`;
    res += `<hr>User name: ${data.username}`;
    res += `<hr>Address: ${data.address}`;
    res += `<hr>From Email: ${data.email}`;

    resText = `Order in lite shop\n`
    for (let i = 0; i < result.length; i++) {
        resText += `-${result[i]["name"]} = ${data.key[result[i]["id"]]} ea = ${result[i]["cost"] * data.key[result[i]["id"]]} uah`;
    }
    resText += `\n`;
    resText += `Total ${total} uah\n`;
    resText += `Phone: ${data.phone}\n`;
    resText += `User name: ${data.username}\n`;
    resText += `Address: ${data.address}\n`;
    resText += `From Email: ${data.email}\n`;

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let mailOption = {
        from: "vasylkohut1991@gmail.com",
        to: "vasylkohut1991@gmail.com," + data.email,
        subject: "Lite shop Order",
        text: resText,
        html: res,
    }

    let info = await transporter.sendMail(mailOption);
    console.log("message: %s", info.messageId);
    console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
    return true;
}

function saveOrder(data, result) {
    User_info.create({
        user_name: data.username,
        user_phone: data.phone,
        user_email: data.email,
        address: data.address,
    })
        .then(res => {
            for (let i = 0; i < result.length; i++) {
                Shop_order.create({
                    user_id: res.id,
                    goods_id: result[i]["id"],
                    goods_cost: result[i]["cost"],
                    goods_amount: data.key[result[i]["id"]],
                    total: result[i]["cost"] * data.key[result[i]["id"]],
                })
                    .then(resShopOrder => resShopOrder)
                    .catch(err => console.log(err));
            }
            return res;
        })
        .catch(err => console.log(err));
}

class controllers {
    async user(req, res) {
        const authCookies = req.cookies.accessToken
        if (authCookies != null) {
            const token = authCookies && authCookies.split(" ")[1];
            jwt.verify(token, secret, (err, user) => {
                req.user = user;
                return res.json({ user: user });
            })
        } else {
            return res.json({ message: "user unauthorized" });
        }
    }
    async logout(req, res) {
        let cookie = Object.keys(req.cookies);

        if (cookie.includes("accessToken")) {
            res.clearCookie(cookie[0]);
            return res.status(200).json({ message: "Logout successful" })
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    async index_get(req, res) {
        let categoryIndexPug = new Promise(async (resolve, reject) => {
            await Category.findAll({ raw: true })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });

        let goodsIndexPug = new Promise(async (resolve, reject) => {
            await Goods.findAll({ raw: true })
                .then(data => {
                    resolve(
                        filterLastElements(data)
                    );
                }).catch(err => {
                    reject(err);
                    console.log(err);
                });
        });

        Promise.all([categoryIndexPug, goodsIndexPug])
            .then((value) => {
                res.render("index.pug", {
                    categoryIndex: value[0],
                    goodsIndex: value[1]
                });
            });
    }
    async category_get(req, res) {
        let categoryId = req.query.id;

        let categoryOne = new Promise(async (resolve, reject) => {
            await Category.findAll({ raw: true, where: { id: categoryId } })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                    console.log(err);
                });
        });

        let goodsOne = new Promise(async (resolve, reject) => {
            await Goods.findAll({ raw: true, where: { category_id: categoryId } })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                    console.log(err);
                });
        });

        Promise.all([categoryOne, goodsOne])
            .then((value) => {
                res.render("category.pug", {
                    categoryOne: value[0],
                    goodsOne: value[1]
                });
            });
    }
    async goods_get(req, res) {
        let goodsId = req.query.id;

        await Goods.findOne({
            raw: true,
            where: { id: goodsId },
            include: [{
                model: Category,
            }]
        })
            .then(data => {
                res.render("goods.pug", {
                    goodsG: data
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: `goods error` })
            });
    }
    async card(req, res) {
        let goodsIdFilter = req.body.key;
        await Goods.findAll({ raw: true, attributes: ['id', "name", "cost"], where: { id: goodsIdFilter } })
            .then(data => {
                let goodsByIndex = {};
                for (let i = 0; i < data.length; i++) {
                    goodsByIndex[data[i]["id"]] = data[i];
                }
                return res.status(200).json({ goodsByIndex, message: "goods-info" });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: `card error` })
            });
    }
    async order_get(req, res) { res.render("order.pug") }
    async order(req, res) {
        let key = Object.keys(req.body.key);
        if (Object.entries(req.body.key).length !== 0) {
            await Goods.findAll({ raw: true, attributes: ['id', "name", "cost"], where: { id: key } })
                .then(result => {
                    saveOrder(req.body, result);
                    sendMail(req.body, result);
                    return res.status(200).json({ result, message: "order has been send" });
                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({ message: `error - send order` })
                });
        } else {
            res.send(JSON.stringify(key))
        }
    }
    async navbar(req, res) {
        await Category.findAll({ raw: true, attributes: ['id', "category"] })
            .then(result => {
                return res.status(200).json({ result, message: "navbar" });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: `navbar category-list - error` })
            });
    }
}

module.exports = new controllers();