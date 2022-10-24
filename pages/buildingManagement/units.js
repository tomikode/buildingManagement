import { UserContext } from "../_app";
import axios from "axios";
import Button from "../../components/Button";
import EditUnit from "../../components/building_management/EditUnit";
import Layout from "../../components/Layout";
import React, { useEffect, useState, useTransition } from "react";
import styles from "../../styles/UserManagment.module.css";
import UnitList from "../../components/building_management/UnitList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const BuildingManagement = () => {
	const router = useRouter();
	const VIEW_STATES = {
	  BUILDING_MANAGEMENT_LIST: 0,
	  NEW_UNIT: 1,
	  EDIT_UNIT: 2,
	};

	const ADD_UNIT_LABEL = 'ADD UNIT';
	const CANCEL_LABEL = 'CANCEL';
  
	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY_ARRAY = [];
	const ZERO = 0;
  
	const [editUnitSelection, setEditUnitSelection] = useState(ZERO);
	const [unitsTable, setUnitsTable] = useState(EMPTY_ARRAY);

	const [usersTable, setUsersTable] = useState(EMPTY_ARRAY);

	const [blocksTable, setBlocksTable] = useState(EMPTY_ARRAY);


	const [viewState, setViewState] = useState(VIEW_STATES.BUILDING_MANAGEMENT_LIST);
  
	useEffect(() => {
	  const getData = async () => {
		loggedInUser = JSON.parse(sessionStorage.getItem("user"));
		if (!loggedInUser && router) {
		  router.push("/login");
		} else {
			const blocksFromDatabase = await fetchBlocksFromDatabase();
			const usersFromDatabase = await fetchUsersFromDatabase();
			const unitsFromDatabase = await fetchUnitsFromDatabase();
			setBlocksTable([...blocksFromDatabase]);
			setUsersTable([...usersFromDatabase]);
			setUnitsTable([...unitsFromDatabase]);
		}
	  };
	  getData();
	}, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

	const fetchUnitsFromDatabase = async () => {
		try {
		  const fetchResult = await axios.get("/api/buildingManagement/units");
		  let loadedUnits = fetchResult.data.foundUnits;
		  return loadedUnits;
		} catch (e) {
		  console.log(e.message);
		}
	  };

  
	const fetchUsersFromDatabase = async () => {
	  try {
		const fetchResult = await axios.get("/api/userManagement");
		let loadedUsers = fetchResult.data.foundUsers;
		return loadedUsers;
	  } catch (e) {
		console.log(e.message);
	  }
	};

	
	const fetchBlocksFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/buildingManagement/blocks");
			let loadedBlocks = fetchResult.data.foundBlocks;
			return loadedBlocks;
		} catch (e) {
			console.log(e.message);
		}
	};
	

	// units
	const getUnit = (id) => {
		return unitsTable.find((unit) => unit._id === id);
	  };

	const postUnit = async (newUnit) => {
		const unitData = {
			_id: editUnitSelection,
			...newUnit,
		};
		try {
			const res = await axios.post("/api/buildingManagement/units", unitData);
			setUnitsTable(await fetchUnitsFromDatabase());
		} catch (e) {
			console.log(e);
		}
		setEditUnitSelection(ZERO);
		setViewState(VIEW_STATES.BUILDING_MANAGEMENT_LIST);
	};

	const editUnit = (unit) => {
		setEditUnitSelection(unit);
		setViewState(VIEW_STATES.EDIT_UNIT);
	};


	const deleteUnit = async (id) => {
		const unitData = { _id: id };
		try {
			const res = await axios.patch("/api/buildingManagement/units", unitData);
			setUnitsTable(await fetchUnitsFromDatabase());
		} catch (e) {
			console.log(e);
		}
	};

	return (
	  <Layout pageType="all">
		<div className={styles.centreWrapper}>
			{console.log(usersTable)}
		  <div className={styles.contentBox}>
			{/* Building Management header */}
			<div className={styles.title}>
			  <h1>Building Management</h1>
			</div>

			<br />
			<hr className={styles.hr} />

			<div className={styles.titleWithButton}>
				<h2>Units</h2>
				{loggedInUser && loggedInUser.type === "m" && (
				<Button
				  text={
					viewState === VIEW_STATES.BUILDING_MANAGEMENT_LIST ? ADD_UNIT_LABEL : CANCEL_LABEL
				  }
				  color={
					viewState === VIEW_STATES.BUILDING_MANAGEMENT_LIST
					  ? "lightgreen"
					  : "papayawhip"
				  }
				  onClick={() => {
					viewState !== VIEW_STATES.BUILDING_MANAGEMENT_LIST
					  ? setViewState(VIEW_STATES.BUILDING_MANAGEMENT_LIST)
					  : setViewState(VIEW_STATES.NEW_UNIT);
				  }}
				/>
			  )}
			</div>
			
			{/* Show unit if selected, or display message if no units to show */}
			{viewState === VIEW_STATES.BUILDING_MANAGEMENT_LIST &&
			  (unitsTable.length === EMPTY_ARRAY.length ? (
				"No Units"
			  ) : (
				<UnitList
				  units={unitsTable}
				  users={usersTable}
				  blocks={blocksTable}
				  onDelete={deleteUnit}
				  onEdit={editUnit}
				  loggedInUser={loggedInUser}
				/>
			  ))}

			{/* Show edit/create unit screen if selected */}
			{viewState === VIEW_STATES.NEW_UNIT && <EditUnit onEdit={postUnit} users={usersTable} blocks={blocksTable}/>}
			{viewState === VIEW_STATES.EDIT_UNIT && (
			  <EditUnit onEdit={postUnit} unit={getUnit(editUnitSelection)} users={usersTable} blocks={blocksTable}/>
			)}
		  </div>
		</div>
	  </Layout>
	);
};

export default BuildingManagement;
