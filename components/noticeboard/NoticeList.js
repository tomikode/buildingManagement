import NoticeRecord from "../noticeboard/NoticeRecord";

const NoticeList = ({ notices, onDelete, getUser, onEdit, loggedInUser }) => {
  let row_number = 0;
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Poster</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <NoticeRecord
            key={notice._id}
            rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
            notice={notice}
            onDelete={onDelete}
            onEdit={onEdit}
            getUser={getUser}
            withEdit={
              loggedInUser &&
              (loggedInUser._id === notice.user || loggedInUser.type === "m")
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default NoticeList;
