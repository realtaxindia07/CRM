const joi=require("joi");

const leadSchemaValidation=joi.object({
    name:joi.string().min(2).max(100).required(),
    email:joi.string().email().required(),
    phone: joi.number().min(6000000000).max(9999999999).required(),
    address:joi.string().min(5).max(200).required(),
    title:joi.string().min(2).max(100),
    followUpStatus:joi.string().min(2).max(50),
    conversionDate:joi.date(),
    followUpDate:joi.date(),
    leadSource:joi.string().min(2).max(50),
    leadStatus:joi.string().valid('sold', 'pending', 'active').default('active'),
    owner:joi.string().min(2).max(50),
    score:joi.number().min(0).max(100),
});

module.exports=leadSchemaValidation;
