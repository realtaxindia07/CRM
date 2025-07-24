const mongoose = require('mongoose');
const taskSchema=new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    assignment: { type: String, required: true },
    relatedTo: { type: String, required: true },
    notes: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'in-progress', 'completed'] },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    startAt: {
        type: Date,
        default: Date.now
    },
    endAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
}
)

module.exports = mongoose.model('Task', taskSchema);