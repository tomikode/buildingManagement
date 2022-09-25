import React from "react";
import { useState } from "react"

const EditUser = ({onEdit, user=null}) => {
	const [id, setID] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [sex, setSex] = useState('')
	const [userType, setUserType] = useState('')
	const [active, setActive] = useState(true)
	const [password, setPassword] = useState('')
	const [userLoaded, setUserLoaded] = useState(false)

const onSubmit = (e) => {
	e.preventDefault()
	
	if (!name) {
		alert("Please add a name")
		return
	}

	if(!id) {
		id = Math.floor(Math.random() * 1_000_000_000_000) + 1
		setID(id)
	}
	onEdit({id, name, phone, email, sex, userType, active, password})

	setName("")
	setPhone("")
	setEmail("")
	setSex("")
	setUserType("")
	setActive(true)
	setPassword("")
}

const loadUser = (user) => {
	setID(user.id)
	setName(user.name)
	setPhone(user.phone)
	setEmail(user.email)
	setSex(user.sex)
	setUserType(user.type)
	setActive(user.active)
	setPassword(user.password)

	setUserLoaded(true)
}

return (
	<form onSubmit={onSubmit}>
		{ user && !userLoaded && loadUser(user) }
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
