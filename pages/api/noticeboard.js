import connect from "../../database/connection.js";
import Notice from "../../database/schemas/notice.js";

const getNotices = async () => {
  const foundNotices = await Notice.find();
  if (foundNotices) return { status: 201, body: { foundNotices } };
  else return { status: 401, body: { error: "Shit the bed" } };
};

const noticeHandler = async (req, res) => {
  const method = req.method;
  console.log("Request for Notice data by", method);

  await connect().catch((err) => console.log(err));

  let result = { error: "Something went wrong" };
  switch (method) {
    case "POST":
      result = await getNotices();
	  console.log("Here's the body:", result.body)
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default noticeHandler;
