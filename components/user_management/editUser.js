import React from "react";
import Layout from "../Layout";
import { useState } from "react"

const EditUser = ({type}) => {
	const [id, setID] = useState('')
	const [name, setName] = useState('')
	const [userType, setUserType] = useState('')
	const [active, setActive] = useState(true)

	return (
	<>
		<Layout pageType="all">{type} user</Layout>
		<form>
			<div>
				<label>ID</label>
				<input
				type="text"
				placeholder="Add user ID"
				value={id}
				onChange={(e) => setID(e.target.value)}
				/>
			</div>
			<div>
				<label>Name</label>
				<input type="text" placeholder="Add user full name" 
				value={name}
				onChange={(e) => setName(e.target.value)}/>
			</div>
			<div>
				<label>User Type</label>
				<input type="text" placeholder="Add user type" 
				value={userType}
				onChange={(e) => setUserType(e.target.value)}/>
			</div>
			<div>
				<label>Active</label>
				<input type="checkbox" 
				value={active}
				onChange={(e) => setActive(e.currentTarget.checked)}
				/>
			</div>

			<input type="submit" value="Save User" />
		</form>
	</>
	)
};

export default EditUser;
