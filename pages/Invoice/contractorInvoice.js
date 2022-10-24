import axios from "axios";
import Button from "../../components/Button";
import EditInvoice from "../../components/invoice/EditInvoice"
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Rental.module.css";
import InvoiceList from "../../components/invoice/InvoiceList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const contractorInvoice = () => {
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

    //    const [contract, setContracts] = useState([]);
    const [editInvoiceSelection, setEditInvoiceSelection] =
        useState(NO_SELECTED_INVOICE);
    const [usersTable, setUsersTable] = useState(EMPTY);
    const [invoiceTable, setInvoiceTable] = useState(EMPTY);
    const [viewState, setViewState] = useState(VIEW_STATES.INVOICE_LIST);

    useEffect(() => {
        const getData = async () => {
            //if (!loggedInUser && router) {
            //    router.push("/login");
           // } else {
                loggedInUser = JSON.parse(sessionStorage.getItem("user"));

                const usersFromDatabase = await fetchUsersFromDatabase();
                const invoicesFromDatabase = await fetchInvoicesFromDatabase();
                setInvoiceTable(invoicesFromDatabase);
                setUsersTable(usersFromDatabase);
           // }
        };
        getData();
    }, BECAUSE_TRAVERSY_SAID_SO);

    const fetchUsersFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/userManagement");
            let loadedNotices = fetchResult.data.getUsers;
            return loadedNotices;
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchInvoicesFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/invoice");
            let loadedInvoices = fetchResult.data.getInvoices;//Look at this to fix
            return loadedInvoices;
        } catch (e) {
            console.log(e.message);
        }
    };

    const getInvoice = (id) => {
        return invoiceTable.find((invoice) => invoice._id === id);
    };

    const getUser = (who) => {
        return usersTable.find((user) => user._id === who);
    };

    const addInvoice = async (newInvoice) => {
        const invoiceData = {
            _id: editInvoiceSelection,
            ...newInvoice,
        };
        try {
            const res = await axios.post("/api/invoice", invoiceData);
            setInvoiceTable(await fetchInvoicesFromDatabase());
        } catch (e) {
            console.log(e.message);
        }
        setViewState(VIEW_STATES.INVOICE_LIST);
        setEditInvoiceSelection(NO_SELECTED_INVOICE);
    };

    const editSelectedInvoice = (invoice) => {
        setViewState(VIEW_STATES.EDIT_INVOICE);
        setEditInvoiceSelection(invoice);
    };

    const deleteInvoice = async (id) => {
        const invoiceData = { _id: id };
        try {
            const res = await axios.patch("/api/invoice", invoiceData);
            setInvoiceTable(await fetchInvoicesFromDatabase());
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Layout pageType="c">
            <div className={styles.centreWrapper}>
                <div className={styles.contentBox}>
                    <div className={styles.titleWithButton}>
                        <h2>Invoice Management</h2>
                        {loggedInUser && loggedInUser.type === "c" && (
                            <Button
                                text={
                                    viewState === VIEW_STATES.INVOICE_LIST
                                        ? "ADD INVOICE"
                                        : "CANCEL"
                                }
                                color={
                                    viewState === VIEW_STATES.INVOICE_LIST
                                        ? "lightgreen"
                                        : "papayawhip"
                                }
                                onClick={() => {
                                    viewState !== VIEW_STATES.INVOICE_LIST
                                        ? setViewState(VIEW_STATES.INVOICE_LIST)
                                        : setViewState(VIEW_STATES.NEW_INVOICE);
                                }}
                            />
                        )}
                    </div>
                    <br />
                    <hr className={styles.hr} />

                    {/* Show edit/create user screen if selected */}
                    {viewState === VIEW_STATES.NEW_INVOICE && (
                        <EditInvoice onEdit={addInvoice} />
                    )}
                    {viewState === VIEW_STATES.EDIT_INVOICE && (
                        <EditInvoice
                            onEdit={addInvoice}
                            invoice={getInvoice(editInvoiceSelection)}
                        />
                    )}

                    {/* Show users if selected, or display message if no users to show */}
                    {viewState === VIEW_STATES.INVOICE_LIST &&
                        (invoiceTable?.length === EMPTY.length ? (
                            "No Contracts Curently Active"
                        ) : (
                            <InvoiceList
                                invoice={invoiceTable}
                                onDelete={deleteInvoice}
                                getUser={getUser}
                                onEdit={editSelectedInvoice}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    );

};

export default contractorInvoice;
