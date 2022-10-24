import IncidentRecord from "./IncidentRecord";

const IncidentList = ({ incidents, onDelete, getUser, onEdit, loggedInUser }) => {
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
        {incidents?.map((incident) => (
          <IncidentRecord
            key={incident._id}
            rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
            incident={incident}
            onDelete={onDelete}
            onEdit={onEdit}
            getUser={getUser}
            withEdit={
              loggedInUser &&
              (loggedInUser._id === incident.user || loggedInUser.type === "m")
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default IncidentList;
