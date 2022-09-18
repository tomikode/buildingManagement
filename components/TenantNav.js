import {
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Nav.module.css";

const TenantNav = () => {
	const [menu, setMenu] = useState(false);

	const showMenu = () => {
		setMenu(!menu);
	};

	return (
		<>
			{menu ? (
				<>
					<button className={styles.button} onClick={showMenu}><XMarkIcon className={styles.menuIcon} /></button>
					<ul id="menu" className={styles.menu}>
						<Link href="/tenantHome">
							<li>
								<p>
									Home
								</p>
							</li>
						</Link>
						<Link href="/profile">
							<li>
								<p>
									Profile
								</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>
									Mail
								</p>
							</li>
						</Link>
                        <Link href="/">
							<li>
								<p>
									Noticeboard
								</p>
							</li>
						</Link>
                        <Link href="/">
							<li>
								<p>
									Rent
								</p>
							</li>
						</Link>
                        <Link href="/">
							<li>
								<p>
									Report Damages
								</p>
							</li>
						</Link>
                        <Link href="/">
							<li>
								<p>
									Invoices
								</p>
							</li>
						</Link>
                        <Link href="/logout">
							<li>
								<p>
									Logout
								</p>
							</li>
						</Link>
					</ul>
				</>
			) : (
				<button className={styles.button} onClick={showMenu}><Bars3Icon className={styles.menuIcon} /></button>
			)}
		</>
	);
};

//mail, profile, noticeboard, rental, damages, invoices

export default TenantNav;
