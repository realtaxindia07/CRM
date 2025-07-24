const mongoose=require('mongoose');


const propertySchema=new mongoose.Schema({
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    documents: [{ type: String }],
    status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
    builtYear: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    interestedContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }]
},{
    timestamps:true
}
);

module.exports=mongoose.model('Property',propertySchema);