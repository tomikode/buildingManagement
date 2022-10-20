import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Nav.module.css";

const ManagerNav = () => {
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
						<Link href="/managerHome">
							<li>
								<p>Home</p>
							</li>
						</Link>
						<Link href="/profile">
							<li>
								<p>Profile</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>Mail</p>
							</li>
						</Link>
						<Link href="/noticeboard">
							<li>
								<p>Noticeboard</p>
							</li>
						</Link>
						<Link href="/managerWorkOrders">
							<li>
								<p>Work Orders</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>Damages</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>Contractors</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>Rentals</p>
							</li>
						</Link>
						<Link href="/userManagement">
							<li>
								<p>User Management</p>
							</li>
						</Link>
						<Link href="/buildingManagement/">
							<li>
								<p>Building</p>
							</li>
						</Link>
						<Link href="/">
							<li>
								<p>Invoices</p>
							</li>
						</Link>
						<Link href="/logout">
							<li>
								<p>Logout</p>
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

export default ManagerNav;
