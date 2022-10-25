import Button from "../Button";
import React, { useState } from "react";

const IncidentRecord = ({
  incident,
  onDelete,
  onEdit,
  getUser,
  rowColor,
  withEdit,
}) => {
  var userName = "";
  if (incident.user) {
    let user = getUser(incident.user);
    if (user) {
      userName = user.firstName + " " + user.lastName;
    }
  }
  const [approved, setApproved] = useState(false)
  return (
    <tr style={{ backgroundColor: rowColor }}>
      <td style={{ padding: "1em 50px" }}>{incident.user && userName}</td>
      <td style={{ padding: "0 50px" }}>{incident.content}</td>
      <td style={{ backgroundColor: "white" }}>
        {withEdit && (
          <Button
            color="pink"
            text="DELETE"
            onClick={() => onDelete(incident._id)}
          />
        )}
        {withEdit && approved ? <h2>Approved</h2> :
          <Button
            color="papayawhip"
            text="Approve pending"
            onClick={() => setApproved(true)}
          />
        }
      </td>
    </tr>
  );
};

export default IncidentRecord;
