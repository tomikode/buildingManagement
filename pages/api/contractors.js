import connect from "../../database/connection";
import User from "../../database/schemas/user";

//gets all users
const getContractors = async () => {
	let contractors = await User.find({ type: "c" });
	contractors = contractors.map((cont) => {
		return {
			_id: cont._id.toString(),
			firstName: cont.firstName,
			lastName: cont.lastName,
			email: cont.email,
			phone: cont.phone
		};
	});
	return { status: 200, message: contractors };
};

//api handler function, splits get and post requests
export default async function contractorHandler(req, res) {
	const method = req.method;
	console.log(method + " Contractor");
	connect().catch((err) => console.log(err));
	let result = { error: "Invalid request" };
	switch (method) {
		case "GET":
			result = await getContractors();
			res.status(result.status).json(result.message);
			break;
		default:
			res.status(400).json(result);
			break;
	}
}
