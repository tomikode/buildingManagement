import React, { useContext } from "react";
import styles from "../../styles/UserManagment.module.css";
import { UserContext } from "../../utils/UserContext";

const CreateInvoice = ({closeCreate, createInvoice}) => {
    const user = useContext(UserContext);


    const submitInvoice = (e) => {
        e.preventDefault();
        const invoice = {
            user: user.user._id.toString(),
            job: e.target.job.value,
            amount: e.target.amount.value,
            date: e.target.date.value,
            description: e.target.description.value,
        };
        createInvoice(invoice);
    };

    return (
        <div className={styles.createWrapper}>
            <div className={styles.createBox}>
                <h1>Create Invoice</h1>
                <form onSubmit={submitInvoice}>
                    <table style={{ borderSpacing: "10px 15px" }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "right" }}>
                                    <label>Job</label>
                                </td>
                                <td>
                                    <select required name="job">
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
                                    <select required name="amount">
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
                                    <select required name="date">
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
                                    <select required name="description">
                                        <input
                                            type="text"
                                            placeholder="Input Job Description"
                                        />
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={closeCreate} className={styles.closeButton}>CLOSE</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <input type="submit" value="SAVE INVOICE" className={styles.rightButton} />
                </form>
            </div>
        </div>
    );
};

export default CreateInvoice;