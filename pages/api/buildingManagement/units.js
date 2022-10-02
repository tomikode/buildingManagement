import connect from "../../../database/connection.js";
import Unit from "../../../database/schemas/unit.js";

const getUnits = async () => {
  const foundUnits = await Unit.find();
  if (foundUnits) return { status: 201, body: { foundUnits } };
  else return { status: 401, body: { error: "Shit the bed for Units ayy" } };
};

const getUnitsByBlock = async (blockName) => {
  const foundUnits = await Unit.find({block: blockName});
  if (foundUnits) return { status: 201, body: { foundUnits } };
  else return { status: 401, body: { error: "Shit the bed for Units ayy" } };
};

const saveUnit = async (req) => {
  const { _id, tenant, landlord, block, unitNumber} = req.body;
  if (_id) {
    const saveUnit = await Unit.updateOne(
      { _id: [`${_id}`] },
      { tenant: `${tenant}`, landlord: `${landlord}`, block: `${block}` , unitNumber: `${unitNumber}`}
    );
    if (saveUnit) return { status: 201, body: { saveUnit } };
  } else {
    const saveUnit = await Unit.create(
      { tenant: `${tenant}`, landlord: `${landlord}`, block: `${block}` , unitNumber: `${unitNumber}`}
    );
    if (saveUnit) return { status: 201, body: { saveUnit } };
  }
  return { status: 401, body: { error: "Shit the bed" } };
};

const deleteUnit = async (req) => {
  const { _id } = req.body;

  const foundUnit = await Unit.findById({ _id });

  const deletedUnit = await Unit.deleteOne({ _id });
  if (deletedUnit) return { status: 201, body: { deletedUnit } };
  else return { status: 401, body: { error: "Shit the bed for Units Ayy" } };
};

const unitHandler = async (req, res) => {
  const method = req.method;

  await connect().catch((err) => console.log(err));

  let result = { error: "You should call your Dad" };
  switch (method) {
    case "GET":
      if (req.query.blockName) {
        result = await getUnitsByBlock(req.query.blockName);
      } else {
        result = await getUnits();
      }
      res.status(result.status).json(result.body);
      break;
    case "POST":
      result = await saveUnit(req);
      res.status(result.status).json(result.body);
      break;
    case "PATCH":
      result = await deleteUnit(req);
      res.status(result.status).json(result.body);
      break;
    default:
      res.status(401).json(result);
      break;
  }
};

export default unitHandler;
