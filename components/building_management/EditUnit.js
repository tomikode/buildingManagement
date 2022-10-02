import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import UsersDropdown from "../UsersDropdown";

const EditUnit = ({ onEdit, unit = null, users = null, blocks = null}) => {
  const [_id, set_Id] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [tenant, setTenant] = useState("");
  const [landlord, setLandlord] = useState("");
  const [block, setBlock] = useState("");


  const [unitLoaded, setUnitLoaded] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!unitNumber) {
      alert("Please add a Unit Number");
      return;
    }

    if (!tenant) {
      alert("Please add a Tenant");
      return;
    }

    if (!landlord) {
      alert("Please add a Landlord");
      return;
    }

    if (!block) {
      alert("Please add a Block");
      return;
    }
    onEdit({ _id, unitNumber, tenant, landlord, block });

    setUnitNumber("");
    setTenant("");
    setLandlord("");
    setBlock("");
  };

  const loadUnit = (unit) => {
    set_Id(unit._id);
    setUnitNumber(unit.unitNumber);
    setTenant(unit.tenant);
    setLandlord(unit.landlord)
    setBlock(unit.block)

    setUnitLoaded(true);
  };
  
  return (
    <form onSubmit={onSubmit}>
      {/* {console.log(users)}
      {console.log(blocks)} */}
      {unit && !unitLoaded && loadUnit(unit)}
      {_id}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Unit Number</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add unit number"
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Tenant</label>
            </td>
            <td>
              <UsersDropdown selectedUser={tenant} users={users} onChange={(e) => setTenant(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Landlord</label>
            </td>
            <td>
              <UsersDropdown selectedUser={landlord} users={users} onChange={(e) => setLandlord(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Block</label>
            </td>
            <td>
              <select value={block} onChange={(e) => setBlock(e.target.value)}>
                <option value=""></option>
                {blocks.map((block) => (
                  <option key={block._id} value={block._id}>{block.name}</option>
                ))}
            </select>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="SAVE UNIT" className={styles.rightButton} />
    </form>
  );
};

export default EditUnit;
