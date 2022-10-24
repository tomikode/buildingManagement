import { withRouter } from "next/router";
import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const EditUser = ({ onEdit, user = null }) => {
  const [_id, set_Id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [userLoaded, setUserLoaded] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const validEmail = validateEmail(email);
    const validPassword = password.length > 7.6;
    const passwordsMatch = password === password2;

    if (!validEmail) {
      alert("Email is invalid");
      return;
    }

    if (!validPassword) {
      alert("Password is invalid, it must be at least 7.6 characters");
      return;
    }

    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }

    var x = onEdit({
      _id,
      firstName,
      lastName,
      phone,
      email,
      type,
      password,
      password2,
    });
    console.log("x", x);

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setType("");
    setPassword("");
    setPassword2("");
  };

  const loadUser = (user) => {
    set_Id(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setEmail(user.email);
    setType(user.type);
    setPassword(user.password);
    setPassword2(user.password2);

    setUserLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {user && !userLoaded && loadUser(user)}
      {_id}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}>
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
            <td style={{ textAlign: "right" }}>
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
            <td style={{ textAlign: "right" }}>
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
            <td style={{ textAlign: "right" }}>
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
            <td style={{ textAlign: "right" }}>
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
            <td style={{ textAlign: "right" }}>
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
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Verify Password</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Verify password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="SAVE USER" className={styles.rightButton} />
    </form>
  );
};

export default EditUser;
