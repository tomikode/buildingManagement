import connect from "../../../database/connection";
import User from "../../../database/schemas/user";

//finds and updates a user via put request
const updateUser = async (req) => {
	const userId = req.query.id;
	const newDetails = req.body;
	if (!newDetails)
		return { status: 400, message: { error: "No new details provided" } };
	const user = await User.findByIdAndUpdate(userId, newDetails, {
		new: true,
	});
	if (!user) return { status: 404, message: { error: "Resource not found" } };
	return { status: 200, message: user };
};

//finds and deletes a user via delete request

const deleteUser = async (req) => {
	const userId = req.query.id;
	const user = await User.findByIdAndDelete(userId);
	if (!user) return { status: 404, message: { error: "Resource not found" } };
	return { status: 200, message: user };
};

//handler function, requires id of object to be in the url
//e.g. api/baseAPI/1234
//this id can be retrieved via req.query.id
export default async function (req, res) {
	const method = req.method;
	console.log(method + " user");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "PUT":
			result = await updateUser(req);
			console.log(result);
			res.status(result.status).json(result.message);
			break;
		case "DELETE":
			result = await deleteUser(req);
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
