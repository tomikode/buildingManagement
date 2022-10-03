import ContractRecord from "../rental/ContractRecord";

const ContractList = ({ contract, onDelete, onEdit, lUser }) => {
    let row_number = 0;
    return (
        <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Tenant</th>
                    <th>Landlord</th>
                    <th>Unit</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                    <th>Charge Rate</th>
                </tr>
            </thead>
            <tbody>
                {contract.map(
                    (user) =>
                        (lUser.type === "m" || lUser._id === user._id) && (
                            <ContractRecord
                                key={contract._id}
                                rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
                                contract={contract}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                withDelete={lUser.type === "m"}
                            />
                        ))}
            </tbody>
        </table>
    );
};

export default ContractList;