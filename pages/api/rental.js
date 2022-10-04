import connect from "../../database/connection.js";
import Contract from "../../database/schemas/contract.js";

const getContract = async () => {
    const foundContract = await Contract.find();
    if (foundContract) return { status: 201, body: { foundContract } };
    else return { status: 401, body: { error: "Something Did Not Work" } };
};

const saveContract = async (req) => {
    const { _id, tenant, landlord, unit, startDate, endDate, totalPrice, chargeRate } = req.body;
    if (_id) {
        const saveContract = await Contract.updateOne(
            { _id: [`${_id}`] },
            {
                tenant,
                landlord,
                unit,
                startDate,
                endDate,
                totalPrice,
                chargeRate,
            }
        );
        if (saveUser) return { status: 201, body: { saveContract } };
    } else {
        const saveContract = await Contract.create({
            tenant,
            landlord,
            unit,
            startDate,
            endDate,
            totalPrice,
            chargeRate,
        });
        if (saveContract) return { status: 201, body: { saveContract } };
    }
    return { status: 401, body: { error: "Something Broke" } };
};

const deleteContract = async (req) => {
    const { _id } = req.body;

    const foundContract = await Contract.findById({ _id });

    const deletedContract = await Contract.deleteOne({ _id });
    if (deletedContract) return { status: 201, body: { deletedContract } };
    else return { status: 401, body: { error: "Something broke" } };
};

const contractHandler = async (req, res) => {
    const method = req.method;

    await connect().catch((err) => console.log(err));

    let result = { error: "Looks like we hit an iceberg" };
    switch (method) {
        case "GET":
            result = await getContract();
            res.status(result.status).json(result.body);
            break;
        case "POST":
            result = await saveContract(req);
            res.status(result.status).json(result.body);
            break;
        case "PATCH":
            result = await deleteContract(req);
            res.status(result.status).json(result.body);
            break;
        default:
            res.status(401).json(result);
            break;
    }
};

export default contractHandler;