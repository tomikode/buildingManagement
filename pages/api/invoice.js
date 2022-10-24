import connect from "../../database/connection.js";
import Invoice from "../../database/schemas/invoice.js";

const getInvoice = async () => {
    const foundInvoice = await Invoice.find({});
    if (foundInvoice) return { status: 200, body: { foundInvoice } };
    else return { status: 401, body: { error: "Something Did Not Work" } };
};

const saveInvoice = async (req) => {
    const {job, amount, date, description } = req.body;

    const saveInvoice = await Invoice.create({
        job,
        amount,
        date,
        description,
    });
    if (saveInvoice) return { status: 201, body: { saveInvoice } };

};

const deleteInvoice = async (req) => {
    const { _id } = req.body;

    const foundInvoice = await Invoice.findById({ _id });

    const deletedInvoice = await Invoice.deleteOne({ _id });
    if (deletedInvoice) return { status: 201, body: { deletedInvoice } };
    else return { status: 401, body: { error: "Something broke" } };
};

const invoiceHandler = async (req, res) => {
    const method = req.method;

    await connect().catch((err) => console.log(err));

    let result = { error: "Looks like we hit an iceberg" };
    switch (method) {
        case "GET":
            result = await getInvoice();
            res.status(result.status).json(result.body);
            break;
        case "POST":
            result = await saveInvoice(req);
            res.status(result.status).json(result.body);
            break;
        case "PATCH":
            result = await deleteInvoice(req);
            res.status(result.status).json(result.body);
            break;
        default:
            res.status(401).json(result);
            break;
    }
};

export default invoiceHandler;