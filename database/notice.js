import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    postDate: Date,
})

const notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema)

export default notice