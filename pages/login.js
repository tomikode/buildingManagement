import React from "react";
import styles from "../styles/Login.module.css";

const login = () => {

  const submitLogin = e => {
    e.preventDefault()
    console.log(e)
  }

	return (
		<div className={styles.centreWrapper}>
			<div className={styles.loginBox}>
				<div className={styles.title}>Login</div>
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
