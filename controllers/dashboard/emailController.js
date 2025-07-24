const {wrapAsync} = require('../../utils/wrapAsync');

module.exports.getAllEmails = wrapAsync(async (req, res, next) => {
    // Logic to get all emails
    res.send("Get all emails");
});

module.exports.createEmail = wrapAsync(async (req, res, next) => {
    // Logic to create an email
    res.send("Create an email");
});

module.exports.updateEmail = wrapAsync(async (req, res, next) => {
    // Logic to update an email
    res.send("Update an email");
});

module.exports.deleteEmail = wrapAsync(async (req, res, next) => {
    // Logic to delete an email
    res.send("Delete an email");
});
