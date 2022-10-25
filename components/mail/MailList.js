import MailRecord from "./MailRecord";

const MailList = ({ mails, onDelete, getUser, onEdit, loggedInUser }) => {
  let row_number = 0;
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Send by</th>
          <th>Massage Description</th>
        </tr>
      </thead>
      <tbody>
        {mails.map((mail) => (
          <MailRecord
            key={mail._id}
            rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
            mail={mail}
            onDelete={onDelete}
            onEdit={onEdit}
            getUser={getUser}
            withEdit={
              loggedInUser &&
              (loggedInUser._id === mail.user || loggedInUser.type === "m")
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default MailList;
