import Button from "../Button";

const InvoiceRecord = ({
  invoice,
  onDelete,
  onEdit,
  rowColor,
  withDelete,
}) => {

  return (
    <tr style={{ backgroundColor: rowColor }}>
      <td style={{ padding: "0 50px" }}>{invoice.job}</td>
      <td style={{ padding: "0 50px" }}>{invoice.amount}</td>
      <td style={{ padding: "0 50px" }}>{invoice.date}</td>
      <td style={{ padding: "0 50px" }}>{invoice.description}</td>
      <td style={{ backgroundColor: "white" }}>
        {withDelete && (
          <Button
            color="pink"
            text="DELETE"
            onClick={() => onDelete(invoice._id)}
          />
        )}
        <Button
          color="papayawhip"
          text="EDIT"
          onClick={() => onEdit(invoice._id)}
        />
      </td>
    </tr>
  );
};

export default InvoiceRecord;