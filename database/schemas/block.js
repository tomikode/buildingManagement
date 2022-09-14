import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
    name: String
})

const block = mongoose.models.Block || mongoose.model('Block', blockSchema)

export default block