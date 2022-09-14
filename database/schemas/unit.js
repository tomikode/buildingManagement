import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
	tenant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "User",
    },
    block: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Block",
    },
    unitNumber: Number,
});

const unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

export default unit;
