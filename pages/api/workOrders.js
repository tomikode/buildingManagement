import connect from "../../database/connection";
import WorkOrder from "../../database/schemas/workOrder";
import Unit from "../../database/schemas/unit";
import User from "../../database/schemas/user";

//gets all workOrders
const getWorkOrders = async () => {
	const workOrders = await WorkOrder.find({})
		.populate("unit")
		.populate("submissionUser")
		.populate("contractor");
	return { status: 200, message: workOrders };
};

//creates new workOrders via post request
const createWorkOrder = async (req) => {
	if (!req.body)
		return { status: 400, message: { error: "No resource details given" } };
	const newWorkOrder = new WorkOrder(req.body);
	await newWorkOrder.save();
	return { status: 201, message: newWorkOrder };
};

//api handler function, splits get and post requests
export default async function workOrderHandler(req, res) {
	const method = req.method;
	console.log(method + " Work Order");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "GET":
			result = await getWorkOrders();
			res.status(result.status).json(result.message);
			break;
		case "POST":
			result = await createWorkOrder(req);
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
