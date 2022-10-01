import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<Layout>
			<div className={styles.container}>
				<div>
					<h1>Building Management App</h1>
					<p>Prototype interface</p>
				</div>
			</div>
		</Layout>
	);
}

//add sign in attempts and allow people to see them
//maybe use callback to share user state across to other components
