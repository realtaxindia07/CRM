const {wrapAsync} = require("../../utils/wrapAsync");

module.exports.getAllTasks = wrapAsync(async (req, res, next) => {
    // Logic to get all tasks
    res.send("Get all tasks");
});
module.exports.createTask = wrapAsync(async (req, res, next) => {
    // Logic to create a task
    res.send("Create a task");
});
module.exports.updateTask = wrapAsync(async (req, res, next) => {
    // Logic to update a task
    res.send("Update a task");
});
module.exports.deleteTask = wrapAsync(async (req, res, next) => {
    // Logic to delete a task
    res.send("Delete a task");
});