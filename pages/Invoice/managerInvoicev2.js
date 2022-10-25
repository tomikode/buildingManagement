import axios from "axios";
import Layout from "../../components/Layout";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../utils/UserContext";
import ViewInvoice from "../../components/invoice/ViewInvoice";
import styles from "../../styles/Rental.module.css";

const managerInvoice = () => {
    const allInvoices = useContext(UserContext);
    const contractInvoices = useRef([]);
    const [filterInvoice, setFilterInvoice] = useState(contractInvoices.current);
    const [showView, setShowView] = useState(null);


    const fetchInvoices = async () => {
        const response = await axios.get("api/Invoicev2");
        allInvoices = response.data;
        setFilterInvoice(allInvoices.current);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const openView = (invoice) => {
        console.log("thing");
        setShowView(invoice);
    }

    const closeView = () => {
        setShowView(null);
    }


    return (
        <Layout pageType="m">
            {showView ? (
                <ViewInvoice
                    invoice={showView}
                    user={userCont}
                    closeView={closeView}
                    updateInvoice={updateInvoice}
                />
            ) : null}

            <div className={styles.wrapper}>
                <div className={styles.box}>
                    <h1>Invoices</h1>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <td>ID</td>
                                <td>Job</td>
                                <td>Amount</td>
                                <td>Date</td>
                                <td>Description</td>
                                <td>Conduct Payment</td>
                            </tr>
                        </thead>
                        <tbody>
                            //{filterInvoice.map((invoice, index) => (
                                <tr key={index}>
                                    <td>1</td>//{invoice._id}</td>
                                    <td>Fix things</td>//{invoice.job}</td>
                                    <td>2150</td>//{invoice.amount}</td>
                                    <td>22-10-2022</td>//{invoice.date}</td>
                                    <td>Did some work</td>//{invoice.description}</td>
                                    <td><button classname={styles.buttons}>Pay</button></td>
                                </tr>
                            //))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}


export default managerInvoice;
