import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

//https://dotnetthoughts.net/deploying-a-static-webapp-via-azure-devops-pipeline/

//home base landing page
export default function Home() {
	return (
		<Layout>
			<div className={styles.container}>
				<div>
					<h1>Building Management App</h1>
					<p>Prototype interface, making a change</p>
				</div>
			</div>
		</Layout>
	);
}
