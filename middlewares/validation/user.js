const { loginValidation, registerValidation } = require("../../models/joiSchemaValidation/userValidation");
const {roleValidation} = require("../../models/joiSchemaValidation/roleValidation");
const ExpressError = require("../../utils/CustomError");

module.exports.isRegisterValid = (req, res, next) => {
    const { error } = registerValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};
module.exports.isloginValid = (req, res, next) => {
    const { error } = loginValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};
module.exports.isRoleValid = (req, res, next) => {
    const { error } = roleValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};
