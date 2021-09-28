const jwt = require("jsonwebtoken");
const { secret } = require("../templates/config");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    const authHeader = req.headers.authorization
    if (authHeader != null) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) return res.sendStatus(403).json({ message: "There are no rights to access the content" });
            req.user = user
            next();
        })
    } else {
        return res.sendStatus(401).json({ message: "user unauthorized" });
    }
}