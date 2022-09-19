import React, { useEffect } from "react";
import Layout from "../components/Layout";

const Logout = () => {
	useEffect(() => {
		sessionStorage.removeItem("user");
	}, []);

	return <Layout logout={true}>You have been logged out</Layout>;
};

export default Logout;
