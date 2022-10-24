import UserRecord from "../user_management/UserRecord";

// Root user cannot be deleted
const ROOT_USER = "6322cc0300eb529adf305a78";

const UserList = ({ users, onDisable, onDelete, onEdit, lUser }) => {
  let row_number = 0;
  return (
    <table
      style={{
        borderSpacing: "50px 0",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Type</th>
        </tr>
      </thead>

      {/* Show each individual user on its own row iteratively */}
      <tbody>
        {users.map(
          (user) =>
            (lUser.type === "m" || lUser._id === user._id) && (
              <UserRecord
                key={user._id}
                rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
                user={user}
                onDisable={onDisable}
                onDelete={onDelete}
                onEdit={onEdit}
                // Do not make delete available if root user
                withDelete={lUser.type === "m" && user._id != ROOT_USER }
              />
            )
        )}
      </tbody>
    </table>
  );
};

export default UserList;
