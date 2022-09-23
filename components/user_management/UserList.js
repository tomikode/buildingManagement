import UserRecord from "../user_management/UserRecord"

const UserList = ({users, onDisable, onDelete}) => {

  return (
    <>
        {users.map((user) => (
            <UserRecord key={user.id} user={user} onDisable={onDisable} onDelete={onDelete}/>)
        )}
    </>
  )

}

export default UserList