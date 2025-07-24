const {wrapAsync} = require('../../utils/wrapAsync');

module.exports.getAllCalls = wrapAsync(async (req, res, next) => {
    // Logic to get all calls
    res.send("Get all calls");
});
module.exports.createCall = wrapAsync(async (req, res, next) => {
    // Logic to create a call
    res.send("Create a call");
});
module.exports.updateCall = wrapAsync(async (req, res, next) => {
    // Logic to update a call
    res.send("Update a call");
});
module.exports.deleteCall = wrapAsync(async (req, res, next) => {
    // Logic to delete a call
    res.send("Delete a call");
});
module.exports.getCallDetails = wrapAsync(async (req, res, next) => {
    // Logic to get call details
    res.send("Get call details");
});

module.exports.getCallHistory = wrapAsync(async (req, res, next) => {
    // Logic to get call history
    res.send("Get call history");
});