import Button from "../Button"

const UserRecord = ({user, onDisable, onDelete, onEdit}) => {

   return (
    <>
        <h3>
            {user.name}
            <Button color="blue" text="DISABLE" onClick={() => onDisable(user.id)}/>
            <Button color="red" text="DELETE" onClick={() => onDelete(user.id)}/>
            <Button color="green" text="EDIT" onClick={() => onEdit(user.id)}/>
        </h3>
        {user.active
        ? "Active"
        : "Disabled"}
    </>
  )
}

export default UserRecord