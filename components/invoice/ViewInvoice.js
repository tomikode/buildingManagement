import React from "react";
import styles from "../../styles/UserManagment.module.css";

const ViewInvoice = ({
    invoice,
    user,
    closeView,
    updateInvoice,
}) => {
    const submitInvoice = (e) => {
        e.preventDefault();
        const updated = {
            user: user.user._id.toString(),
            job: e.target.job.value,
            amount: e.target.amount.value,
            date: e.target.date.value,
            description: e.target.description.value,
        };
        updateInvoice(updated);
    };

    return (
        <div className={styles.createWrapper}>
            <div className={styles.createBox}>
                <h1>Create Invoice</h1>
                <form onSubmit={submitInvoice}>
                    <table style={{ borderSpacing: "10px 15px" }}>
                        <tbody>
                        <tr>
								<td>
									<label>ID</label>
								</td>
								<td>
									<input
										disabled
										defaultValue={invoice._id}
										name="id"
									></input>
								</td>
							</tr>
                            <tr>
                                <td style={{ textAlign: "right" }}>
                                    <label>Job</label>
                                </td>
                                <td>
                                    <select defaultValue={invoice.job} required name="job">
                                        <input
                                            type="text"
                                            placeholder="Input Completed Job"
                                        />
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td style={{ textAlign: "right" }}>
                                    <label>Job Costs</label>
                                </td>
                                <td>
                                    <select defaultValue={invoice.amount} required name="amount">
                                        <input
                                            type="number"
                                            placeholder="Input Amount to be Paid"
                                        />
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td style={{ textAlign: "right" }}>
                                    <label>Job Date</label>
                                </td>
                                <td>
                                    <select defaultValue={invoice.date} required name="date">
                                        <input
                                            type="date"
                                        />
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    <label>Job Description</label>
                                </td>
                                <td>
                                    <select defaultValue={invoice.description} required name="description">
                                        <input
                                            type="text"
                                            placeholder="Input Job Description"
                                        />
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={closeView} className={styles.closeButton}>CLOSE</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <input type="submit" value="UPDATE INVOICE" className={styles.rightButton} />
                </form>
            </div>
        </div>
    )
};

export default ViewInvoice;