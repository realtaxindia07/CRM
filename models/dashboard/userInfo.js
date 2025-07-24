const mongoose=require('mongoose');

const userInfoSchema=new mongoose.Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true },
    phone:{ type:Number, required:true },
    address:{ type:String, required:true },
}
);

module.exports=mongoose.model('UserInfo',userInfoSchema);