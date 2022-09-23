import { useState } from "react"
import UserRecord from "../components/UserRecord"

const UserList = () => {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Atilla Bongs",
            type: "p",
            active: false,
        },
        {
            id: 2,
            name: "Craig Dunsfield",
            type: "m",
            active: true,
        },
        {
            id: 3,
            name: "Your Mum",
            type: "t",
            active: true,
        },
    ])

  return (
    <>
        {users.map((user) => (
            <UserRecord key={user.id} name={user.name} />)
        )}
    </>
  )

}

export default UserList