import connect from "../../database/connection.js";
import Notice from "../../database/schemas/notice.js";
import User from "../../database/schemas/user.js";

const getNotice = async (req) => {
  const { id } = req.body;
  console.log("Notice this ID", id);

  if (!id) return { status: 401, body: { error: "Invalid notice ID" } };

  // No notices exists, so how to look them up?
  //const foundNotice = await Notice.findOne({ id });
  const foundNotice = await User.find();
  console.log("Notice this notice", foundNotice);

  if (foundNotice) return { status: 201, body: { foundNotice } };
  else return { status: 401, body: { error: "Invalid credentials" } };
};

const noticeHandler = async (req, res) => {
  const method = req.method;
  console.log("Request for Noticeboard data by", method);

  await connect().catch((err) => console.log(err));
  console.log("Forgotten");

  let result = { error: "Something went wrong" };
  switch (method) {
    case "POST":
      console.log("Unnoticed");
      result = await getNotice(req);
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default noticeHandler;
