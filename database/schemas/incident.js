import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  
    content: String,
    postDate: Date,
})

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema)

export default Incident