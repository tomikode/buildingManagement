import { renderToHTML } from "next/dist/server/render";
import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const EditContract = ({ onEdit, contract = null }) => {
    const [id, setID] = useState("");
    const [user, setUser] = useState("");
    const [landlord, setLandlord] = useState("");
    const [unit, setUnit] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setPrice] = useState("");
    const [chargeRate, setRate] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (!content) {
            alert("Please enter details");
            return;
        }

        onEdit({ id, tenant, landlord, unit, startDate, endDate, totalPrice, chargeRate });

        setID("");
        setUser("");
        setLandlord("");
        setUnit("");
        setStartDate("");
        setEndDate("");
        setPrice("");
        setRate("");
    };

    const loadContract = (contract) => {
        setID(contract.id);
        setUser(contract.tenant);
        setLandlord(contract.landlord);
        setUnit(contract.unit);
        setStartDate(contract.startDate);
        setEndDate(contract.endDate);
        setPrice(contract.totalPrice);
        setRate(contract.chargeRate);

        setContractLoaded(true);
    }

    return (
        <form onSubmit={onSubmit}>
            {contract && !contractLoaded && loadContract(contract)}
            <table style={{ borderSpacing: "10px 15px" }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Tenant Name</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Tenant Name"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Landlord Name</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Landlord Name"
                                value={landlord}
                                onChange={(e) => setLandlord(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Unit Number</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Input Unit Number"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </td>
                    </tr>


                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Start Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>End Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Rent Amount</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Input Rent Amount"
                                value={rent}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Rent Cycle</label>

                        </td>
                        <td>
                            <input
                                type="radio"
                                id="weekly"
                                value="Weekly"
                                name="Cycle"
                                checked={this.state.selectedOption === "Weekly"}
                                onChange={(e) => setRate(e.target.checked)}
                            />
                            <label for="weekly">Weekly </label>
                            <input
                                type="radio"
                                id="monthly"
                                value="Monthly"
                                name="Cycle"
                                checked={this.state.selectedOption === "Monthly"}
                                onChange={(e) => setRate(e.target.checked)}
                            />
                            <label for="Monthly">Monthly </label>
                            <input
                                type="radio"
                                id="yearly"
                                value="Yearly"
                                name="Cycle"
                                checked={this.state.selectedOption === "Yearly"}
                                onChange={(e) => setRate(e.target.checked)}
                            />
                            <label for="yearly">Yearly</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <input type="submit" value="SAVE USER" className={styles.rightButton} />
        </form>
    )
};

export default EditContract;