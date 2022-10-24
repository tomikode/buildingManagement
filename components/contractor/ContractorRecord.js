import Button from "../Button";

const ContractorRecord = ({
  user,
  rowColor,
}) => {
  return (
    <>
      <tr style={{ backgroundColor: rowColor }}>
        <td style={{ padding: "0 50px" }}>{user.firstName}</td>
        <td style={{ padding: "0 50px" }}>{user.lastName}</td>
        <td style={{ padding: "1em 50px" }}>{user.email}</td>
        <td style={{ padding: "0 50px" }}>{user.phone}</td>
      </tr>
    </>
  );
};

export default ContractorRecord;
