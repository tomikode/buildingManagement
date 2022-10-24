import connect from "../../database/connection.js";
import Notice from "../../database/schemas/notice.js";

const getNotices = async () => {
  const foundNotices = await Notice.find();
  if (foundNotices) return { status: 201, body: { foundNotices } };
  else return { status: 401, body: { error: "Shit the bed" } };
};

const postNotice = async (req) => {
  const { _id, postDate, content, user } = req.body;
  const validContent = content !== "";

  if (!validContent) return { status: 401, body: { error: "Invalid content" } };
  if (_id) {
    if (user) {
      const newNotice = await Notice.updateOne(
        { _id: [`${_id}`] },
        { user: `${user}`, content: `${content}` }
      );
      if (newNotice) return { status: 201, body: { newNotice } };
    } else {
      const newNotice = await Notice.updateOne(
        { _id: [`${_id}`] },
        { content: `${content}` }
      );
      if (newNotice) return { status: 201, body: { newNotice } };
    }
  } else {
    const newNotice = await Notice.create({ content, user, postDate });
    if (newNotice) return { status: 201, body: { newNotice } };
  }
  return { status: 401, body: { error: "Shit the bed" } };
};

const deleteNotice = async (req) => {
  const { _id } = req.body;

  const foundUser = await Notice.findById({ _id });

  const deletedNotice = await Notice.deleteOne({ _id });
  if (deletedNotice) return { status: 201, body: { deletedNotice } };
  else return { status: 401, body: { error: "Shit the bed" } };
};

const noticeHandler = async (req, res) => {
  const method = req.method;

  await connect().catch((err) => console.log(err));

  let result = { error: "Something went horribly wrong" };
  switch (method) {
    case "GET":
      result = await getNotices();
      res.status(result.status).json(result.body);
      break;
    case "POST":
      result = await postNotice(req);
      res.status(result.status).json(result.body);
      break;
    case "PATCH":
      result = await deleteNotice(req);
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default noticeHandler;
