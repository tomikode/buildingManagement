import connect from "../../database/connection";
import User from "../../database/schemas/user";

const tryLogin = async (req) => {
    const { email, password } = req.body
    if (!email || !password)
        return { status: 401, body: {error: "Invalid credentials"} }
    const foundUser = await User.findOne({ email, password })
    console.log(foundUser)
    if (foundUser)
        return { status: 201, body: { foundUser }}
    else 
        return { status: 401, body: {error: "Invalid credentials"} }
}

export default async function (req, res){
    const method = req.method
    console.log(method + " login");
	connect().catch((err) => console.log(err));
	let result = { error: "Something went wrong" }
    switch (method){
        case "POST":
            result = await tryLogin(req)
            res.status(result.status).json(result.body)
            break
        default:
            res.status(401).json(result)
            break
    }
}