import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: String
})

const test = mongoose.models.Test || mongoose.model('Test', testSchema)

export default test