import axios from "axios";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import { useRouter } from "next/router";
import BlockList from "../../components/building_management/BlockList";
import EditBlock from "../../components/building_management/EditBlock";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const BuildingManagement = () => {
	const router = useRouter();
	const VIEW_STATES = {
		BUILDING_MANAGEMENT_LIST: 0,
		NEW_BLOCK: 1,
		EDIT_BLOCK: 2,
	};

	const ADD_BLOCK_LABEL = "ADD BLOCK";
	const CANCEL_LABEL = "CANCEL";

	const BECAUSE_TRAVERSY_SAID_SO = [];
	const EMPTY_ARRAY = [];
	const ZERO = 0;

	const [editBlockSelection, setEditBlockSelection] = useState(ZERO);
	const [blocksTable, setBlocksTable] = useState(EMPTY_ARRAY);

	const [usersTable, setUsersTable] = useState(EMPTY_ARRAY);

	const [viewState, setViewState] = useState(
		VIEW_STATES.BUILDING_MANAGEMENT_LIST
	);

	useEffect(() => {
		const getData = async () => {
			loggedInUser = JSON.parse(sessionStorage.getItem("user"));
			if (!loggedInUser && router) {
				router.push("/login");
			} else {
				const usersFromDatabase = await fetchUsersFromDatabase();
				setUsersTable(usersFromDatabase);
				const blocksFromDatabase = await fetchBlocksFromDatabase();
				setBlocksTable(blocksFromDatabase);
			}
		};
		getData();
	}, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

	const fetchBlocksFromDatabase = async () => {
		try {
			const fetchResult = await axios.get(
				"/api/buildingManagement/blocks"
			);
			let loadedBlocks = fetchResult.data.foundBlocks;
			return loadedBlocks;
		} catch (e) {
			console.log(e.message);
		}
	};

	const fetchUsersFromDatabase = async () => {
		try {
			const fetchResult = await axios.get("/api/userManagement");
			var loadedUsers = fetchResult.data.foundUsers;
			return loadedUsers;
		} catch (e) {
			console.log(e.message);
		}
	};

	// blocks

	const getBlock = (id) => {
		return blocksTable.find((block) => block._id === id);
	};

	const postBlock = async (newBlock) => {
		const blockData = {
			_id: editBlockSelection,
			...newBlock,
		};
		try {
			const res = await axios.post(
				"/api/buildingManagement/blocks",
				blockData
			);
			setBlocksTable(await fetchBlocksFromDatabase());
		} catch (e) {
			console.log(e);
		}
		setEditBlockSelection(ZERO);
		setViewState(VIEW_STATES.BUILDING_MANAGEMENT_LIST);
	};

	const editBlock = (block) => {
		setEditBlockSelection(block);
		setViewState(VIEW_STATES.EDIT_BLOCK);
	};

	const deleteBlock = async (id) => {
		const blockData = { _id: id };
		try {
			const res = await axios.patch(
				"/api/buildingManagement/blocks",
				blockData
			);
			setBlocksTable(await fetchBlocksFromDatabase());
			const unitsToBeDeleted = await axios.get(
				"/api/buildingManagement/units",
				{ params: { blockName: id } }
			);
			unitsToBeDeleted.data.foundUnits.forEach(async (unit) => {
				await axios.patch("/api/buildingManagement/units", {
					_id: unit._id,
				});
			});
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
						<h2>Blocks</h2>
						{loggedInUser && loggedInUser.type === "m" && (
							<Button
								text={
									viewState ===
									VIEW_STATES.BUILDING_MANAGEMENT_LIST
										? ADD_BLOCK_LABEL
										: CANCEL_LABEL
								}
								color={
									viewState ===
									VIEW_STATES.BUILDING_MANAGEMENT_LIST
										? "lightgreen"
										: "papayawhip"
								}
								onClick={() => {
									viewState !==
									VIEW_STATES.BUILDING_MANAGEMENT_LIST
										? setViewState(
												VIEW_STATES.BUILDING_MANAGEMENT_LIST
										  )
										: setViewState(VIEW_STATES.NEW_BLOCK);
								}}
							/>
						)}
					</div>
					{/* Show block if selected, or display message if no blocks to show */}
					{viewState === VIEW_STATES.BUILDING_MANAGEMENT_LIST &&
						(blocksTable.length === EMPTY_ARRAY.length ? (
							"No Blocks"
						) : (
							<BlockList
								blocks={blocksTable}
								onDelete={deleteBlock}
								onEdit={editBlock}
								loggedInUser={loggedInUser}
							/>
						))}
					{/* Show edit/create block screen if selected */}
					{viewState === VIEW_STATES.NEW_BLOCK && (
						<EditBlock onEdit={postBlock} />
					)}
					{viewState === VIEW_STATES.EDIT_BLOCK && (
						<EditBlock
							onEdit={postBlock}
							block={getBlock(editBlockSelection)}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default BuildingManagement;
