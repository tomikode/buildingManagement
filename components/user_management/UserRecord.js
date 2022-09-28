import Button from "../Button";

const UserRecord = ({ user, onDisable, onDelete, onEdit }) => {
  return (
    <>
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.type}</td>
        <td>
          <Button
            color="pink"
            text="DELETE"
            onClick={() => onDelete(user._id)}
          />
        </td>
        <td>
          <Button color="papayawhip" text="EDIT" onClick={() => onEdit(user._id)} />
        </td>
      </tr>
    </>
  );
};

export default UserRecord;
