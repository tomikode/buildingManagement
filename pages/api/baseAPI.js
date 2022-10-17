import connect from "../../database/connection";
import User from "../../database/schemas/user";

//gets all users
const getUsers = async () => {
	const users = await User.find({});
	return { status: 200, message: users };
};

//creates new users via post request
const createUser = async (req) => {
	if (!req.body)
		return { status: 400, message: { error: "No resource details given" } };
	const newUser = new User(req.body);
	await newUser.save();
	return { status: 201, message: newUser };
};

//api handler function, splits get and post requests
export default async function baseHandler(req, res) {
	const method = req.method;
	console.log(method + " User");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "GET":
			result = await getUsers();
			res.status(result.status).json(result.message);
			break;
		case "POST":
			result = await createUser(req);
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
