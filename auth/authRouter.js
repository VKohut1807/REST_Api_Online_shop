const express = require("express");
const routerAuth = express.Router();
const controller = require("./authController");
const roleMiddleware = require("../middleware/roleMiddleware");
const { check } = require("express-validator");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const multerConfig = require("../templates/multerConfig");

routerAuth.use(cookieParser());
routerAuth.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
routerAuth.use(multer({ storage: multerConfig.storageConfig, fileFilter: multerConfig.fileFilter }).single("fileImage"));

routerAuth.get("/registration", controller.registration_get);
routerAuth.post("/registration", [
    check("userName", "name cannot be empty").notEmpty(),
    check("userPassword", "password = min - 3 max - 10 symbols").isLength({ min: 3, max: 10 })], controller.registration);

routerAuth.get("/login", controller.login_get);
routerAuth.post("/login", controller.login);

routerAuth.get("/admin", roleMiddleware(["ADMIN", "SELLER"]), controller.admin_get);

routerAuth.get("/admin-category", roleMiddleware(["ADMIN"]), controller.category_get);
routerAuth.post("/admin-category", roleMiddleware(["ADMIN"]), controller.category);
routerAuth.delete("/admin-category", roleMiddleware(["ADMIN"]), controller.categoryDel);

routerAuth.get("/admin-goods", roleMiddleware(["ADMIN"]), controller.goods_get);
routerAuth.post("/admin-goods", roleMiddleware(["ADMIN"]), controller.goods);
routerAuth.delete("/admin-goods", roleMiddleware(["ADMIN"]), controller.goodsDel);

routerAuth.get("/admin-order", roleMiddleware(["ADMIN", "SELLER"]), controller.order_get);

routerAuth.post("/uploads-img", roleMiddleware(["ADMIN"]), controller.uploadsImg);

module.exports = routerAuth;