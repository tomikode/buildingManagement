import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/WorkOrders.module.css";

const ManagerWorkOrders = () => {
	const workOrders = useRef([
		{
			id: 1,
			block: 1,
			unit: 1,
			submissionUser: 1,
			contractor: 1001,
			description: "stuff broke",
			response: "fixed bruh",
			workDate: new Date(),
			status: "fixed",
		},
	]);
	const [filterOrders, setFilterOrders] = useState(workOrders.current);

	useEffect(() => {
		const fetchWorkOrders = async () => {
			const response = await axios.get(
				"http://localhost:3000/api/workOrders"
			);
			console.log(response);
		};
		fetchWorkOrders();
	}, []);

	const viewOrder = (order) => {
		console.log(order);
	};

	const filter = (e) => {
		const filter = e.target.value;
		if (filter === "All") setFilterOrders(workOrders.current);
		else
			setFilterOrders(
				workOrders.current.filter((order) => order.status === filter)
			);
	};

	return (
		<Layout pageType="m">
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<h1>Work Orders</h1>
					<div className={styles.buttons}>
						<button className={styles.button}>Create</button>
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
									<td>Block</td>
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
										onClick={() => viewOrder(order)}
									>
										<td>{order.id}</td>
										<td>{order.status}</td>
										<td>{order.block}</td>
										<td>{order.unit}</td>
										<td>{order.submissionUser}</td>
										<td>{order.contractor}</td>
										<td>{order.description}</td>
										<td>{order.response}</td>
										<td>{order.workDate.getUTCDate()}</td>
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

export default ManagerWorkOrders;
