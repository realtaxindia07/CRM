const { loginValidate, registerValidate } = require("../../models/joiSchemaValidation/userValidation");
const ExpressError = require("../../utils/CustomError");

module.exports.isRegisterValid = (req, res, next) => {
    const { error } = registerValidate.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};

module.exports.isloginValid = (req, res, next) => {
    const { error } = loginValidate.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};
