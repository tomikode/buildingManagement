import connect from "../../database/connection";
import Incident from "../../database/schemas/incident";

const getIncidents = async () => {
	const foundIncidents = await Incident.find();
	if (foundIncidents) return { status: 201, body: { foundIncidents } };
	else return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const postIncident = async (req) => {
	const { _id, postDate, content, user } = req.body;
	if (_id) {
	  if (user) {
		const newIncident = await Incident.updateOne(
		  { _id: [`${_id}`] },
		  { user: `${user}`, content: `${content}` }
		);
		if (newIncident) return { status: 201, body: { newIncident } };
	  } else {
		const newIncident = await Incident.updateOne(
		  { _id: [`${_id}`] },
		  { content: `${content}` }
		);
		if (newIncident) return { status: 201, body: { newIncident } };
	  }
	} else {
	  const newIncident = await Incident.create({ content, user, postDate });
	  if (newIncident) return { status: 201, body: { newIncident} };
	}
	return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const deleteIncident = async (req) => {
	const { _id } = req.body;
  
	const foundUser = await Incident.findById({ _id });
  
	const deletedIncident = await Incident.deleteOne({ _id });
	if (deletedIncident) return { status: 201, body: { deletedIncident } };
	else return { status: 401, body: { error: "Shit the bed" } };
  };
  
  const incidentHandler = async (req, res) => {
	const method = req.method;
  
	await connect().catch((err) => console.log(err));
  
	let result = { error: "Something went horribly wrong" };
	switch (method) {
	  case "GET":
		result = await getIncidents();
		res.status(result.status).json(result.body);
		break;
	  case "POST":
		result = await postIncident(req);
		res.status(result.status).json(result.body);
		break;
	  case "PATCH":
		result = await deleteIncident(req);
		res.status(result.status).json(result.body);
		break;
	  default:
		res.status(401).json(result);
		break;
	}
  };
  
  export default incidentHandler;
  