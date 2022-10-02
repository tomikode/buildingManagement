const UsersDropdown = ({ selectedUser, users, onChange }) => {
  return (
    <select value={selectedUser} onChange={onChange}>
      <option value=""></option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>{`${user.firstName} ${user.lastName}`}</option>
      ))}
    </select>
  );
};
export default UsersDropdown;
