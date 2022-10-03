import connect from "../../database/connection.js";
import User from "../../database/schemas/user.js";

//add an access attempt to user's data
const addAccessAttempt = async (foundUser, result) => {
	const date = new Date();
	foundUser.accessAttempts.push(`${date.toUTCString()}|${result} attempt`);
	await foundUser.save();
};

//try to login by querying database for valid user
const tryLogin = async (req) => {
	const { email, password } = req.body;
	if (!email || !password)
		//if some credentials are missing
		return { status: 401, body: { error: "Invalid credentials" } };
	const foundUser = await User.findOne({ email }); //if user with email is found
	if (foundUser) {
		if (foundUser.password === password) {
			//add successful access attempt and respond with user and 201
			addAccessAttempt(req, foundUser, "Successful");
			return { status: 201, body: { foundUser } };
		} else {
			//add failed access attempt and respond with error and 401
			addAccessAttempt(req, foundUser, "Failed");
			return { status: 401, body: { error: "Invalid credentials" } };
		}
	} else return { status: 401, body: { error: "Invalid credentials" } }; //email did not match any user
};

const loginHandler = async (req, res) => {
	const method = req.method;
	console.log(method + " login");
	await connect().catch((err) => console.log(err)); //connect to database
	let result = { error: "Something went wrong" };
	switch (method) {
		case "POST": //only if POST request, process and query database
			result = await tryLogin(req);
			res.status(result.status).json(result.body);
			break;
		default:
			res.status(401).json(result);
			break;
	}
};

export default loginHandler;
