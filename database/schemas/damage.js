import mongoose from "mongoose";

const damageSchema = new mongoose.Schema({
	block: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Block",
	},
	unit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Unit",
	},
	description: String,
	submitDate: Date,
});

const Damage = mongoose.models.Damage || mongoose.model("Damage", damageSchema);

export default Damage;
