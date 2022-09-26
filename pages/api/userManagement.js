import connect from "../../database/connection.js";
import User from "../../database/schemas/user.js";

const getUsers = async () => {
  const foundUsers = await User.find();
  if (foundUsers) return { status: 201, body: { foundUsers } };
  else return { status: 401, body: { error: "Shit the bed" } };
};

const userHandler = async (req, res) => {
  const method = req.method;
  console.log("Request for User data by", method);

  await connect().catch((err) => console.log(err));

  let result = { error: "Something went wrong" };
  switch (method) {
    case "POST":
      result = await getUsers();
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default userHandler;
