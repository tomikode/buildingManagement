import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import ContractorViewOrder from "../components/ContractorViewOrder";
import Layout from "../components/Layout";
import ViewWorkOrder from "../components/ViewWorkOrder";
import styles from "../styles/WorkOrders.module.css";
import { UserContext } from "../utils/UserContext";

const ContractorWorkOrders = () => {
	const userCtx = useContext(UserContext);
	const workOrders = useRef([]);
	const [filterOrders, setFilterOrders] = useState(workOrders.current);
	const [showView, setShowView] = useState(null);
	const [contractors, setContractors] = useState([]);
	const [units, setUnits] = useState([]);

	const fetchWorkOrders = async () => {
		const response = await axios.get(
			"http://localhost:3000/api/workOrders"
		);
		workOrders.current = response.data.filter(
			(order) => order.contractor._id === userCtx.user._id
		);
		setFilterOrders(workOrders.current);
	};

	useEffect(() => {
		if (userCtx.user) fetchWorkOrders();
	}, [userCtx]);

	const openView = (order) => {
		console.log("thing");
		setShowView(order);
	};

	const closeView = () => {
		setShowView(null);
	};

	const filter = (e) => {
		const filter = e.target.value;
		if (filter === "All") setFilterOrders(workOrders.current);
		else
			setFilterOrders(
				workOrders.current.filter((order) => order.status === filter)
			);
	};

	const updateOrder = async (order) => {
		const res = await axios.put(
			`http://localhost:3000/api/workOrders/${order._id}`,
			order
		);
		console.log(res);
		fetchWorkOrders();
		closeView();
	};

	const formatDate = (date) => {
		if (date.day) return `${date.day}/${date.month}/${date.year}`;
		return "No date";
	};

	return (
		<Layout pageType="c">
			{showView ? (
				<ContractorViewOrder
					units={units}
					order={showView}
					closeView={closeView}
					contractors={contractors}
					updateOrder={updateOrder}
				/>
			) : null}
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<h1>My Work Orders</h1>
					<div className={styles.buttons}>
						<div>
							<p>Status Filter</p>
							<select
								onChange={filter}
								className={styles.filterSelect}
							>
								<option value="All">All</option>
								<option value="New">New</option>
								<option value="Assigned">Assigned</option>
								<option value="In Progress">In Progress</option>
								<option value="Complete">Complete</option>
								<option value="Failed">Failed</option>
							</select>
						</div>
					</div>
					<div className={styles.tableContainer}>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr>
									<td>ID</td>
									<td>Status</td>
									<td>Unit</td>
									<td>Submission User</td>
									<td>Contractor</td>
									<td>Description</td>
									<td>Response</td>
									<td>Work Date</td>
								</tr>
							</thead>
							<tbody>
								{filterOrders.map((order, index) => (
									<tr
										key={index}
										onClick={() => openView(order)}
									>
										<td>{order._id}</td>
										<td>{order.status}</td>
										<td>{order.unit.unitNumber}</td>
										<td>
											{order.submissionUser.firstName +
												" " +
												order.submissionUser.lastName}
										</td>
										<td>
											{order.contractor.firstName +
												" " +
												order.contractor.lastName}
										</td>
										<td>{order.description}</td>
										<td>{order.response}</td>
										<td>
											{order.workDate
												? formatDate(order.workDate)
												: "No date"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ContractorWorkOrders;
