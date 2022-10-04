import ContractRecord from "../rental/ContractRecord";

const ContractList = ({ contracts, onDelete, getUser, onEdit }) => {
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
                {contracts?.map((contract) => (
                    <ContractRecord
                        key={contract._id}
                        rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
                        contract={contract}
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

export default ContractList;