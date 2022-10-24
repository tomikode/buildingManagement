import Button from "../Button";

const MailRecord = ({
  mail,
  onDelete,
  onEdit,
  getUser,
  rowColor,
  withEdit,
}) => {
  var userName = "";
  if (mail.user) {
    let user = getUser(mail.user);
    if (user) {
      userName = user.firstName + " " + user.lastName;
    }
  }
  return (
    <tr style={{ backgroundColor: rowColor }}>
      <td style={{ padding: "1em 50px" }}>{mail.user && userName}</td>
      <td style={{ padding: "0 50px" }}>{mail.content}</td>
      <td style={{ backgroundColor: "white" }}>
        {withEdit && (
          <Button
            color="pink"
            text="DELETE"
            onClick={() => onDelete(mail._id)}
          />
        )}
       
      </td>
    </tr>
  );
};

export default MailRecord;
