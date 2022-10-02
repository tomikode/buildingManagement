import BlockRecord from "./BlockRecord";

const BlockList = ({ blocks, onDelete, onEdit, loggedInUser }) => {
  let row_number = 0;
  return (
    <table style={{ borderSpacing: "50px 0", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Block Name</th>
        </tr>
      </thead>
      <tbody>
        {blocks.map(
          (block) =>
          <BlockRecord
          key={block._id}
          rowColor={++row_number % 2 === 0 ? "white" : "Gainsboro"}
          block={block}
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

export default BlockList;
