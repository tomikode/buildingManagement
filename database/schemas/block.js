import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
    name: String
})

const Block = mongoose.models.Block || mongoose.model('Block', blockSchema)

export default Block