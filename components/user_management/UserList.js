import UserRecord from "../user_management/UserRecord"

const UserList = ({users, onDisable, onDelete, onEdit}) => {

  return (
    <>
        {users.map((user) => (
            <UserRecord
            key={user._id}
            user={user}
            onDisable={onDisable}
            onDelete={onDelete}
            onEdit={onEdit}/>))
        }
    </>
  )

}

export default UserList