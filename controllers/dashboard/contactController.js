const { wrapAsync } = require("../../utils/wrapAsync");

module.exports.getAllContacts = wrapAsync(async (req, res, next) => {
    // Logic to get all contacts
    res.send("Get all contacts");
});

module.exports.createContact = wrapAsync(async (req, res, next) => {
    // Logic to create a contact
    res.send("Create a contact");
});

module.exports.updateContact = wrapAsync(async (req, res, next) => {
    // Logic to update a contact
    res.send("Update a contact");
});

module.exports.deleteContact = wrapAsync(async (req, res, next) => {
    // Logic to delete a contact
    res.send("Delete a contact");
});
