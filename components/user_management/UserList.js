import UserRecord from "../user_management/UserRecord";

const UserList = ({ users, onDisable, onDelete, onEdit }) => {
  return (
    <>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Type</th>
        </tr>
        {users.map((user) => (
          <UserRecord
            key={user._id}
            user={user}
            onDisable={onDisable}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </table>
    </>
  );
};

export default UserList;
