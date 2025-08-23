const joi=require("joi");

module.exports.roleValidation=joi.object({
    email:joi.string().email().required(),
    role:joi.string().valid('user', 'admin', 'manager', 'teamLeader').required()
});
