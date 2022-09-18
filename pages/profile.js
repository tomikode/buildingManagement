import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Profile.module.css";
import { UserContext } from "./_app";

const profile = () => {
	const userCon = useContext(UserContext);
	const [attempts, setAttempts] = useState([]);

	useEffect(() => {
		setAttempts(userCon.user ? userCon.user.accessAttempts : []);
	}, [userCon]);

	const filter = (e) => {
		const filter = e.target.value;
		switch (filter) {
			case "All":
				setAttempts(userCon.user.accessAttempts);
				break;
			case "Successful":
				setAttempts(
					userCon.user.accessAttempts.filter((attempt) =>
						attempt.includes("Successful")
					)
				);
				break;
			case "Failed":
				setAttempts(
					userCon.user.accessAttempts.filter((attempt) =>
						attempt.includes("Failed")
					)
				);
				break;
		}
	};

	return (
		<Layout pageType="all">
			<div className={styles.maxWidth}>
				<div>
					<h2>Login Access Attempts</h2>
					<div className={styles.filterBox}>
						<p className={styles.filterText}>Filter</p>
						<select onChange={filter} className={styles.filterSelect}>
							<option value="All">All</option>
							<option value="Successful">Successful</option>
							<option value="Failed">Failed</option>
						</select>
					</div>
					{userCon.user ? (
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Date</th>
									<th>Result</th>
								</tr>
							</thead>
							<tbody>
								{attempts.map((attempt, key) => {
									attempt = attempt.split("|");
									const date = attempt[0];
									const result = attempt[1];
									return (
										<tr key={key}>
											<td>{date}</td>
											<td>{result}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : null}
				</div>
			</div>
		</Layout>
	);
};

export default profile;
