import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    chargeRate: String
})

const Contract = mongoose.models.Contract || mongoose.model('Contract', contractSchema)

export default Contract