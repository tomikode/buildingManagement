import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    dateSent: Date,
    content: String,
})

const Mail = mongoose.models.Mail || mongoose.model('Mail', mailSchema)

export default Mail