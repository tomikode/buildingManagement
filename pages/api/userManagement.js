import connect from "../../database/connection.js";
import User from "../../database/schemas/user.js";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";

const getUsers = async () => {
  //   const userCtx = useContext(UserContext);
  //   console.log("userCtx", userCtx);

  const foundUsers = await User.find();
  if (foundUsers) return { status: 201, body: { foundUsers } };
  else return { status: 401, body: { error: "Shit the bed" } };
};

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// console.log(validateEmail("my email is anystring@anystring.any")); // true

// console.log(validateEmail("my email is anystring@anystring .any")); // false

const saveUser = async (req) => {
  const { _id, firstName, lastName, email, password, password2, phone, type } =
    req.body;
  const validEmail = validateEmail(email);
  const validPassword = password !== "";
  const passwordsMatch = password === password2;

  if (!validEmail) return { status: 401, body: { error: "Invalid Email" } };
  if (!validPassword)
    return { status: 401, body: { error: "Invalid password" } };
  if (!passwordsMatch)
    return { status: 401, body: { error: "Mismatched passwords" } };

  if (_id) {
    const saveUser = await User.updateOne(
      { _id: [`${_id}`] },
      {
        firstName,
        lastName,
        email,
        password,
        phone,
        type,
      }
    );
    if (saveUser) return { status: 201, body: { saveUser } };
  } else {
    const saveUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      type,
    });
    if (saveUser) return { status: 201, body: { saveUser } };
  }
  return { status: 401, body: { error: "Error" } };
};

const deleteUser = async (req) => {
  const { _id } = req.body;

  const foundUser = await User.findById({ _id });

  const deletedUser = await User.deleteOne({ _id });
  if (deletedUser) return { status: 201, body: { deletedUser } };
  else return { status: 401, body: { error: "Error" } };
};

const userHandler = async (req, res) => {
  const method = req.method;

  await connect().catch((err) => console.log(err));

  let result = { error: "Default error" };
  switch (method) {
    case "GET":
      result = await getUsers();
      res.status(result.status).json(result.body);
      break;
    case "POST":
      result = await saveUser(req);
      res.status(result.status).json(result.body);
      break;
    case "PATCH":
      result = await deleteUser(req);
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default userHandler;
