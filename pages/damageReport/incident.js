import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import Button from "../../components/Button";
import EditIncident from "../../components/incident/EditIncident";
import Layout from "../../components/Layout";
import IncidentList from "../../components/incident/IncidentList";
import React, { createContext, useEffect, useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const Incident = () => {
	const ACTIVE_VIEW = {
		INCIDENT_LIST: 0,
		VIEW_INCIDENT: 1,
		EDIT_INCIDENT: 2,
		CREATE_INCIDENT: 3,
	};

	const NOT_LOGGED_IN = 0;
	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY = "";
	const NO_SELECTED_INCIDENT = 0;

	const [incidents, setIncidents] = useState([]);
	const [editIncidentSelection, setEditIncidentSelection] =
		useState(NO_SELECTED_INCIDENT);
	const [usersTable, setUsersTable] = useState([]);
	const [viewState, setViewState] = useState(ACTIVE_VIEW.INCIDENT_LIST);

	useEffect(() => {
		const getData = async () => {
			const incidentsFromDatabase = await fetchIncidentsFromDatabase();
			setIncidents(incidentsFromDatabase);
			const usersFromMongo = await fetchUsersFromDatabase();
			setUsersTable(usersFromMongo);
		};
		getData();
	}, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

	const fetchIncidentsFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/incident");
			console.log(fetchResult)
			var loadedIncidents = fetchResult.data;
			return loadedIncidents;
		} catch (e) {
			console.log(e.message);
		}
	};

	const fetchUsersFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/userManagement");
			var loadedIncidents = fetchResult.data.foundUsers;
			return loadedIncidents;
		} catch (e) {
			console.log(e.message);
		}
	};

	const getIncident = (id) => {
		return incidents.find((incident) => incident._id === id);
	};

	const getUser = (who) => {
		return usersTable.find((user) => user._id === who);
	};

	const postIncident = async (newIncident) => {
		if (newIncident.postDate === EMPTY) {
			newIncident.postDate = `${new Date()}`;
			newIncident.user = loggedInUser;
		}
		const incidentData = {
			...newIncident,
			
		};
		try {
			const res = await axios.post("/api/incident", incidentData);
			setIncidents(await fetchIncidentsFromDatabase());
		} catch (e) {
			console.log(e);
		}
		setEditIncidentSelection(NO_SELECTED_INCIDENT);
		setViewState(ACTIVE_VIEW.INCIDENT_LIST);
	};

	const editSelectedIncident = (incident) => {
		setEditIncidentSelection(incident);
		setViewState(ACTIVE_VIEW.EDIT_INCIDENT);
	};

	const deleteIncident = async (id) => {
		const incidentData = { _id: id };
		try {
			const res = await axios.patch("/api/incident/", incidentData);
			setIncidents(await fetchIncidentsFromDatabase());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Layout pageType="all">
			<div className={styles.centreWrapper}>
				<div className={styles.contentBox}>
					<div className={styles.titleWithButton}>
						<h2>Incident</h2>
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
									viewState === ACTIVE_VIEW.INCIDENT_LIST
										? "POST INCIDENT"
										: "CANCEL"
								}
								color={
									viewState === ACTIVE_VIEW.INCIDENT_LIST
										? "lightgreen"
										: "papayawhip"
								}
								onClick={() => {
									viewState !== ACTIVE_VIEW.INCIDENT_LIST
										? setViewState(
												ACTIVE_VIEW.INCIDENT_LIST
										  )
										: setViewState(
												ACTIVE_VIEW.CREATE_INCIDENT
										  );
								}}
							/>
						)}
					</div>
					<br />
					<hr className={styles.hr} />

					{viewState === ACTIVE_VIEW.CREATE_INCIDENT && (
						<EditIncident onEdit={postIncident} />
					)}
					{viewState === ACTIVE_VIEW.EDIT_INCIDENT && (
						<EditIncident
							onEdit={postIncident}
							incident={getIncident(editIncidentSelection)}
						/>
					)}

					{/* Display message if no notices to show */}
					{viewState === ACTIVE_VIEW.INCIDENT_LIST &&
						(incidents?.length === 0 ? (
							"No incidents"
						) : (
							<IncidentList
              incidents={incidents}
								onDelete={deleteIncident}
								onEdit={editSelectedIncident}
								getUser={getUser}
								loggedInUser={loggedInUser}
							/>
						))}
				</div>
			</div>
		</Layout>
	);
};

export default Incident;
