const { wrapAsync } = require("../../utils/wrapAsync");
const Lead = require("../../models/dashboard/leadManagement"); 
const Info = require("../../models/dashboard/userInfo"); 

module.exports.getAllLeads=wrapAsync(async (req, res, next) => {
    // Logic to get all leads
    const leads= await Lead.find().populate('userInfo');
    res.status(200).send(leads);
});

module.exports.createLead = wrapAsync(async (req, res, next) => {
    // Logic to create a lead 
    const {name, email, phone,address} = req.body;
    const newInfo=new Info({name, email, phone,address});
    await newInfo.save();
    const newLead = new Lead({ ...req.body, userInfo: newInfo._id });
    await newLead.save();
    res.status(201).send("Lead created successfully");
});

module.exports.updateLead = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    // Logic to update a lead
    const updatedLead = await Lead.findById(id);
    const { name, email, phone, address } = req.body;
    await Info.findByIdAndUpdate(updatedLead.userInfo, { name, email, phone, address });
    await updatedLead.updateOne(req.body);
    res.status(200).send("Lead updated successfully");
});

module.exports.deleteLead = wrapAsync(async (req, res, next) => {
    // Logic to delete a lead
    const { id } = req.params;
    const updatedLead = await Lead.findById(id);
    await Info.findByIdAndDelete(updatedLead.userInfo);
    await updatedLead.deleteOne();
    res.status(200).send("Lead deleted successfully");
});
