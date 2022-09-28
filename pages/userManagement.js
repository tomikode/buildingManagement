//import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import Layout from "../components/Layout";
//import styles from "../styles/Profile.module.css";
import styles from "../styles/UserManagment.module.css";
import UserList from "../components/user_management/UserList";
import Button from "../components/Button";
import EditUser from "../components/user_management/EditUser";
import axios from "axios";

const UserManagement = () => {
  // Contexts
  const userCon = useContext(UserContext);

  const [showEditUser, setShowEditUser] = useState(0);

  const ViewStates = {
    UserList: 0,
    NewUser: 1,
    EditUser: 2,
  };

  const [viewState, setViewState] = useState(0);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromMongo = await fetchUsers();
      setUsers(usersFromMongo);
    };
    getUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/userManagement");
      var loadedUsers = JSON.parse(JSON.stringify(res.data.foundUsers));
      return loadedUsers;
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUser = (id) => {
    console.log(`Getting user ${id}`);
    return users.find((user) => user._id === id);
  };

  const addUser = async (newUser) => {
    console.log(newUser);
    const userData = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      phone: newUser.phone,
      type: newUser.type,
    };
    const res = await axios.post("/api/userManagement", userData);
    setViewState(ViewStates.UserList);
    setUsers(await fetchUsers());
    setShowEditUser(0);
  };

  const editUser = (user) => {
    setViewState(2);
    setShowEditUser(user);
  };

  const disableUser = (id) => {
    // Log a message about the state toggle
    /*users.map((user) =>
      user.id === id
        ? console.log(
            `Toggling ${user.name}'s 'active' state to ${!user.active}`
          )
        : null
    );*/
    // Toggle User 'active' state by given User ID
    /*setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );*/
  };

  const deleteUser = async (id) => {
    // Log a message about User deletion
    const userData = {
      _id: id,
    };
    const res = await axios.patch("/api/userManagement/", userData);

    // Delete the User by given User ID
    setUsers(await fetchUsers());
  };

  return (
    <Layout pageType="m">
      <div className={styles.centreWrapper}>
        <div className={styles.loginBox}>
          <div className={styles.titleWithButton}>
            <h2>User Management</h2>
            <Button
              text={viewState === ViewStates.UserList ? "ADD USER" : "CANCEL"}
              color={
                viewState === ViewStates.UserList ? "lightgreen" : "papayawhip"
              }
              onClick={() => {
                viewState > 0 ? setViewState(0) : setViewState(1);
              }}
            />
          </div>
          <br />
          <hr className={styles.hr} />

          {viewState === ViewStates.NewUser && <EditUser onEdit={addUser} />}
          {viewState === ViewStates.EditUser && (
            <EditUser onEdit={addUser} user={getUser(showEditUser)} />
          )}

          {/* Display message if no users to show */}
          {viewState === ViewStates.UserList &&
            (users.length === 0 ? (
              "No Users"
            ) : (
              <UserList
                users={users}
                onDisable={disableUser}
                onDelete={deleteUser}
                onEdit={editUser}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
