const mongoose=require('mongoose');
const emailSchema=new mongoose.Schema({
    emailLog:[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true }],
    relatedTo: { type: String, required: true },
},{
    timestamps:true
}
);

module.exports=mongoose.model('Email',emailSchema);