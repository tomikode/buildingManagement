import Button from "./Button"

const UserRecord = ({name, onDisable}) => {

   return (
        <h3>
            {name}
            <Button color="red" text="DELETE" onClick={() => onDisable(name)}/>
        </h3>
  )
}

export default UserRecord