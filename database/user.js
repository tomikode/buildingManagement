import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    type: String,
})

const user = mongoose.models.User || mongoose.model('User', userSchema)

export default user