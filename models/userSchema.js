const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    phone:{ type:Number, required:true },
    password:{ type:String, required:true },
    role:{ type:String, enum:['admin','manager','user'], default:'user' }
},{
    timestamps:true
}
);

module.exports=mongoose.model('User',userSchema);