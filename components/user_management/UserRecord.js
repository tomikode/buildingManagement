import Button from "../Button";

const UserRecord = ({ user, onDisable, onDelete, onEdit, rowColor }) => {
  return (
    <>
      <tr style={{ backgroundColor: rowColor}}>
        <td style={{ padding: "0 50px" }}>{user.firstName}</td>
        <td style={{ padding: "0 50px" }}>{user.lastName}</td>
        <td style={{ padding: "0 50px" }}>{user.email}</td>
        <td style={{ padding: "0 50px" }}>{user.phone}</td>
        <td style={{ textAlign: "center" }}>{user.type}</td>
        <td style={{backgroundColor: "white"}}>
          <Button
            color="pink"
            text="DELETE"
            onClick={() => onDelete(user._id)}
          />
          <Button
            color="papayawhip"
            text="EDIT"
            onClick={() => onEdit(user._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default UserRecord;
