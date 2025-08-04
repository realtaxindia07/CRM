const Lead=require('../../models/dashboard/leadManagement')
const Contact = require('../../models/dashboard/contactManagement');
const Task = require('../../models/dashboard/task');
const Property = require('../../models/dashboard/property');
const { wrapAsync } = require('../../utils/wrapAsync');


module.exports.root= wrapAsync(async (req, res) => {
    const leads = await Lead.find().countDocuments();
    const contacts = await Contact.find().countDocuments();
    const tasks = await Task.find().countDocuments();
    const properties = await Property.find().countDocuments();
    res.status(200).json({ leads: leads, contacts: contacts, tasks: tasks, properties: properties });
})