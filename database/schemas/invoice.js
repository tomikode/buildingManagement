import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    },
    amount: Number,
    date: Date,
    description: String
})

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema)

export default Invoice