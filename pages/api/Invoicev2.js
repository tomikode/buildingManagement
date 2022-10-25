import connect from "../../database/connection";
import Invoice from "../../database/schemas/invoice";

const getInvoice = async () => {
    const invoices = await Invoice.find({})
                .populate("user");
    return{ status: 200, message: workOrders};
};

const createInvoice = async (req) => {
    if(!req.body){
        return { status: 400, message: { error: "No resource details given" } };
    }
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    return{ status: 201, message: newInvoice};
};

export default async function invoiceHandler(req, res) {
    const method = req.method;
    console.log(method + " Invoice");
    connect().catch((err) => console.log(err));
    let result = {error: "Invalid request"};
    switch (method) {
        case "GET":
            result = await getInvoice();
            res.status(result.status).json(result.message);
            break;
        case "POST":
            result = await createInvoice(req);
            res.status(result.status).json(result.message);
            break;
        default:
            res.status(400).json(result);
            break;
    }
}