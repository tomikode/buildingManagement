import Button from "../Button";

const UserRecord = ({ user, onDisable, onDelete, onEdit }) => {
  return (
    <>
      <h3>
        {user.firstName + " " + user.lastName + " " + user._id}
        <br />
        <Button color="red" text="DELETE" onClick={() => onDelete(user._id)} />
        <Button color="green" text="EDIT" onClick={() => onEdit(user._id)} />
      </h3>
    </>
  );
};

export default UserRecord;
