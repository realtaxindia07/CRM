const leadSchema = require("../../models/joiSchemaValidation/leadValidation");
const ExpressError = require("../../utils/CustomError");

module.exports.isLeadValid = (req, res, next) => {
    const { error } = leadSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};
