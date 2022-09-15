import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";

const login = () => {
	const [error, setError] = useState("");

	const submitLogin = async (e) => {
		e.preventDefault();
		const loginDetails = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		try {
			const res = await axios.post("/api/login", loginDetails);
			localStorage.setItem('user', JSON.stringify(res.data))
		} catch (e) {
			setError(e.response.data.error);
		}
	};

	return (
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
	);
};

export default login;
