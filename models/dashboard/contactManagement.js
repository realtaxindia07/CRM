const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    department: { type: String, required: true },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    
},{
    timestamps: true,
}
);

module.exports = mongoose.model('Contact', contactSchema);