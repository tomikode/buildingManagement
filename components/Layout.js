import React from "react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import styles from "../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TenantNav from "./TenantNav";
import BaseNav from "./BaseNav";
import ManagerNav from "./ManagerNav";
import ContractorNav from "./ContractorNav";

const Layout = ({ children, pageType, logout }) => {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (logout) {
			setUser(null);
			return;
		}
		const prevUser = sessionStorage.getItem("user");
		if (prevUser) {
			prevUser = JSON.parse(prevUser);
			setUser(prevUser);
			if (prevUser.type !== pageType) {
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
		if (!user) {
			return <BaseNav />;
		}
		switch (user.type) {
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
