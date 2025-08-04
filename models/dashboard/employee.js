const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    position:{ type:String, required:true },
    department:{ type:String, required:true },
    salary:{ type:Number, required:true },
    status:{ type:String, enum:['active', 'inactive'], default:'active' },
},{
    timestamps:true
}
);

module.exports=mongoose.model('Employee',employeeSchema); 