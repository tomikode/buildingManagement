import { UserContext } from "../utils/UserContext";
import axios from "axios";
import Button from "../components/Button";
import EditMail from "../components/mail/EditMail";
import Layout from "../components/Layout";
import MailList from "../components/mail/MailList";
import React, { createContext, useEffect, useState } from "react";
import styles from "../styles/UserManagment.module.css";

//Creating variables for users

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

//mail function to create mail pages
const Mail = () => {
	const ACTIVE_VIEW = {
		MAIL_LIST: 0,
		VIEW_MAIL: 1,
		EDIT_MAIL: 2,
		CREATE_MAIL: 3,
	};
//Creating variables for useState
//useState is used to exptress different states 
	const NOT_LOGGED_IN = 0;
	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY = "";
	const NO_SELECTED_MAIL = 0;

	const [mails, setMails] = useState([]);
	const [editMailSelection, setEditMailSelection] =
		useState(NO_SELECTED_MAIL);
	const [usersTable, setUsersTable] = useState([]);
	const [viewState, setViewState] = useState(ACTIVE_VIEW.MAIL_LIST);

//useEffect is used to get data in this case mail data from database
	useEffect(() => {
		const getData = async () => {
			const mailsFromDatabase = await fetchMailsFromDatabase();
			setMails(mailsFromDatabase);
			const usersFromMongo = await fetchUsersFromDatabase();
			setUsersTable(usersFromMongo);
		};
		getData();
	}, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

	//getting data from mail under api
	const fetchMailsFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/mail");
			console.log(fetchResult)
			var loadedMails = fetchResult.data.foundMails;
			return loadedMails;
		} catch (e) {
			console.log(e.message);
		}
	};

	const fetchUsersFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/userManagement");
			var loadedMails = fetchResult.data.foundUsers;
			return loadedMails;
		} catch (e) {
			console.log(e.message);
		}
	};

	const getMail = (id) => {
		return mails.find((mail) => mail._id === id);
	};

	const getUser = (who) => {
		return usersTable.find((user) => user._id === who);
	};

	const postMail = async (newMail) => {
		if (newMail.postDate === EMPTY) {
			newMail.postDate = `${new Date()}`;
			newMail.user = loggedInUser;
		}
		const mailData = {
			...newMail,
			
		};
		try {
			const res = await axios.post("/api/mail", mailData);
			setMails(await fetchMailsFromDatabase());
		} catch (e) {
			console.log(e);
		}
		setEditMailSelection(NO_SELECTED_MAIL);
		setViewState(ACTIVE_VIEW.MAIL_LIST);
	};

	const editSelectedMail = (mail) => {
		setEditMailSelection(mail);
		setViewState(ACTIVE_VIEW.EDIT_MAIL);
	};

	const deleteMail= async (id) => {
		const mailData = { _id: id };
		try {
			const res = await axios.patch("/api/mail/", mailData);
			setMails(await fetchMailsFromDatabase());
		} catch (e) {
			console.log(e);
		}
	};
//main page to display
	return (
		<Layout pageType="all">
			<div className={styles.centreWrapper}>
				<div className={styles.contentBox}>
					<div className={styles.titleWithButton}>
						<h2>Mail</h2>
						<UserContext.Consumer>
							{(value) => {
								try {
									loggedInUser = value.user;
								} catch {}
							}}
						</UserContext.Consumer>
						{loggedInUser && (
							<Button
								text={
									viewState === ACTIVE_VIEW.MAIL_LIST
										? "COMPOSE MAIL"
										: "CANCEL"
								}
								color={
									viewState === ACTIVE_VIEW.MAIL_LIST
										? "lightgreen"
										: "papayawhip"
								}
								onClick={() => {
									viewState !== ACTIVE_VIEW.MAIL_LIST
										? setViewState(
												ACTIVE_VIEW.MAIL_LIST
										  )
										: setViewState(
												ACTIVE_VIEW.CREATE_MAIL
										  );
								}}
							/>
						)}
					</div>
					<br />
					<hr className={styles.hr} />

					{viewState === ACTIVE_VIEW.CREATE_MAIL && (
						<EditMail onEdit={postMail} />
					)}
					{viewState === ACTIVE_VIEW.EDIT_MAIL && (
						<EditMail
							onEdit={postMail}
							mail={getMail(editMailSelection)}
						/>
					)}

					{/* Display message if no notices to show */}
					{viewState === ACTIVE_VIEW.MAIL_LIST &&
						(mails.length === 0 ? (
							"No mails"
						) : (
							<MailList
              mails={mails}
								onDelete={deleteMail}
								onEdit={editSelectedMail}
								getUser={getUser}
								loggedInUser={loggedInUser}
							/>
						))}
				</div>
			</div>
		</Layout>
	);
};

export default Mail;


