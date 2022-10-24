import WorkOrder from "../../database/schemas/workOrder";

export default async function del(req, res) {
	await WorkOrder.remove({});
	res.status(200).json({ msg: "done delete" });
}
