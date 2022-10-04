import connect from "../../../database/connection.js";
import Block from "../../../database/schemas/block.js";

const getBlocks = async () => {
  const foundBlocks = await Block.find();
  if (foundBlocks) return { status: 201, body: { foundBlocks } };
  else return { status: 401, body: { error: "Shit the bed for Blocks ayy" } };
};

const saveBlock = async (req) => {
  const { _id, name} = req.body;
  if (_id) {
    const saveBlock = await Block.updateOne(
      { _id: [`${_id}`] },
      {name: `${name}`}
    );
    if (saveBlock) return { status: 201, body: { saveBlock } };
  } else {
    const saveBlock = await Block.create(
        {name: `${name}`}
    );
    if (saveBlock) return { status: 201, body: { saveBlock } };
  }
  return { status: 401, body: { error: "Shit the bed" } };
};

const deleteBlock = async (req) => {
  const { _id } = req.body;

  const foundBlock = await Block.findById({ _id });

  const deletedBlock = await Block.deleteOne({ _id });
  if (deletedBlock) return { status: 201, body: { deletedBlock } };
  else return { status: 401, body: { error: "Shit the bed for Blocks Ayy" } };
};

const blockHandler = async (req, res) => {
  const method = req.method;

  await connect().catch((err) => console.log(err));

  let result = { error: "You should call your Dad" };
  switch (method) {
    case "GET":
      result = await getBlocks();
      res.status(result.status).json(result.body);
      break;
    case "POST":
      result = await saveBlock(req);
      res.status(result.status).json(result.body);
      break;
    case "PATCH":
      result = await deleteBlock(req);
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default blockHandler;
