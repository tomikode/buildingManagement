import InvoiceRecord from "../invoice/InvoiceRecord";

const InvoiceList = ({ invoices, onDelete, getUser, onEdit }) => {
    let row_number = 0;
    return (
        <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Job</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {invoices?.map((invoice) => (
                    <InvoiceRecord
                        key={contract._id}
                        rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
                        invoice={invoice}
                        onDelete={onDelete}
                        getUser={getUser}
                        onEdit={onEdit}
                        withEdit={
                            loggedInUser &&
                            (loggedInUser._id === notice.user || loggedInUser.type === "m")
                        }
                    />
                ))}
            </tbody>
        </table>
    );
};

export default InvoiceList;