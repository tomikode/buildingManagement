import mongoose from "mongoose";

const workOrderSchema = new mongoose.Schema({
    block: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    response: String,
    workDate: Date,
    status: String
})

const WorkOrder = mongoose.models.WorkOrder || mongoose.model('WorkOrder', workOrderSchema)

export default WorkOrder