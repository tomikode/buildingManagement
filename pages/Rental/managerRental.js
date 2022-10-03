import axios from "axios";
import Button from "../../components/Button";
import EditUser from "../../components/user_management/EditUser";
import EditContract from "../../components/rental/EditContract"
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import ContractList from "../../components/rental/ContractList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const managerRental = () => {
    const router = useRouter();
    const VIEW_STATES = {
        CONTRACT_LIST: 0,
        NEW_CONTRACT: 1,
        EDIT_CONTRACT: 2,
    };

    const BECAUSE_TRAVERSY_SAID_SO = [];
    const EMPTY = "";
    const NO_SELECTED_CONTRACT = 0;

    const [contracts, setContracts] = useState([]);
    const [editContractSelection, setEditContractSelection] =
        useState(NO_SELECTED_CONTRACT);
    const [usersTable, setUsersTable] = useState(EMPTY);
    const [contractTable, setContractTable] = useState(EMPTY);
    const [viewState, setViewState] = useState(VIEW_STATES.CONTRACT_LIST);

    useEffect(() => {
        const getData = async () => {
            const contractsFromDatabase = await fetchContractsFromDatabase();
            setContracts(contractsFromDatabase);
            const usersFromMongo = await fetchUsersFromDatabase();
			setUsersTable(usersFromMongo);
        };
        getData();
    }, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

    const fetchUsersFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/userManagement");
            var loadedNotices = fetchResult.data.foundUsers;
            return loadedNotices;
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchContractsFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/rental");
            var loadedContracts = fetchResult.data.foundContracts;
            return loadedContracts;
        } catch (e) {
            console.log(e.message);
        }
    };

    const getContract = (id) => {
        return contracts.find((contract) => contract._id === id);
    };

    const getUser = (who) => {
		return usersTable.find((user) => user._id === who);
	};

    const addContract = async (newContract) => {
        /*if (newContract.postDate === EMPTY) {
            newContract.postDate = `${new Date()}`;
            newContract.user = loggedInUser;
        }*/
        const contractData = {
            ...newContract,
            _id: editContractSelection,
        };
        try {
            const res = await axios.post("/api/rental", contractData);
            setContracts(await fetchContractsFromDatabase());
        } catch (e) {
            console.log(e);
        }
        setEditContractSelection(NO_SELECTED_CONTRACT);
        setViewState(VIEW_STATES.CONTRACT_LIST);
    };

    const editSelectedContract = (contract) => {
        setEditContractSelection(contract);
        setViewState(VIEW_STATES.EDIT_CONTRACT);
    };

    const deleteContract = async (id) => {
        const contractData = { _id: id };
        try {
            const res = await axios.patch("/api/rental", contractData);
            setContractTable(await fetchContractsFromDatabase());
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Layout pageType="m">
            <div className={styles.centreWrapper}>
                <div className={styles.contentBox}>
                    <div className={styles.titleWithButton}>
                        <h1>Contract Management</h1>
                        {loggedInUser && loggedInUser.type === "m" && (
                            <Button
                                text={
                                    viewState === VIEW_STATES.CONTRACT_LIST
                                        ? "ADD CONTRACT"
                                        : "CANCEL"
                                }
                                color={
                                    viewState === VIEW_STATES.CONTRACT_LIST
                                        ? "lightgreen"
                                        : "papayawhip"
                                }
                                onClick={() => {
                                    viewState !== VIEW_STATES.USER_LIST
                                        ? setViewState(VIEW_STATES.CONTRACT_LIST)
                                        : setViewState(VIEW_STATES.NEW_CONTRACT);
                                }}
                            />
                        )}
                    </div>
                    <br />
                    <hr className={styles.hr} />
                    {/* Show edit/create user screen if selected */}
                    {viewState === VIEW_STATES.NEW_CONTRACT && (
                        <EditContract onEdit={addContract} />
                    )}
                    {viewState === VIEW_STATES.EDIT_CONTRACT && (
                        <EditContract
                            onEdit={addContract}
                            contract={getContract(editContractSelection)}
                        />
                    )}

                    {/* Show users if selected, or display message if no users to show */}
                    {viewState === VIEW_STATES.CONTRACT_LIST &&
                        (contracts.length === EMPTY.length ? (
                            "No Contracts Curently Active"
                        ) : (
                            <ContractList
                                contracts={contracts}
                                /*landlord={getLandlord}
                                unit={getUnit}
                                startDate={getStartDate}
                                endDate={getEndDate}
                                totalPrice={getPrice}
                                chargeRate={getRate}*/
								onDelete={deleteContract}
								onEdit={editSelectedContract}
								getUser={getUser}
								loggedInUser={loggedInUser}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    )

};

export default managerRental;