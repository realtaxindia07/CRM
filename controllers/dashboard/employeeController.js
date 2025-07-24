const {wrapAsync} = require("../../utils/wrapAsync");

module.exports.getAllEmloyees = wrapAsync(async (req, res, next) => {
    // Logic to get all employees
    res.send("Get all employees");
});
module.exports.createEmloyee = wrapAsync(async (req, res, next) => {
    // Logic to create an employee
    res.send("Create an employee");
});
module.exports.updateEmloyee = wrapAsync(async (req, res, next) => {
    // Logic to update an employee
    res.send("Update an employee");
});
module.exports.deleteEmloyee = wrapAsync(async (req, res, next) => {
    // Logic to delete an employee
    res.send("Delete an employee");
});