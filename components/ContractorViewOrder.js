import React from "react";
import styles from "../styles/WorkOrders.module.css";

const ContractorViewOrder = ({ order, closeView, updateOrder }) => {
	const submitOrder = (e) => {
		e.preventDefault();
		console.log(e.target.workDate.value);
		const updated = {
			_id: order._id,
			submissionUser: order.submissionUser._id,
			status: e.target.status.value,
			unit: order.unit._id,
			contractor: order.contractor._id,
			description: order.description,
			response: e.target.response.value,
			workDate: {
				day: parseInt(e.target.workDate.value.substring(8, 10)),
				month: parseInt(e.target.workDate.value.substring(5, 7)),
				year: parseInt(e.target.workDate.value.substring(0, 4)),
			},
		};
		updateOrder(updated);
	};

	const inputFormat = (date) => {
		return `${date.year}-${date.month}-${date.day}`;
	};

	const formatName = (contractor) => {
		return `${contractor.firstName} ${contractor.lastName}`;
	};

	console.log(order);

	return (
		<div className={styles.createWrapper}>
			<div className={styles.createBox}>
				<h1>Modify Work Order</h1>
				<form onSubmit={submitOrder}>
					<table>
						<tbody>
							<tr>
								<td>
									<label>ID</label>
								</td>
								<td>
									<input
										disabled
										defaultValue={order._id}
										name="id"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label>Status</label>
								</td>
								<td>
									<select
										defaultValue={order.status}
										name="status"
									>
										<option value="New">New</option>
										<option value="Assigned">
											Assigned
										</option>
										<option value="In Progress">
											In Progress
										</option>
										<option value="Complete">
											Complete
										</option>
										<option value="Failed">Failed</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label>Unit</label>
								</td>
								<td>
									<input
										disabled
										name="unit"
										defaultValue={order.unit.unitNumber}
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label>Contractor</label>
								</td>
								<td>
									<input
										disabled
										name="contractor"
										defaultValue={formatName(
											order.contractor
										)}
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label>Description</label>
								</td>
								<td>
									<input
										disabled
										defaultValue={order.description}
										required
										name="description"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label>Response</label>
								</td>
								<td>
									<input
										defaultValue={order.response}
										name="response"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label>Work Date</label>
								</td>
								<td>
									<input
										defaultValue={
											order.workDate
												? inputFormat(order.workDate)
												: ""
										}
										name="workDate"
										type="date"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<button
										type="button"
										onClick={closeView}
										className={styles.closeButton}
									>
										Close
									</button>
								</td>
								<td>
									<input type="submit"></input>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	);
};

export default ContractorViewOrder;
