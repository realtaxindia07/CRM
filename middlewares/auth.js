const jwt=require("jsonwebtoken");
const ExpressError = require("../utils/CustomError");
const User = require("../models/userSchema");
const { wrapAsync } = require("../utils/wrapAsync");

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
module.exports.isAdmin = wrapAsync(async (req, res, next) => {
    if (!req.user) {
        throw new ExpressError(403, "Forbidden");
    }
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
        throw new ExpressError(403, "Forbidden");
    }
    next();
});
module.exports.isManager = wrapAsync(async (req, res, next) => {
    if (!req.user) {
        throw new ExpressError(403, "Forbidden");
    }
    const user = await User.findById(req.user.id);
    if (user.role === 'admin' || user.role === 'manager') {
        next();
    }else{
         throw new ExpressError(403, "Forbidden");
    }

});
module.exports.isTeamLeader = wrapAsync(async (req, res, next) => {
    if (!req.user) {
        throw new ExpressError(403, "Forbidden");
    }
    const user = await User.findById(req.user.id);
    if (user.role === 'admin' || user.role === 'manager' || user.role === 'teamLeader') {
        next();
    }else{
        throw new ExpressError(403, "Forbidden");
    }
});