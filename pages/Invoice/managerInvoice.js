import axios from "axios";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Rental.module.css";
import InvoiceList from "../../components/invoice/InvoiceList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const managerInvoice = () => {
    const router = useRouter();
    const VIEW_STATES = {
        INVOICE_LIST: 0,
        NEW_INVOICE: 1,
        EDIT_INVOICE: 2,
        //CREATE_CONTRACT: 3,
    };

    const BECAUSE_TRAVERSY_SAID_SO = [];
    const EMPTY = [];
    const NO_SELECTED_INVOICE = 0;

    const [invoice, setInvoices] = useState([]);
    const [editInvoiceSelection, setEditInvoiceSelection] =
        useState(NO_SELECTED_INVOICE);
    const [usersTable, setUsersTable] = useState(EMPTY);
    const [invoiceTable, setInvoiceTable] = useState(EMPTY);
    const [viewState, setViewState] = useState(VIEW_STATES.INVOICE_LIST);

    useEffect(() => {
        const getData = async () => {
            //    if (!loggedInUser && router) {
            //       router.push("/login");
            //   } else {
            loggedInUser = JSON.parse(sessionStorage.getItem("user"));

            const invoicesFromDatabase = await fetchInvoicesFromDatabase();
            setInvoiceTable(invoicesFromDatabase);
        }
        // };
        getData();
    }, BECAUSE_TRAVERSY_SAID_SO);

    /*const fetchUsersFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/userManagement");
            let loadedNotices = fetchResult.data.foundUsers;
            return loadedNotices;
        } catch (e) {
            console.log(e.message);
        }
    };*/

    const fetchInvoicesFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/invoice");
            let loadedInvoices = fetchResult.data.foundInvoices;//Look at this to fix
            return loadedInvoices;
        } catch (e) {
            console.log(e.message);
        }
    };

    const getInvoice = (id) => {
        return invoiceTable.find((invoice) => invoice._id === id);
    };

    return (
        <Layout pageType="m">
            <div className={styles.centreWrapper}>
                <div className={styles.contentBox}>
                    <div className={styles}>
                        <h2>Invoice List</h2>
                    </div>
                    <br />
                    <hr className={styles.hr} />

                    {viewState === VIEW_STATES.INVOICE_LIST &&
                        (getInvoice === "" ? (
                            "No Invoices Curently Available"
                        ) : (
                            <InvoiceList
                                invoices={getInvoice}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    );

};

export default managerInvoice;
