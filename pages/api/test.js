import connect from "../../database/connection";
import User from "../../database/schemas/user";

const testHandler = async (req, res) => {
	connect().catch((err) => console.log(err));
	const users = await User.find({});
	res.status(200).json(users);
};

export default testHandler;
