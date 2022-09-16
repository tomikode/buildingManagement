import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const login = () => {
	const [error, setError] = useState("");
	const router = useRouter();

	const submitLogin = async (e) => {
		e.preventDefault();
		setError("");
		const loginDetails = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		try {
			const res = await axios.post("/api/login", loginDetails);
			sessionStorage.setItem("user", JSON.stringify(res.data.foundUser));
			switch (res.data.foundUser.type) {
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
		} catch (e) {
			setError(e.response.data.error);
		}
	};

	return (
		<Layout>
			<div className={styles.centreWrapper}>
				<div className={styles.loginBox}>
					<div className={styles.title}>Login</div>
					<div className={styles.error}>{error}</div>
					<form onSubmit={submitLogin} className={styles.form}>
						<label>Email</label>
						<input name="email" type="text"></input>
						<label>Password</label>
						<input name="password" type="password"></input>
						<input type="submit" value="Login" />
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default login;
