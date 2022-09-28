import Button from "../Button";

const NoticeRecord = ({ notice, onDelete, onEdit, getUser, rowColor }) => {
  var userName = "";
  if (notice.user) {
    let user = getUser(notice.user);
    if (user) {
      userName = user.firstName + " " + user.lastName;
    }
  }
  return (
    <tr style={{ backgroundColor: rowColor }}>
      <td style={{ padding: "0 50px" }}>{notice.user && userName}</td>
      <td style={{ padding: "0 50px" }}>{notice.content}</td>
      <td style={{ backgroundColor: "white" }}>
        <Button
          color="pink"
          text="DELETE"
          onClick={() => onDelete(notice._id)}
        />
        <Button
          color="papayawhip"
          text="EDIT"
          onClick={() => onEdit(notice._id)}
        />
      </td>
    </tr>
  );
};

export default NoticeRecord;
