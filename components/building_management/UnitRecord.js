import Button from "../Button";
import React, { useEffect, useState } from "react";

const UnitRecord = ({
  unit,
  onDelete,
  onEdit,
  rowColor,
  withDelete,
  users,
  blocks
}) => {

  const [tenant, setTenant] = useState("");
  const [landlord, setLandlord] = useState("");
  const [block, setBlock] = useState("");

  const mapUnitPorperties = () => {

  }

  useEffect(() => {
    let tenant = users.find(user => {return user._id = unit.tenant});
    setTenant(`${tenant.firstName} ${tenant.lastName}`);
    let landlord = users.find(user => {return user._id = unit.landlord});
    setLandlord(`${landlord.firstName} ${landlord.lastName}`);
    console.log(blocks)
    let block = blocks.find(block => {return block._id = unit.block});
    setBlock(block.name);
	}, [tenant, landlord, block]); // eslint-disable-line


  return (
    <>
      {mapUnitPorperties()}
      <tr style={{ backgroundColor: rowColor }}>
        <td style={{ padding: "0 50px" }}>{unit.unitNumber}</td>
        <td style={{ padding: "0 50px" }}>{tenant}</td>
        <td style={{ padding: "0 50px" }}>{landlord}</td>
        <td style={{ padding: "0 50px" }}>{block}</td>
        <td style={{ backgroundColor: "white" }}>
          {withDelete && (
            <Button
              color="pink"
              text="DELETE"
              onClick={() => onDelete(unit._id)}
            />
          )}
          <Button
            color="papayawhip"
            text="EDIT"
            onClick={() => onEdit(unit._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default UnitRecord;
