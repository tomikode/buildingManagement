import React, { useContext } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../utils/UserContext";
import styles from "../styles/UserHome.module.css";

const ContractorHome = () => {
	const userCtx = useContext(UserContext);

	return (
		<Layout pageType="c">
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

export default ContractorHome;
