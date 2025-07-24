const mongoose=require('mongoose');
const callSchema=new mongoose.Schema({
    callLog:[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true }],
    relatedTo: { type: String, required: true },
},{
    timestamps:true
}
);

module.exports=mongoose.model('Call',callSchema);   