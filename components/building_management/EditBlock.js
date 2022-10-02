import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import UsersDropdown from "../UsersDropdown";

const EditBlock = ({ onEdit, block = null, users = null}) => {
  const [_id, set_Id] = useState("");
  const [name, setName] = useState("");


  const [blockLoaded, setBlockLoaded] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a block name");
      return;
    }

    onEdit({ _id, name });

    setName("");
  };

  const loadBlock = (block) => {
    set_Id(block._id);
    setName(block.name);
    setBlockLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {block && !blockLoaded && loadBlock(block)}
      {_id}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Block Name</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="SAVE BLOCK" className={styles.rightButton} />
    </form>
  );
};

export default EditBlock;
