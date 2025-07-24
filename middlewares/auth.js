const jwt=require("jsonwebtoken");
const ExpressError = require("../utils/CustomError");

module.exports.isloggedIn = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new ExpressError(401, "Unauthorized");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new ExpressError(401, "Unauthorized");
        }
        req.user = decoded;
        next();
    });
};
module.exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        throw new ExpressError(403, "Forbidden");
    }
    next();
};
module.exports.isManager = (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'manager')) {
        throw new ExpressError(403, "Forbidden");
    }
    next();
};
