import connect from "../../database/connection";
import User from "../../database/schemas/user";


export default async function (req, res) {
    connect().catch((err) => console.log(err));
    const users = await User.find({})
    res.status(200).json(users)
}