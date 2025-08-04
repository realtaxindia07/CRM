const {wrapAsync} = require("../../utils/wrapAsync");
const Employee = require("../../models/dashboard/employee");
const UserInfo = require("../../models/dashboard/userInfo");

module.exports.getAllEmployees = wrapAsync(async (req, res, next) => {
    const employees = await Employee.find().populate('userInfo');
    res.status(200).send(employees);
}); 
module.exports.createEmployee = wrapAsync(async (req, res, next) => {
    const {name, email, phone, address} = req.body;
    const newInfo = await UserInfo.create({name, email, phone, address});
    const newEmployee = await Employee.create({...req.body, userInfo: newInfo._id});
    await newEmployee.save();
    await newEmployee.populate('userInfo');
    res.status(201).send(newEmployee);
});
module.exports.updateEmployee = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const {name, email, phone, address} = req.body;
    const updatedEmployee = await Employee.findById(id);
    await UserInfo.findByIdAndUpdate(updatedEmployee.userInfo,{name, email, phone, address});
    await updatedEmployee.updateOne({...req.body, userInfo: updatedEmployee.userInfo });
    await updatedEmployee.populate('userInfo');
    res.status(200).send(updatedEmployee);
});
module.exports.deleteEmployee = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    await UserInfo.findByIdAndDelete(employee.userInfo);
    await employee.deleteOne();
    res.status(200).send("Employee deleted successfully");
});