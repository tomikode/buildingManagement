import connect from "../../database/connection.js";
import User from "../../database/schemas/user.js";

const addAccessAttempt = async (req, foundUser, result) => {
	const date = new Date();
	foundUser.accessAttempts.push(`${date.toUTCString()}|${result} attempt`);
	await foundUser.save();
};

const tryLogin = async (req) => {
	const { email, password } = req.body;
	if (!email || !password)
		return { status: 401, body: { error: "Invalid credentials" } };
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		if (foundUser.password === password) {
			addAccessAttempt(req, foundUser, "Successful");
			return { status: 201, body: { foundUser } };
		} else {
			addAccessAttempt(req, foundUser, "Failed");
			return { status: 401, body: { error: "Invalid credentials" } };
		}
	} else return { status: 401, body: { error: "Invalid credentials" } };
};

const loginHandler = async (req, res) => {
	const method = req.method;
	console.log(method + " login");
	await connect().catch((err) => console.log(err));
	let result = { error: "Something went wrong" };
	switch (method) {
		case "POST":
			result = await tryLogin(req);
			res.status(result.status).json(result.body);
			break;
		default:
			res.status(401).json(result);
			break;
	}
};

export default loginHandler;
