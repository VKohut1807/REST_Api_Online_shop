const express = require("express");
const controllers = require("./controllers");
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

router.get("/", controllers.index_get);

router.get("/category", controllers.category_get);

router.get("/goods", controllers.goods_get);

router.post("/card", controllers.card);

router.get("/order", controllers.order_get)
router.post("/order", controllers.order)

router.post("/navbar", controllers.navbar);

router.post("/user", controllers.user);
router.delete("/logout", controllers.logout);

module.exports = router;