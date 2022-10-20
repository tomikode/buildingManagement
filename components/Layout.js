import React, { useContext } from "react";
import styles from "../styles/Nav.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TenantNav from "./nav/TenantNav";
import BaseNav from "./nav/BaseNav";
import ManagerNav from "./nav/ManagerNav";
import ContractorNav from "./nav/ContractorNav";
import { UserContext } from "../utils/UserContext";

const Layout = ({ children, pageType, logout }) => {
	const userCon = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (logout) {
			userCon.setUser(null);
			return;
		}
		const prevUser = sessionStorage.getItem("user");
		console.log(prevUser);
		if (prevUser) {
			prevUser = JSON.parse(prevUser);
			userCon.setUser(prevUser);
			if (pageType !== "all" && prevUser.type !== pageType) {
				switch (prevUser.type) {
					case "t":
						router.push("/tenantHome");
						break;
					case "m":
						router.push("/managerHome");
						break;
					case "c":
						router.push("/contractorHome");
						break;
				}
			}
		}

		// else {
		// 	if (pageType) {
		// 		router.push("/");
		// 	}
		// }
	}, []); // eslint-disable-line

	const renderNav = () => {
		if (!userCon || !userCon.user) {
			return <BaseNav />;
		}
		switch (userCon.user.type) {
			case "t":
				return <TenantNav />;
			case "m":
				return <ManagerNav />;
			case "c":
				return <ContractorNav />;
			default:
				return <BaseNav />;
		}
	};

	return (
		<>
			<div className={styles.nav}>
				<div className={styles.navFlex}>
					<div className={styles.logo}>
						<p>
							<span className={styles.first}>B</span>uilding
						</p>
						<p>
							<span className={styles.first}>M</span>anagement
						</p>
					</div>
					{renderNav()}
				</div>
			</div>
			{children}
		</>
	);
};

export default Layout;
