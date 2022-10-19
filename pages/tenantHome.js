import React, { useContext } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../utils/UserContext";
import styles from "../styles/UserHome.module.css";

const TenantHome = () => {
	const userCtx = useContext(UserContext);

	console.log(userCtx);

	return (
		<Layout pageType="t">
			<div className={styles.centreWrapper}>
				<div className={styles.box}>
					<h1>Home</h1>
					{userCtx.user ? (
						<p>
							You are logged in as {userCtx.user.firstName}{" "}
							{userCtx.user.lastName}
						</p>
					) : null}
				</div>
			</div>
		</Layout>
	);
};

export default TenantHome;
