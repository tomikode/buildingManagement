import React from "react";
import { useState } from "react";

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
      <h3>{firstName + " " + lastName}</h3>
      <div>
        <label>FirstName</label>
        <input
          type="text"
          placeholder="Add user first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>LastName</label>
        <input
          type="text"
          placeholder="Add user last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          placeholder="Add phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Add email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>User Type</label>
        <input
          type="text"
          placeholder="Add user type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Add password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Save User" />
    </form>
  );
};

export default EditUser;
