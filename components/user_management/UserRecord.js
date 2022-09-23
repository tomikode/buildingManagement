import Button from "../Button"

const UserRecord = ({user, onDisable, onDelete}) => {

   return (
    <>
        <h3>
            {user.name}
            <Button color="blue" text="DISABLE" onClick={() => onDisable(user.id)}/>
            <Button color="red" text="DELETE" onClick={() => onDelete(user.id)}/>
        </h3>
        {user.active
        ? "Active"
        : "Disabled"}
    </>
  )
}

export default UserRecord