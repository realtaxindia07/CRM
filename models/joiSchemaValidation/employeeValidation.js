const joi= require('joi');

const employeeSchemaValidation= joi.object({
    name: joi.string().min(2).max(100).required(),
    email: joi.string().email().required(),
    phone: joi.number().min(6000000000).max(9999999999).required(),
    address: joi.string().min(5).max(255).required(),
    salary: joi.number().min(0).required(),
    position: joi.string().valid('developer', 'designer', 'manager').required(),
    department: joi.string().valid('HR', 'IT', 'Sales').required(),
    status: joi.string().valid('active', 'inactive').default('active')
});

module.exports= employeeSchemaValidation;
 