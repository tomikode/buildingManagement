import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const EditInvoice = ({ onEdit, invoice = null }) => {
    const [_id, set_Id] = useState("");
    const [user, setUser] = useState("");
    const [job, setJob] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [invoiceLoaded, setInvoiceLoaded] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!job || !amount || !date || !description) {
            alert("Please fill out all forms");
            return;
        }

        onEdit({_id, user, job, amount, date, description});

        set_Id("");
        setUser("");
        setJob("");
        setAmount("");
        setDate("");
        setDescription("");
    };

    const loadInvoice = (invoice) => {
        set_Id(invoice._id);
        setUser(invoice.user);
        setJob(invoice.job);
        setAmount(invoice.amount);
        setDate(invoice.date);
        setDescription(invoice.description);
        setInvoiceLoaded(true);
    };

    return (
        <form onSubmit={onSubmit}>
            {invoice && !invoiceLoaded && loadInvoice(invoice)}
            <table style={{ borderSpacing: "10px 15px" }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Job</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Completed Job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Job Costs</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Input Amount to be Paid"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Job Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </td>
                    </tr>


                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Job Description</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Job Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <input type="submit" value="SAVE INVOICE" className={styles.rightButton} />
        </form>
    );
};

export default EditInvoice;