import UnitRecord from "../building_management/UnitRecord";

const UnitList = ({ units, users, blocks, onDelete, onEdit, loggedInUser }) => {
  let row_number = 0;
  return (
    <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Unit Number</th>
          <th>Tenant</th>
          <th>Landlord</th>
          <th>Block</th>
        </tr>
      </thead>
      <tbody>
        {units.map(
          (unit) =>
          <UnitRecord
          key={unit._id}
          rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
          unit={unit}
          users={users}
          blocks={blocks}
          onDelete={onDelete}
          onEdit={onEdit}
          withEdit={loggedInUser && loggedInUser.type === "m"}
          withDelete={loggedInUser && loggedInUser.type === "m"}
          />
        )}
      </tbody>
    </table>
  );
};

export default UnitList;
