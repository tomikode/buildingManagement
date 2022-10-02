import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/UserManagment.module.css";
import Link from "next/link";



const BuildingManagerHome = () => {
	return (
		<Layout pageType="m">
		<div className={styles.centreWrapper}>
			<div className={styles.contentBox}>
				{/* Building Management header */}
				<div className={styles.title}>
				<h1>Building Management</h1>
				</div>
				<div className={styles.titleWithButton}>			
					<button  className={styles.rightButton}>						
						<Link href="/buildingManagement/units">
						Units
						</Link>
					</button>
					<button  className={styles.rightButton}>						
						<Link href="/buildingManagement/blocks">
						Blocks
						</Link>
					</button>
				</div>
			</div>
		</div>
	</Layout>
	);
};

export default BuildingManagerHome;
