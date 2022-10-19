import mongoose from "mongoose";

const workOrderSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Unit",
	},
	submissionUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	contractor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	description: String,
	response: String,
	workDate: Date,
	status: String,
});

const WorkOrder =
	mongoose.models.WorkOrder || mongoose.model("WorkOrder", workOrderSchema);

export default WorkOrder;
