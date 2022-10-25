import ContractorRecord from "../contractor/ContractorRecord";

const ContractorList = ({ contractors, lUser }) => {
  let row_number = 0;
  return (
    <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contractors.map(
          (user) =>
            (lUser.type === "m" || lUser._id === user._id) && (
              <ContractorRecord
                key={user._id}
                rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
                user={user}
              />
            )
        )}
      </tbody>
    </table>
  );
};

export default ContractorList;
