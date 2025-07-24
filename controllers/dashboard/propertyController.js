const {wrapAsync} = require('../../utils/wrapAsync');

module.exports.getAllProperties = wrapAsync(async (req, res, next) => {
    // Logic to get all properties
    res.send("Get all properties");
});

module.exports.createProperty = wrapAsync(async (req, res, next) => {
    // Logic to create a property
    res.send("Create a property");
});

module.exports.updateProperty = wrapAsync(async (req, res, next) => {
    // Logic to update a property
    res.send("Update a property");
});

module.exports.deleteProperty = wrapAsync(async (req, res, next) => {
    // Logic to delete a property
    res.send("Delete a property");
});
