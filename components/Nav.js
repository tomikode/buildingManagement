import React from "react";
import styles from "../styles/Nav.module.css";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Nav = () => {
	return (
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
				<div className={styles.menu}>
					<ul>
						<li>
							Login
							<UserCircleIcon className={styles.loginIcon} />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Nav;
