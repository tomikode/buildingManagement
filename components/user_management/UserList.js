import UserRecord from "../user_management/UserRecord";

const UserList = ({ users, onDisable, onDelete, onEdit }) => {
  let row_number = 0;
  return (
    <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRecord
            key={user._id}
            rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
            user={user}
            onDisable={onDisable}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
