import axios from "axios";
import Layout from "../../components/Layout";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../utils/UserContext";
import CreateInvoice from "../../components/invoice/CreateInvoice";
import ViewInvoice from "../../components/invoice/ViewInvoice";
import styles from "../../styles/Rental.module.css";

const contractorInvoice = () => {
    const userCont = useContext(UserContext);       //Recieve user
    const contractInvoices = useRef([]);            //setup invoices
    const [showCreate, setShowCreate] = useState(false);   
    const [filterInvoice, setFilterInvoice] = useState(contractInvoices.current);  //Filters invoices to current user
    const [showView, setShowView] = useState(null);

    const fetchInvoices = async () => {
        const response = await axios.get("api/Invoicev2"); 
        contractInvoices.current = response.data.filter(
            (invoice) => invoice.user._id === userCont.user._id //Finds invoice by user id
        );
        setFilterInvoice(contractInvoices.current);
    };

    useEffect(() => {
        if (userCont.user) fetchInvoices();
    }, [userCont]);

    const openView = (invoice) => {     //Initialises opening invoices
        console.log("thing");
        setShowView(invoice);
    }

    const closeView = () => {
        setShowView(null);
    }

    const createInvoice = async (invoice) => {
        contractInvoices.current.push(invoice);
        const format = {                     //Initialising code to create invoice
            user: invoice.user,
            job: invoice.job,
            amount: invoice.amount,
            date: invoice.date,
            description: invoice.description,
        };

        await axios.post("api/Invoicev2", format);  
        fetchInvoices();
        closeCreate();
    }

    const openCreate = () => {
        setShowCreate(true);
    };

    const closeCreate = () => {
        setShowCreate(false);
    };

    const updateInvoice = async (invoice) => {
        const res = await axios.put(`api/Invoicev2/${invoice._id}`, invoice);   //Used to obtain details of invoice to update
        console.log(res);
        fetchWorkOrders();
        closeView();
    }

    return (
        <Layout pageType="c">
            {showCreate ? (
                <CreateInvoice
                    closeCreate={closeCreate}
                    createInvoice={createInvoice}
                />
            ) : null}
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
                    <div className={styles.buttons}>
                        <button classname={styles.buttons} onClick={openCreate}> Create </button>   //Used to open create functionality
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>        //Creates table to display data
                        <thead className={styles.thead}>
                            <tr>
                                <td>ID</td>
                                <td>Job</td>
                                <td>Amount</td>
                                <td>Date</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filterInvoice.map((invoice, index) => (
                                <tr key = {index} onClick={() => openView(invoice)}>
                                    <td>{invoice.user.firstName}</td>
                                    <td>{invoice.job}</td>
                                    <td>{invoice.amount}</td>
                                    <td>{invoice.date}</td>
                                    <td>{invoice.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
};

export default contractorInvoice;
