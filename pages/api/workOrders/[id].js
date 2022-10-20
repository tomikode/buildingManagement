import connect from "../../../database/connection";
import WorkOrder from "../../../database/schemas/workOrder";

//finds and updates a workOrder via put request
const updateWorkOrder = async (req) => {
	const workOrderId = req.query.id;
	const newDetails = req.body;
	if (!newDetails)
		return { status: 400, message: { error: "No new details provided" } };
	const workOrder = await WorkOrder.findByIdAndUpdate(
		workOrderId,
		newDetails,
		{
			new: true,
		}
	);
	if (!workOrder)
		return { status: 404, message: { error: "Resource not found" } };
	return { status: 200, message: workOrder };
};

//finds and deletes a workOrder via delete request
const deleteWorkOrder = async (req) => {
	const workOrderId = req.query.id;
	const workOrder = await WorkOrder.findByIdAndDelete(workOrderId);
	if (!workOrder)
		return { status: 404, message: { error: "Resource not found" } };
	return { status: 200, message: workOrder };
};

//handler function, requires id of object to be in the url
//e.g. api/baseAPI/1234
//this id can be retrieved via req.query.id
export default async function baseHandlerId(req, res) {
	const method = req.method;
	console.log(method + " workOrder");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "PUT":
			result = await updateWorkOrder(req);
			console.log(result);
			res.status(result.status).json(result.message);
			break;
		case "DELETE":
			result = await deleteWorkOrder(req);
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
