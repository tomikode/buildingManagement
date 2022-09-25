import Button from "../Button"

const NoticeRecord = ({notice, onDelete, onEdit}) => {

   return (
    <>
        <h3>
            {notice.name}
            <Button color="red" text="DELETE" onClick={() => onDelete(notice.id)}/>
            <Button color="green" text="EDIT" onClick={() => onEdit(notice.id)}/>
        </h3>
        {notice.active
        ? "Active"
        : "Disabled"}
    </>
  )
}

export default NoticeRecord