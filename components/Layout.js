import React, { useContext } from "react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import styles from "../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TenantNav from "./TenantNav";
import BaseNav from "./BaseNav";
import ManagerNav from "./ManagerNav";
import ContractorNav from "./ContractorNav";
import { UserContext } from "../pages/_app";

const Layout = ({ children, pageType, logout }) => {
	const userCon = useContext(UserContext)
	const router = useRouter();

	useEffect(() => {
		if (logout) {
			userCon.setUser(null);
			return;
		}
		const prevUser = sessionStorage.getItem("user");
		const type = null;
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
	}, []);

	const renderNav = () => {
		if (!userCon.user) {
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
