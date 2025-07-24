const joi=require("joi");

module.exports.registerValidate=joi.object({
    name:joi.string().min(2).max(100).required(),
    email:joi.string().email().required(),
    phone:joi.string().min(10).max(15).required(),
    role:joi.string().valid( 'user').default('user'),
    password:joi.string().min(6).required()
});

module.exports.loginValidate=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});
