import { withRouter } from "next/router";
import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const EditUser = ({ onEdit, user = null }) => {
  const [_id, set_Id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const [userLoaded, setUserLoaded] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      alert("Please add add a first name at least");
      return;
    }

    onEdit({ _id, firstName, lastName, phone, email, type, password });

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setType("");
    setPassword("");
  };

  const loadUser = (user) => {
    set_Id(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setEmail(user.email);
    setType(user.type);
    setPassword(user.password);

    setUserLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {user && !userLoaded && loadUser(user)}
      {_id}
      <table style={{borderSpacing: "10px 15px"}}>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>First Name</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </td>
        </tr>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>Last Name</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </td>
        </tr>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>Phone</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
        </tr>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>Email</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
        </tr>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>User Type</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add user type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </td>
        </tr>
        <tr>
            <td style={{textAlign: "right"}}>
              <label>Password</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
        </tr>
      </table>
      <br />
      <input type="submit" value="SAVE USER" className={styles.rightButton} />
    </form>
  );
};

export default EditUser;
