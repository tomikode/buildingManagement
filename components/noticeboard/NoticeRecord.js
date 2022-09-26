import Button from "../Button"

const NoticeRecord = ({ notice, onDelete, onEdit }) => {

  return (
    <>
      <h3>
        {notice.content}
        <Button color="red" text="DELETE" onClick={() => onDelete(notice._id)} />
        <Button color="green" text="EDIT" onClick={() => onEdit(notice._id)} />
      </h3>
      {"Notice ID: " + notice._id}
      <br />
      {"Posted on: " + notice.postDate}
      <br />
      {"Poster ID: " + notice.user}
    </>
  )
}

export default NoticeRecord