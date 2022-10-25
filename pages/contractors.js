import axios from "axios";
import Button from "../components/Button";
import EditUser from "../components/user_management/EditUser";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../styles/UserManagment.module.css";
import ContractorList from "../components/contractor/ContractorList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const UserManagement = () => {
	const router = useRouter();

	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY = [];
	const NO_SELECTED_USER = 0;

	const [lUser, setLUser] = useState(NO_SELECTED_USER);
	const [contractors, setContractors] = useState(EMPTY);

	// setup all the contractors
	useEffect(() => {
		const fetchContractors = async () => {
			loggedInUser = JSON.parse(sessionStorage.getItem("user"));
			if (!loggedInUser && router) {
				router.push("/login");
			} else {
				const response = await axios.get("api/contractors");
				setContractors(response.data);
			}
		};
		fetchContractors();
	}, []);

	const fetchUsersFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/userManagement");
			var loadedUsers = fetchResult.data.foundUsers;
			return loadedUsers;
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<Layout pageType="m">
			<div className={styles.centreWrapper}>
				<div className={styles.contentBox}>
					{/* Contractor Management header */}
					<div className={styles.title}>
						<h2>Contractor Management</h2>
					</div>
					<br />
					<hr className={styles.hr} />
					{/* show all contractors */}
					{(contractors.length === EMPTY.length ? "No Contractors" : (
						<ContractorList
							contractors={contractors}
							lUser={loggedInUser}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default UserManagement;
