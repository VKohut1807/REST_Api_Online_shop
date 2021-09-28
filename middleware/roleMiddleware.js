const jwt = require("jsonwebtoken");
const { secret } = require("../templates/config");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        const authCookies = req.cookies.accessToken
        if (authCookies != null) {
            const token = authCookies && authCookies.split(" ")[1];
            const { roles: userRoles } = jwt.verify(token, secret)
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            }
            )
            if (!hasRole) {
                return res.status(403).json({ message: "There are no rights to access the content" })
            }
            next();
        } else {
            return res.redirect("/auth/login");
        }
    }
}