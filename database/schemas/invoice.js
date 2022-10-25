import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    date: Date,
    description: String
})

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema)

export default Invoice