import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    content: String,
    postDate: Date,
})

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema)

export default Incident