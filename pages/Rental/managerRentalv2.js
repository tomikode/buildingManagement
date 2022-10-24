import axios from "axios";
import Layout from "../../components/Layout";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../utils/UserContext";
import CreateRental from "../../components/rental/CreateRental";
import ViewRental from "../../components/rental/ViewRental";
import styles from "../../styles/UserManagment.module.css";

const contractorRental = () => {
    const userCont = useContext(UserContext);
    const contractRentals = useRef([]);
    const [showCreate, setShowCreate] = useState(false);
    const [filterRental, setFilterRental] = useState(contractRentals.current);
    const [showView, setShowView] = useState(null);

    const fetchRentals = async () => {
        const response = await axios.get("api/rental");
        contractRentals.current = response.data.filter(
            (rental) => rental.user._id === userCont.user._id
        );
        setFilterRental(contractRentals.current);
    };

    useEffect(() => {
        if (userCont.user) fetchRentals();
    }, [userCont]);

    const openView = (rental) => {
        console.log("thing");
        setShowView(rental);
    }

    const closeView = () => {
        setShowView(null);
    }

    const createRental = async (rental) => {
        contractRentals.current.push(rental);
        const format = {
            user: rental.user,
            job: rental.job,
            amount: rental.amount,
            date: rental.date,
            description: rental.description,
        };

        await axios.post("api/rental", format);
        fetchRentals();
        closeCreate();
    }

    const openCreate = () => {
        setShowCreate(true);
    };

    const closeCreate = () => {
        setShowCreate(false);
    };

    const updateRental = async (rental) => {
        const res = await axios.put(`api/Rentalv2/${rental._id}`, rental);
        console.log(res);
        fetchWorkOrders();
        closeView();
    }

    return (
        <Layout pageType="c">
            {showCreate ? (
                <CreateRental
                    closeCreate={closeCreate}
                    createRental={createRental}
                />
            ) : null}
            {showView ? (
                <ViewRental
                    rental={showView}
                    user={userCont}
                    closeView={closeView}
                    updateRental={updateRental}
                />
            ) : null}

            <div className={styles.wrapper}>
                <div className={styles.box}>
                    <h1>Rentals</h1>
                    <div className={styles.buttons}>
                        <button classname={styles.buttons} onClick={openCreate}> Create </button>
                    </div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {filterRental.map((rental, index) => (
                                <tr key = {index} onClick={() => openView(rental)}>
                                    <td>{rental.user.firstName}</td>
                                    <td>{rental.job}</td>
                                    <td>{rental.amount}</td>
                                    <td>{rental.date}</td>
                                    <td>{rental.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
};

export default contractorRental;