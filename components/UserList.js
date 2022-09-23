import UserRecord from "../components/UserRecord"

const UserList = ({users, onDisable}) => {

  return (
    <>
        {users.map((user) => (
            <UserRecord key={user.id} name={user.name} onDisable={onDisable}/>)
        )}
    </>
  )

}

export default UserList