import NoticeRecord from "../noticeboard/NoticeRecord"

const NoticeList = ({ notices, onDelete, onEdit }) => {
  return (
    <>
      {notices.map((notice) => (
        <NoticeRecord
          key={notice._id}
          notice={notice}
          onDelete={onDelete}
          onEdit={onEdit} />))
      }
    </>
  )

}

export default NoticeList