import UserRecord from "../user_management/UserRecord";

// Root user cannot be deleted
const ROOT_USER = "6322cc0300eb529adf305a78";

/*
  User list is displayed as a table. It produces a list of rows
  from the provided user list prop 'users'

  on...() are method props passed from parent. lUser is 'logged in user'
*/

const UserList = ({ users, onDisable, onDelete, onEdit, lUser }) => {
  let row_number = 0;
  return (
    <div>
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
                  withDelete={lUser.type === "m" && user._id != ROOT_USER}
                />
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
