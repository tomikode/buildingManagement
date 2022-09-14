import React from "react";
import styles from "../styles/Nav.module.css";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
				<ul className={styles.menu}>
					<li>
						<Link href="/">
							<p>
								<HomeIcon className={styles.icon} />
								Home
							</p>
						</Link>
					</li>
					<li>
						<Link href="/login">
							<p>
								<UserCircleIcon className={styles.icon} />
								Login
							</p>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Nav;
