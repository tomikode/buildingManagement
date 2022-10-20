import React, { useContext } from "react";
import styles from "../styles/WorkOrders.module.css";
import { UserContext } from "../utils/UserContext";

const CreateWorkOrder = ({ units, closeCreate, createOrder, contractors }) => {
	const user = useContext(UserContext);

	const submitOrder = (e) => {
		e.preventDefault();
		const order = {
			status: e.target.status.value,
			unit: e.target.unit.value,
			submissionUser: user.user._id.toString(),
			contractor: e.target.contractor.value,
			description: e.target.description.value,
		};
		createOrder(order);
	};

	return (
		<div className={styles.createWrapper}>
			<div className={styles.createBox}>
				<h1>Create Work Order</h1>
				<form onSubmit={submitOrder}>
					<table>
						<tbody>
							<tr>
								<td>
									<label>Status</label>
								</td>
								<td>
									<select name="status">
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
									<select required name="unit">
										{units
											? units.map((unit) => (
													<option value={unit._id}>
														{unit.unitNumber}
													</option>
											  ))
											: null}
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label>Contractor</label>
								</td>
								<td>
									<select required name="contractor">
										{contractors
											? contractors.map((contractor) => (
													<option
														value={contractor._id}
													>
														{contractor.firstName}{" "}
														{contractor.lastName}
													</option>
											  ))
											: null}
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label>Description</label>
								</td>
								<td>
									<input required name="description"></input>
								</td>
							</tr>
							<tr>
								<td>
									<button
										type="button"
										onClick={closeCreate}
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

export default CreateWorkOrder;
