import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Nav.module.css";

const BaseNav = () => {
	const [menu, setMenu] = useState(false);

	const showMenu = () => {
		setMenu(!menu);
	};

	return (
		<>
			{menu ? (
				<>
					<button className={styles.button} onClick={showMenu}>
						<XMarkIcon className={styles.menuIcon} />
					</button>
					<ul id="menu" className={styles.menu}>
						<Link href="/">
							<li>
								<p>Home</p>
							</li>
						</Link>
						<Link href="/login">
							<li>
								<p>Login</p>
							</li>
						</Link>
					</ul>
				</>
			) : (
				<button className={styles.button} onClick={showMenu}>
					<Bars3Icon className={styles.menuIcon} />
				</button>
			)}
		</>
	);
};

export default BaseNav;
