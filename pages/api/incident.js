import connect from "../../database/connection";
import Incident from "../../database/schemas/incident";

//Get incidents from backend server
//In this case incident schemas under database
//If someone create a damage report then it store in database using incident schemas and it creates an id

const getIncidents = async () => {
	const foundIncidents = await Incident.find();
	if (foundIncidents) return { status: 201, body: { foundIncidents } };
	else return { status: 401, body: { error: "Shit the bed" } };
  };

  //User create a damage report and send it
  //It store into database like adding incidents one by one
  
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

  //deleting incident from database
  
  const deleteIncident = async (req) => {
	const { _id } = req.body;
  
	const foundUser = await Incident.findById({ _id });
  
	const deletedIncident = await Incident.deleteOne({ _id });
	if (deletedIncident) return { status: 201, body: { deletedIncident } };
	else return { status: 401, body: { error: "Shit the bed" } };
  };

  //handle incident using switch method
  //three cases are used where GET means get incident from database, POST means add/put the incident content in databas under separate id
  //PATCH means delete incident from database
  
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
  