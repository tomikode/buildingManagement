import connect from "../../database/connection";
import User from "../../database/schemas/user";

const testHandler = async (req, res) => {
	connect().catch((err) => console.log(err));
	const users = await User.find({});
	const newUser = new User({ email: 'yeet' })
	const test = await newUser.save()
	console.log(test)
	res.status(200).json(users);
};

export default testHandler;
