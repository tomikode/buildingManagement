import connect from "../../database/connection";
import Contract from "../../database/schemas/contract";

const getContract = async () => {
    const contracts = await Contract.find({})
    return{ status: 200, message: workOrders};
};

const createContract = async (req) => {
    if(!req.body){
        return { status: 400, message: { error: "No resource details given" } };
    }
    const newContract = new Contract(req.body);
    await newContract.save();
    return{ status: 201, message: newContract};
};

export default async function contractHandler(req, res) {
    const method = req.method;
    console.log(method + " Contract");
    connect().catch((err) => console.log(err));
    let result = {error: "Invalid request"};
    switch (method) {
        case "GET":
            result = await getContract();
            res.status(result.status).json(result.message);
            break;
        case "POST":
            result = await createContract(req);
            res.status(result.status).json(result.message);
            break;
        default:
            res.status(400).json(result);
            break;
    }
}