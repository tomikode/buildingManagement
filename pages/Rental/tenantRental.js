import axios from "axios";
import Button from "../../components/Button";
//import EditUser from "../../components/user_management/EditUser";
import EditContract from "../../components/rental/EditContract";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Rental.module.css";
import ContractList from "../../components/rental/ContractList";
import { useRouter } from "next/router";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

const TenantRental = () => {
  const router = useRouter();

  const BECAUSE_TRAVERSY_SAID_SO = [];
  const EMPTY = [];
  const NO_SELECTED_CONTRACT = 0;

  const [contract, setContracts] = useState([]);
  const [editContractSelection, setEditContractSelection] =
    useState(NO_SELECTED_CONTRACT);
  const [usersTable, setUsersTable] = useState(EMPTY);
  const [contractTable, setContractTable] = useState(EMPTY);

  useEffect(() => {
    const getData = async () => {
      //    if (!loggedInUser && router) {
      //        router.push("/login");
      //    } else {
      loggedInUser = JSON.parse(sessionStorage.getItem("user"));

      const contractsFromDatabase = await fetchContractsFromDatabase();
      setContractTable(contractsFromDatabase);
    };
    // };
    getData();
  }, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

  /*const fetchUsersFromDatabase = async () => {
        try {
            const fetchResult = await axios.get("/api/userManagement");
            let loadedNotices = fetchResult.data.foundUsers;
            return loadedNotices;
        } catch (e) {
            console.log(e.message);
        }
    };*/

  const fetchContractsFromDatabase = async () => {
    try {
      const fetchResult = await axios.get("/api/rental");
      let loadedContracts = fetchResult.data.foundContracts;
      return loadedContracts;
    } catch (e) {
      console.log(e.message);
    }
  };

  /*const getContract = (loggedInUser) => {
        return contractTable.find((contract) => contract.user === loggedInUser);
    };*/

  return (
    <Layout pageType="t">
      <div className={styles.centreWrapper}>
        <div className={styles.contentBox}>
          <div className={styles.title}>
            <h1>Rent Payment</h1>
            <br />
            <form>
              <table style={{ borderSpacing: "10px 15px" }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <label>Manager</label>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label>John Doe</label>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <label>Rent Due</label>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label>XX/XX/20XX</label>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <label>Rent Amount</label>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label>$250</label>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <label>Payment Method</label>
                    </td>
                    <td style={{ textAlign: "right" }}>Card XXXX</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TenantRental;
