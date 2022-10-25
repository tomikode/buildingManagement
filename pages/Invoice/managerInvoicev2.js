import axios from "axios";
import Layout from "../../components/Layout";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../utils/UserContext";
import ViewInvoice from "../../components/invoice/ViewInvoice";
import styles from "../../styles/Rental.module.css";

const ManagerInvoice = () => {
    const allInvoices = useContext(UserContext);
    const contractInvoices = useRef([]);
    const [filterInvoice, setFilterInvoice] = useState(contractInvoices.current); //Used to finter invoices chosen
    const [showView, setShowView] = useState(null);


    const fetchInvoices = async () => {
        const response = await axios.get("api/Invoicev2");
        allInvoices = response.data;
        setFilterInvoice(allInvoices.current);  //Filters out invoices
    };

    useEffect(() => {
        fetchInvoices();
    }, []); // eslint-disable-line

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
                         <thead className={styles.thead}>        {/*//Initialises table for displaying data */}
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
                            {/*{filterInvoice.map((invoice, index) => (*/}
                                <tr>
                                    <td>1</td>    {/* </tr>/{invoice._id}</td> */}
                                    <td>Fix things</td> {/*{invoice.job}</td> */}
                                    <td>2150</td>       {/*{invoice.amount}</td> */}
                                    <td>2022-10-22</td> {/*{invoice.date}</td> */}
                                    <td>Did some work</td> {/*{invoice.description}</td> */}
                                    <td><button className={styles.buttons}>Pay</button></td> {/*Button to pay invoice */}
                                </tr>
                            {/*}))}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}


export default ManagerInvoice;
