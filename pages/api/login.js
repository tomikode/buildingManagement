import connect from "../../database/connection";
import User from "../../database/schemas/user";

const tryLogin = async (req) => {
    const { email, password } = req.body
    const foundUser = await User.findOne({ email, password })
    if (foundUser){
        return foundUser
    }
    return { error: "Invalid credentials" }
}

export default async function (req, res){
    const method = req.method
    console.log(method + " login");
	connect().catch((err) => console.log(err));
	let result = { error: "Something went wrong" }
    switch (method){
        case "POST":
            result = tryLogin()
            if (result)
                res.status(201).json(result)
            else
                res.status(401).json(result)
            break;
        default:
            res.status(401).json(result)
    }
}