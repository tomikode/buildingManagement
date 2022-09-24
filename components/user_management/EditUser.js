import React from "react";
import { useState } from "react"

const EditUser = ({editType, onEdit}) => {
	const [id, setID] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [sex, setSex] = useState('')
	const [userType, setUserType] = useState('')
	const [active, setActive] = useState(true)
	const [password, setPassword] = useState('')

const onSubmit = (e) => {
	e.preventDefault()
	
	if (!name) {
		alert("Please add a name")
		return
	}

	id = Math.floor(Math.random() * 1_000_000_000_000) + 1
	setID(id)
	onEdit({id, name, phone, email, sex, userType, active, password})

	alert(`User ${name} created.`)

	setName("")
	setPhone("")
	setEmail("")
	setSex("")
	setUserType("")
	setActive(true)
	setPassword("")
}

return (
	<form onSubmit={onSubmit}>
		<div>
			<label>Name</label>
			<input type="text" placeholder="Add user full name" 
			value={name}
			onChange={(e) => setName(e.target.value)}/>
		</div>
		<div>
			<label>Phone</label>
			<input type="text" placeholder="Add phone number" 
			value={phone}
			onChange={(e) => setPhone(e.target.value)}/>
		</div>
		<div>
			<label>Email</label>
			<input type="text" placeholder="Add email" 
			value={email}
			onChange={(e) => setEmail(e.target.value)}/>
		</div>
		<div>
			<label>Sex</label>
			<input type="text" placeholder="Add sex" 
			value={sex}
			onChange={(e) => setSex(e.target.value)}/>
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
		<div>
			<label>Password</label>
			<input type="text" placeholder="Add password" 
			value={password}
			onChange={(e) => setPassword(e.target.value)}/>
		</div>
		<input type="submit" value="Save User" />
	</form>
	)
};

export default EditUser;
