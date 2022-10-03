import Button from "../Button";

const ContractRecord = ({
  contract,
  onDelete,
  onEdit,
  rowColor,
  withDelete,
}) => {

  return (
    <>
      <tr style={{ backgroundColor: rowColor }}>
        <td style={{ padding: "0 50px" }}>{contract.tenant}</td>
        <td style={{ padding: "0 50px" }}>{contract.landlord}</td>
        <td style={{ padding: "0 50px" }}>{contract.unit}</td>
        <td style={{ padding: "0 50px" }}>{contract.startDate}</td>
        <td style={{ padding: "0 50px" }}>{contract.endDate}</td>
        <td style={{ padding: "0 50px" }}>{contract.totalPrice}</td>
        <td style={{ padding: "0 50px" }}>{contract.chargeRate}</td>
        <td style={{ backgroundColor: "white" }}>
          {withDelete && (
            <Button
              color="pink"
              text="DELETE"
              onClick={() => onDelete(contract._id)}
            />
          )}
          <Button
            color="papayawhip"
            text="EDIT"
            onClick={() => onEdit(contract._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default ContractRecord;