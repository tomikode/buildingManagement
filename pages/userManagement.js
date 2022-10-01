import axios from "axios";
import Button from "../components/Button";
import EditUser from "../components/user_management/EditUser";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../styles/UserManagment.module.css";
import UserList from "../components/user_management/UserList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const UserManagement = () => {
	const router = useRouter();
	const VIEW_STATES = {
		USER_LIST: 0,
		NEW_USER: 1,
		EDIT_USER: 2,
	};

	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY = [];
	const NO_SELECTED_USER = 0;

	const [editUserSelection, setEditUserSelection] =
		useState(NO_SELECTED_USER);
	const [lUser, setLUser] = useState(NO_SELECTED_USER);
	const [usersTable, setUsersTable] = useState(EMPTY);
	const [viewState, setViewState] = useState(VIEW_STATES.USER_LIST);

	useEffect(() => {
		const getUsers = async () => {
			loggedInUser = JSON.parse(sessionStorage.getItem("user"));
			if (!loggedInUser && router) {
				router.push("/login");
			} else {
				const usersFromDatabase = await fetchUsersFromDatabase();
				setUsersTable(usersFromDatabase);
			}
		};
		getUsers();
	}, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

	const fetchUsersFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/userManagement");
			var loadedUsers = fetchResult.data.foundUsers;
			return loadedUsers;
		} catch (e) {
			console.log(e.message);
		}
	};

	const getUser = (id) => {
		return usersTable.find((user) => user._id === id);
	};

	const addUser = async (newUser) => {
		const userData = { ...newUser };
		try {
			const res = await axios.post("/api/userManagement", userData);
			setUsersTable(await fetchUsersFromDatabase());
		} catch (e) {
			console.log(e.message);
		}
		setViewState(VIEW_STATES.USER_LIST);
		setEditUserSelection(NO_SELECTED_USER);
	};

	const editUser = (user) => {
		setViewState(VIEW_STATES.EDIT_USER);
		setEditUserSelection(user);
	};

	const deleteUser = async (id) => {
		const userData = { _id: id };
		try {
			const res = await axios.patch("/api/userManagement/", userData);
			setUsersTable(await fetchUsersFromDatabase());
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<Layout pageType="all">
			<div className={styles.centreWrapper}>
				<div className={styles.contentBox}>
					{/* User Management header */}
					<div className={styles.titleWithButton}>
						<h2>User Management</h2>
						{loggedInUser && loggedInUser.type === "m" && (
							<Button
								text={
									viewState === VIEW_STATES.USER_LIST
										? "ADD USER"
										: "CANCEL"
								}
								color={
									viewState === VIEW_STATES.USER_LIST
										? "lightgreen"
										: "papayawhip"
								}
								onClick={() => {
									viewState !== VIEW_STATES.USER_LIST
										? setViewState(VIEW_STATES.USER_LIST)
										: setViewState(VIEW_STATES.NEW_USER);
								}}
							/>
						)}
					</div>
					<br />
					<hr className={styles.hr} />

					{/* Show edit/create user screen if selected */}
					{viewState === VIEW_STATES.NEW_USER && (
						<EditUser onEdit={addUser} />
					)}
					{viewState === VIEW_STATES.EDIT_USER && (
						<EditUser
							onEdit={addUser}
							user={getUser(editUserSelection)}
						/>
					)}

					{/* Show users if selected, or display message if no users to show */}
					{viewState === VIEW_STATES.USER_LIST &&
						(usersTable.length === EMPTY.length ? (
							"No Users"
						) : (
							<UserList
								users={usersTable}
								onDelete={deleteUser}
								onEdit={editUser}
								lUser={loggedInUser}
							/>
						))}
				</div>
			</div>
		</Layout>
	);
};

export default UserManagement;
