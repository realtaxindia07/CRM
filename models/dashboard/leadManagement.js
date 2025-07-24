
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
        userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
        title: { type: String,
            //  required: true 
            },
        followUpStatus: { type: String,
            //  required: true
             },
        conversionDate: {
            type: Date,
            default: Date.now
        },
        followUpDate: {
            type: Date,
            default: Date.now
        },
        
        leadSource: { type: String, 
            // required: true 
        },
        leadStatus: {
            type: String,
            enum: ['sold', 'pending','active'],
            default: 'active'
        },
        owner: { type: String, 
            // required: true 
        },
        score: { type: Number, 
            // required: true 
        },

    // active:{
    //     email:[{ type:mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }],
    //     call:[{ type:mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }],
    //     task:  [{ type:mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    // },
    // document: {
    //     type: String,
    //     // required: true
    // },
}, {
  timestamps: true 
}
);

module.exports = mongoose.model('Lead', leadSchema);