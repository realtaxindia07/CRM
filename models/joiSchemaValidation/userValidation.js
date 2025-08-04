const joi=require("joi");

module.exports.registerValidation=joi.object({
    name:joi.string().min(2).max(100).required(),
    email:joi.string().email().required(),
    phone: joi.number().min(6000000000).max(9999999999).required(),
    role:joi.string().valid( 'user').default('user'),
    password:joi.string().min(6).required()
});

module.exports.loginValidation=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});
