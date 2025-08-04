const leadSchemaValidation = require("../../models/joiSchemaValidation/leadValidation");
const employeeSchemaValidation = require("../../models/joiSchemaValidation/employeeValidation");
const ExpressError = require("../../utils/CustomError");

module.exports.isLeadValid = (req, res, next) => {
    const { error } = leadSchemaValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};

module.exports.isEmployeeValid = (req, res, next) => {
    const { error } = employeeSchemaValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};