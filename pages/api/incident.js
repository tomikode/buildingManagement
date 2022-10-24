import connect from "../../database/connection";
import Incident from "../../database/schemas/incident";

//gets all incidents
const getIncidents = async () => {
	const incidents = await Incident.find({});
	return { status: 200, message: incidents };
};

//creates new incidents via post request
const createIncident = async (req) => {
	if (!req.body)
		return { status: 400, message: { error: "No resource details given" } };
	const newIncident = new Incident(req.body);
	await newIncident.save();
	return { status: 201, message: newIncident };
};

//api handler function, splits get and post requests
export default async function baseHandler(req, res) {
	const method = req.method;
	console.log(method + " Incident");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "GET":
			result = await getIncidents();
			res.status(result.status).json(result.message);
			break;
		case "POST":
			result = await createIncident(req);
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
