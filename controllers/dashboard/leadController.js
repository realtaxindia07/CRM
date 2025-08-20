const { wrapAsync } = require("../../utils/wrapAsync");
const Lead = require("../../models/dashboard/leadManagement");
const Info = require("../../models/dashboard/userInfo");
const User=require("../../models/userSchema")


module.exports.getAllLeads=wrapAsync(async (req, res, next) => {
    const user=await User.findById(req.user.id).populate({path: 'leads',populate: { path: 'userInfo' }});;
    if(user.role==="admin"||user.role==="manager"){
       const leads= await Lead.find().populate('userInfo');
       res.status(200).send(leads);
    }else{
        res.status(200).send(user.leads);
    }
});

module.exports.createLead = wrapAsync(async (req, res, next) => {
    const {name, email, phone,address} = req.body;
    const newInfo=new Info({name, email, phone,address});
    await newInfo.save();
    const newLead = new Lead({ ...req.body, userInfo: newInfo._id });
    await User.findByIdAndUpdate(req.user._id, { $push: { leads: newLead._id } });
    await newLead.save();
    await newLead.populate('userInfo');
    res.status(200).send(newLead);
});

module.exports.updateLead = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedLead = await Lead.findById(id);
    const { name, email, phone, address } = req.body;
    await Info.findByIdAndUpdate(updatedLead.userInfo, { name, email, phone, address });
    await updatedLead.updateOne({ ...req.body, userInfo: updatedLead.userInfo });
    await updatedLead.populate('userInfo');
    res.status(200).send(updatedLead);
});

module.exports.deleteLead = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedLead = await Lead.findById(id);
    await User.findByIdAndUpdate(updatedLead.user, { $pull: { leads: updatedLead._id } });
    await Info.findByIdAndDelete(updatedLead.userInfo);
    await updatedLead.deleteOne();
    res.status(200).send("Lead deleted successfully");
});
