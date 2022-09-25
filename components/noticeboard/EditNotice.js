import React from "react";
import { useState } from "react"

const EditNotice = ({onEdit, notice=null}) => {
	const [id, setID] = useState('')
	const [userID, setUserID] = useState('')
	const [postedAt, setPostedAt] = useState('')
	const [content, setContent] = useState('')
	const [noticeLoaded, setNoticeLoaded] = useState(false)

const onSubmit = (e) => {
	e.preventDefault()
	
	if (!content) {
		alert("Please add some content")
		return
	}

	if(!id) {
		id = Math.floor(Math.random() * 1_000_000_000_000) + 1
		setID(id)
	}
	onEdit({id, userID, postedAt, content})

	setUserID("")
	setPostedAt("")
	setContent("")
}

const loadNotice = (notice) => {
	setID(notice.id)
	setUserID(notice.userID)
	setPostedAt(notice.postedAt)
	setContent(notice.content)

	setNoticeLoaded(true)
}

return (
	<form onSubmit={onSubmit}>
		{ notice && !noticeLoaded && loadNotice(notice) }
		<div>
			<label>UserID</label>
			<input type="text" placeholder="Add your User ID"
			value={userID}
			onChange={(e) => setUserID(e.target.value)}/>
		</div>
		<div>
			<label>PostedAt</label>
			<input type="text" placeholder="Add the current date and time" 
			value={postedAt}
			onChange={(e) => setPostedAt(e.target.value)}/>
		</div>
		<div>
			<label>Content</label>
			<input type="text" placeholder="Add post content" 
			value={content}
			onChange={(e) => setContent(e.target.value)}/>
		</div>

		<input type="submit" value="Post Notice" />
	</form>
	)
};

export default EditNotice;
