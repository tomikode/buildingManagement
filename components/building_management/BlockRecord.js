import Button from "../Button";

const BlockRecord = ({
  block,
  onDelete,
  onEdit,
  rowColor,
  withDelete,
}) => {
  return (
    <>
      <tr style={{ backgroundColor: rowColor }}>
        <td style={{ padding: "0 50px" }}>{block.name}</td>
        <td style={{ backgroundColor: "white" }}>
          {withDelete && (
            <Button
              color="pink"
              text="DELETE"
              onClick={() => onDelete(block._id)}
            />
          )}
          <Button
            color="papayawhip"
            text="EDIT"
            onClick={() => onEdit(block._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default BlockRecord;
