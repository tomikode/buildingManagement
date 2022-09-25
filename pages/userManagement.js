//import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Profile.module.css";
import UserList from "../components/user_management/UserList"
import Button from "../components/Button"
import EditUser from "../components/user_management/EditUser";
//import User from "../database/schemas/user";

const UserManagement = () => {
    // Contexts
	const userCon = useContext(UserContext);

	const [showEditUser, setShowEditUser] = useState(0)

	const ViewStates = {
		UserList: 0,
		NewUser: 1,
		EditUser: 2,
	}

	const [viewState, setViewState] = useState(0)

	// Data storing users, only stored in view - no database backend
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Atilla Bongs",
			phone: "1800 666 666",
			email: "bongs@cometpizza.com",
			sex: "Male",
            type: "p",
			active: true,
			password: "moloch"
        },
        {
            id: 2,
            name: "Craig Dunsfield",
			phone: "0477 805 468",
			email: "craig@hotmail.com",
			sex: "Male",
            type: "m",
            active: false,
			password: "letmein"
        },
        {
            id: 3,
            name: "Your Mum",
			phone: "1831 494 673",
			email: "qt314@yourmums.accesscam.org",
			sex: "Yes, please",
            type: "t",
            active: true,
			password: "allaboard"
        },
        {
            id: 4,
            name: "Suzanne Vega",
			phone: "1831 238 123",
			email: "svega@outlook.com",
			sex: "Female",
            type: "c",
            active: true,
			password: "luca"
        },
    ])

	const getUser = (id) => {
		console.log(`Getting user ${id}`)
		return users.find((user) => user.id === id)
	}

	const addUser = (newUser) => {
		console.log(User.findById(1))
		console.log("New user added")
		if (getUser(newUser.id) !== undefined) {
			alert(`User ${newUser.name} updated`)
			setUsers(users.map((user) => user.id === newUser.id
				? newUser
				: user))
				setViewState(ViewStates.UserList)
		}
		else {
			alert(`New user ${newUser.name} created`)
			setUsers([...users,newUser])
		}
	}

	const editUser = (user) => {
		setViewState(2)
		setShowEditUser(user)
	}

	const disableUser = (id) => {
		// Log a message about the state toggle
		users.map((user) => user.id === id
		? console.log(`Toggling ${user.name}'s 'active' state to ${!user.active}`)
		: null)
		
		// Toggle User 'active' state by given User ID
		setUsers(users.map((user) => user.id === id
		? {...user, active: !user.active}
		: user))
	}

	const deleteUser = (id) => {
		// Log a message about User deletion
		users.map((user) => user.id === id
		? console.log(`Deleting ${user.name}`)
		: null)

		// Delete the User by given User ID
		setUsers(users.filter((user) => user.id !== id))
	}

	return (
		<Layout pageType="m">
			<div className={styles.maxWidth}>

					<h2>
						User Management 
						<Button
							text={viewState === ViewStates.UserList ? "Add User" : "Cancel"}
							onClick={() => {
								viewState > 0 ? setViewState(0) : setViewState(1)
							}}
						/>
					</h2>

					{viewState === ViewStates.NewUser && <EditUser onEdit={addUser}/>}
					{viewState === ViewStates.EditUser && <EditUser onEdit={addUser} user={getUser(showEditUser)}/>}

					{/* Display message if no users to show */}
					{viewState === ViewStates.UserList &&
						(users.length > 0) 
						? (<UserList
							users={users}
							onDisable={disableUser}
							onDelete={deleteUser}
							onEdit={editUser}/>)
						: "No users"}
				</div>
		</Layout>
	);
};

export default UserManagement;
