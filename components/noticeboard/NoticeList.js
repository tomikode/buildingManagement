import NoticeRecord from "../noticeboard/NoticeRecord"

const NoticeList = ({ notices, onDelete, onEdit }) => {
  return (
    <>
      {notices.map((notice) => (
        <UserRecord
          key={notice.id}
          notice={notice}
          onDelete={onDelete}
          onEdit={onEdit} />))
      }
    </>
  )

}

export default NoticeList